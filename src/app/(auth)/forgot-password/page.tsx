import AuthWrapper from "@/features/auth/components/auth-wrapper";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { requireUnauth } from "@/features/auth/lib/utils";

const Page = async () => {
  await requireUnauth();

  return (
    <AuthWrapper
      title="Reset password"
      description="Enter your email address. You will receive a link to reset your password."
    >
      <ForgotPasswordForm />
    </AuthWrapper>
  );
};

export default Page;
