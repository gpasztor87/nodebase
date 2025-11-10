"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field";
import { supportedOAuthProviderDetails } from "../lib/providers";
import authConfig from "@/config/auth.config";
import { BetterAuthActionButton } from "./better-auth-action-button";
import { authClient } from "@/lib/auth-client";

const AuthWrapper = ({
  title,
  description,
  socialLogin = false,
  children,
}: {
  title: string;
  description: string;
  socialLogin?: boolean;
  children: React.ReactNode;
}) => {
  const providers = Object.keys(authConfig.socialProviders) as Array<
    keyof typeof supportedOAuthProviderDetails
  >;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            {socialLogin && providers.length > 0 && (
              <>
                <Field>
                  {providers.map((provider) => {
                    const details = supportedOAuthProviderDetails[provider];
                    if (!details) return null;

                    const { Icon, name } = details;
                    return (
                      <BetterAuthActionButton
                        key={provider}
                        type="button"
                        variant="outline"
                        className="w-full"
                        action={() => {
                          return authClient.signIn.social({
                            provider,
                            callbackURL: "/",
                          });
                        }}
                      >
                        <Icon className="size-5" />
                        Continue with {name}
                      </BetterAuthActionButton>
                    );
                  })}
                </Field>
                <FieldSeparator>or</FieldSeparator>
              </>
            )}
            {children}
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthWrapper;
