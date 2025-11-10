"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { PasswordInput } from "@/components/ui/password-input";

import { authClient } from "@/lib/auth-client";

const ResetPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Your password must contain 8 or more characters",
  }),
});

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ResetPasswordSchema>) {
    if (token == null) return;

    await authClient.resetPassword(
      {
        newPassword: data.password,
        token,
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to reset password");
        },
        onSuccess: () => {
          toast.success("Password reset successful", {
            description: "Redirection to login...",
          });
          setTimeout(() => {
            router.push("/sign-in");
          }, 1000);
        },
      },
    );
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="current-password webauthn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Field>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              <LoadingSwap isLoading={isSubmitting}>Reset password</LoadingSwap>
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
}
