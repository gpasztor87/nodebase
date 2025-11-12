import AuthWrapper from "@/features/auth/components/auth-wrapper";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { requireUnauth } from "@/features/auth/lib/utils";

const Page = async () => {
  await requireUnauth();

  return (
    <AuthWrapper
      title="Create your account"
      description="Please fill in the details to get started."
    >
      <SignUpForm />
    </AuthWrapper>
  );
};

export default Page;
