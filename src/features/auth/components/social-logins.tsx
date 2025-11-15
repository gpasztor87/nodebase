"use client";

import authConfig from "@/config/auth.config";

import { Badge } from "@/components/ui/badge";
import { Field, FieldSeparator } from "@/components/ui/field";

import { authClient } from "@/lib/auth-client";

import { supportedOAuthProviderDetails } from "../lib/providers";
import { BetterAuthActionButton } from "./better-auth-action-button";

const SocialLogins = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const lastMethod = authClient.getLastUsedLoginMethod();
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
                <div className="relative" key={provider}>
                  <BetterAuthActionButton
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
                  {lastMethod === provider && (
                    <Badge
                      variant="outline"
                      className="absolute z-10 bg-muted -translate-x-full ml-2 -translate-y-2"
                    >
                      Last used
                    </Badge>
                  )}
                </div>
              );
            })}
          </Field>
          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
            or
          </FieldSeparator>
        </>
      )}
    </>
  );
};

export default SocialLogins;
