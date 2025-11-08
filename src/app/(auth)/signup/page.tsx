import AuthWrapper from "@/features/auth/components/auth-wrapper";
import { RegisterForm } from "@/features/auth/components/register-form";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {
  await requireUnauth();

  return (
    <AuthWrapper
      title="Create your account"
      description="Welcome! Please fill in the details to get started."
    >
      <RegisterForm />
    </AuthWrapper>
  );
};

export default Page;
