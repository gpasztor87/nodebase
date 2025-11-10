"use client";

import { useSearchParams } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import AuthWrapper from "@/features/auth/components/auth-wrapper";
import { BetterAuthActionButton } from "@/features/auth/components/better-auth-action-button";

import { authClient } from "@/lib/auth-client";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const email = decodeURIComponent(searchParams.get("email") as string);

  const [timeToNextResend, setTimeToNextResend] = useState(30);
  const interval = useRef<NodeJS.Timeout>(undefined);

  function startEmailVerificationCountdown(time = 30) {
    setTimeToNextResend(time);

    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setTimeToNextResend((t) => {
        const newT = t - 1;

        if (newT <= 0) {
          clearInterval(interval.current);
          return 0;
        }
        return newT;
      });
    }, 1000);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      startEmailVerificationCountdown();
    });

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AuthWrapper
      title="Verify your Email"
      description="We sent you a verification link. Please check your email and click the link to verify your account."
    >
      <BetterAuthActionButton
        variant="outline"
        className="w-full"
        disabled={timeToNextResend > 0}
        action={() => {
          startEmailVerificationCountdown();
          return authClient.sendVerificationEmail({
            email,
            callbackURL: "/",
          });
        }}
      >
        {timeToNextResend > 0
          ? `Resend Email (${timeToNextResend})`
          : "Resend Email"}
      </BetterAuthActionButton>
    </AuthWrapper>
  );
};

export default VerifyEmailPage;
