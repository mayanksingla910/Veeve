import { ServerClient } from "postmark";

const postmarkClient = new ServerClient(process.env.POSTMARK_API_KEY!);

export async function sendEmail(to: string, subject: string, html: string ,text: string) {
  const emailData = {
    From: "hello@example.com",
    To: to,
    Subject: subject,
    html: html,
    text: text,
  };

  return postmarkClient.sendEmail(emailData);
}