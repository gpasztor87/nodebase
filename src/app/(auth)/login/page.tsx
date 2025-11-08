import AuthWrapper from "@/features/auth/components/auth-wrapper";
import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {
  await requireUnauth();

  return (
    <AuthWrapper
      title="Sign in"
      description="Welcome back! Please sign in to continue"
    >
      <LoginForm />
    </AuthWrapper>
  );
};

export default Page;
