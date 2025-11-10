"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { PasswordInput } from "@/components/ui/password-input";

import { authClient } from "@/lib/auth-client";

import SocialLogins from "./social-logins";

const SignUpSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Your password must contain 8 or more characters",
  }),
});

export function SignUpForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push(
            `/verify-email?email=${encodeURIComponent(values.email)}`,
          );
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to sign up");
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
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              <LoadingSwap isLoading={isSubmitting}>Sign up</LoadingSwap>
            </Button>
            <FieldDescription className="text-center">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
}
