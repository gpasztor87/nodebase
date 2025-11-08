import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AuthWrapper = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button type="button" variant="outline" className="w-full">
                <Image
                  src="/logos/github.svg"
                  width={20}
                  height={20}
                  alt="GitHub"
                />
                Continue with GitHub
              </Button>
              <Button type="button" variant="outline" className="w-full">
                <Image
                  src="/logos/google.svg"
                  width={20}
                  height={20}
                  alt="Google"
                />
                Continue with Google
              </Button>
            </div>
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthWrapper;
