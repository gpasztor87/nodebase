import * as React from "react";

import { type SocialProviderList } from "better-auth/social-providers";
import { DiscordIcon, GithubIcon, GoogleIcon } from "../components/oauth-icons";

export const supportedOAuthProviderDetails: Partial<
  Record<
    SocialProviderList[number],
    { name: string; Icon: React.ElementType<React.ComponentProps<"svg">> }
  >
> = {
  discord: { name: "Discord", Icon: DiscordIcon },
  github: { name: "GitHub", Icon: GithubIcon },
  google: { name: "Google", Icon: GoogleIcon },
};
