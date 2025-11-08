import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GithubIcon, GoogleIcon } from "./oauth-icons";

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
                <GithubIcon className="size-5" />
                Continue with GitHub
              </Button>
              <Button type="button" variant="outline" className="w-full">
                <GoogleIcon className="size-5" />
                Continue with Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-background-foreground">
                  or
                </span>
              </div>
            </div>
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthWrapper;
