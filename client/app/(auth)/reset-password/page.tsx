"use client";

import PasswordInput from "@/components/passwordInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type resetPasswordValues = z.infer<typeof resetPasswordSchema>;

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<resetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: resetPasswordValues) => {
    if (!token) return;

    await authClient.resetPassword(
      {
        newPassword: data.password,
        token,
      },
      {
        onRequest: () => {},
        onSuccess: () => {
          toast.success("password reset Successfully", {
            description: "Redirecting to Login...",
          });
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to reset password");
          setError("root", { message: ctx.error.message });
        },
      }
    );
  };

  if (error || !token) {
    return (
      <Card className="overflow-hidden p-0 max-w-xl mx-auto">
        <CardContent className="p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Invalid Reset Link</h1>
            <p className="text-muted-foreground text-balance">
              Password reset link is invalid or has expired.
            </p>
          </div>

          <Button className="w-full" onClick={() => router.push("/login")}>
            Back to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-sm md:max-w-2xl mx-auto my-auto">
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0">
          <CardContent>
            <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Reset your password</h1>
                  <p className="text-muted-foreground text-balance">
                    Enter a new password for your account.
                  </p>
                </div>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <PasswordInput
                    id="password"
                    required
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-xs text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <PasswordInput
                    id="confirm-password"
                    required
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </Field>
                <Field>
                  <Button className="col-span-2">
                    <LoadingSwap isLoading={isSubmitting}>
                      Reset Password
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
