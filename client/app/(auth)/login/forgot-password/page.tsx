"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

type forgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

function Page() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<forgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: forgotPasswordValues) => {
    await authClient.requestPasswordReset(
      {
        email: data.email,
      },
      {
        onRequest: () => {},
        onSuccess: () => {
          toast.success("password reset Email sent");
          setSuccess(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Fail to send password reset Email");
        },
      }
    );
  };

  return (
    <div className="w-full max-w-sm md:max-w-2xl mx-auto my-auto">
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0">
          <CardContent className="">
            <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">
                    {success
                      ? "Password reset link sent"
                      : "Forgot your password?"}
                  </h1>
                  <p className="text-muted-foreground text-balance">
                    {success
                      ? "Check your email for the link to reset your password"
                      : "Enter your email address and we'll send you a link toreset your password."}
                  </p>
                </div>
                {!success && (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...register("email")}
                      required
                    />
                  </Field>
                )}
                <Field className="grid grid-cols-3 gap-2">
                  <Button onClick={() => router.push("/login")} variant={"outline"}>
                    <ChevronLeft />
                    Back
                  </Button>
                  <Button className="col-span-2">
                    <LoadingSwap isLoading={isSubmitting}>
                      Send reset Email
                    </LoadingSwap>
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default Page;
