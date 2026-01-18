import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import arcjet, {
  BotOptions,
  detectBot,
  EmailOptions,
  protectSignup,
  shield,
  slidingWindow,
  SlidingWindowRateLimitOptions,
} from "@arcjet/next";
import { findIp } from "@arcjet/ip";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["userIdOrIp"],
  rules: [shield({ mode: "LIVE" })],
});

const botSettings = { mode: "LIVE", allow: [] } satisfies BotOptions;

const restrictiveRateLimitSettings = {
  mode: "LIVE",
  max: 10,
  interval: "5m",
} as SlidingWindowRateLimitOptions<[]>;

const laxRateLimitSettings = {
  mode: "LIVE",
  max: 60,
  interval: "1m",
} as SlidingWindowRateLimitOptions<[]>;

const emailSettings = {
  mode: "LIVE",
  deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
} satisfies EmailOptions;

const authHandlers = toNextJsHandler(auth);

export const { GET } = authHandlers;

export async function POST(req: Request) {
  const clonedReq = req.clone();
  const decision = await checkArcjet(req);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return new Response("Too many requests", { status: 429 });
    } else if (decision.reason.isEmail()) {
      let message: string;

      if (decision.reason.emailTypes.includes("INVALID"))
        message = "Email address format is invalid";
      else if (decision.reason.emailTypes.includes("DISPOSABLE"))
        message = "Disposable email addresses are not allowed";
      else if (decision.reason.emailTypes.includes("NO_MX_RECORDS"))
        message = "Email domain is not valid";
      else message = "Invalid Email";

      return Response.json({ message }, { status: 400 });
    } else {
      return Response.json({ message: "Invalid Credentials" }, { status: 400 });
    }
  }

  return authHandlers.POST(clonedReq);
}

async function checkArcjet(req: Request) {
  const body = (await req.json()) as unknown;
  const session = await auth.api.getSession({ headers: req.headers });

  const userIdOrIp = (session?.user.id ?? findIp(req)) || "127.0.0.1";

  if (req.url.endsWith("/sign-up/email")) {
    if (
      body &&
      typeof body === "object" &&
      "email" in body &&
      typeof body.email === "string"
    ) {
      return aj
        .withRule(
          protectSignup({
            email: emailSettings,
            bots: botSettings,
            rateLimit: restrictiveRateLimitSettings,
          })
        )
        .protect(req, { email: body.email, userIdOrIp });
    } else {
      return aj
        .withRule(detectBot(botSettings))
        .withRule(slidingWindow(restrictiveRateLimitSettings))
        .protect(req, { userIdOrIp });
    }
  }

  return aj
    .withRule(detectBot(botSettings))
    .withRule(slidingWindow(laxRateLimitSettings))
    .protect(req, { userIdOrIp });
}
