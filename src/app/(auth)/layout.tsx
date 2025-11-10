import Image from "next/image";
import Link from "next/link";
import appConfig from "@/config/app.config";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className="flex flex-col w-full max-w-sm gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image src="/logo.svg" width={30} height={30} alt={appConfig.name} />
          {appConfig.name}
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
