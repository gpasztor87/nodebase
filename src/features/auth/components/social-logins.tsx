"use client";

import authConfig from "@/config/auth.config";
import { Field, FieldSeparator } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { supportedOAuthProviderDetails } from "../lib/providers";
import { BetterAuthActionButton } from "./better-auth-action-button";

const SocialLogins = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const providers = Object.keys(authConfig.socialProviders) as Array<
    keyof typeof supportedOAuthProviderDetails
  >;

  return (
    <>
      {providers.length > 0 && (
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
                  disabled={isSubmitting}
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
    </>
  );
};

export default SocialLogins;
