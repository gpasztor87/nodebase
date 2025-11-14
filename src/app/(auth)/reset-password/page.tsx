"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Suspense } from "react";

import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

import AuthWrapper from "@/features/auth/components/auth-wrapper";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  if (token == null || error != null) {
    return (
      <AuthWrapper
        title="Invalid Reset Link"
        description="The password reset link is invalid or has expired."
      >
        <Button className="w-full" asChild>
          <Link href="/sign-in">Back to Login</Link>
        </Button>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper
      title="Reset password"
      description="Enter a new password to continue"
    >
      <ResetPasswordForm token={token} />
    </AuthWrapper>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justifx-center items-center flex-1 flex-col gap-y-4">
          <Loader2Icon className="size-5 animate-spin" />
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
};

export default Page;
