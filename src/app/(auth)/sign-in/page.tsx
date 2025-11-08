import AuthWrapper from "@/features/auth/components/auth-wrapper";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {
  await requireUnauth();

  return (
    <AuthWrapper
      title="Sign in"
      description="Welcome back! Please sign in to continue"
    >
      <SignInForm />
    </AuthWrapper>
  );
};

export default Page;
