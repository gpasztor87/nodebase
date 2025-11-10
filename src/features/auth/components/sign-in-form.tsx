"use client";

import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import SocialLogins from "./social-logins";

const SignInSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Your password must contain 8 or more characters",
  }),
});

export function SignInForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
            router.push(
              `/verify-email?email=${encodeURIComponent(values.email)}`,
            );
          }

          toast.error(ctx.error.message || "Failed to sign in");
        },
      },
    );
  };

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <SocialLogins isSubmitting={isSubmitting} />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email webauthn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
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
              <LoadingSwap isLoading={isSubmitting}>Sign in</LoadingSwap>
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
}
