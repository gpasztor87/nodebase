"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import AuthWrapper from "@/features/auth/components/auth-wrapper";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

const ResetPasswordPage = () => {
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

export default ResetPasswordPage;
