import * as React from "react";

import {
  type SocialProviders,
  type SocialProviderList,
} from "better-auth/social-providers";
import { DiscordIcon, GithubIcon, GoogleIcon } from "../components/oauth-icons";

export type SupportedOAuthProvider = keyof SocialProviders;

export const socialProviders: SocialProviders = {
  github: {
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  },
};

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
