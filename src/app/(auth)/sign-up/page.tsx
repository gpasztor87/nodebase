import AuthWrapper from "@/features/auth/components/auth-wrapper";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { requireUnauth } from "@/features/auth/lib/utils";

const SignUpPage = async () => {
  await requireUnauth();

  return (
    <AuthWrapper
      title="Create your account"
      description="Welcome! Please fill in the details to get started."
      socialLogin={true}
    >
      <SignUpForm />
    </AuthWrapper>
  );
};

export default SignUpPage;
