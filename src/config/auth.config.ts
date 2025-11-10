import { type BetterAuthOptions } from "better-auth";

import { ResetPasswordEmail } from "@/features/email/lib/reset-password";
import { VerificationEmail } from "@/features/email/lib/verification";

const authConfig = {
  /**
   * Session configuration
   */
  session: {
    /**
     * Enable caching session in cookie
     */
    cookieCache: {
      /**
       * Enable caching session in cookie
       *
       * @default false
       */
      enabled: true,
      /**
       * max age of the cookie
       *
       * @default 5 minutes (5 * 60)
       */
      maxAge: 300,
    },
    /**
     * Expiration time for the session token. The value
     * should be in seconds.
     *
     * @default 7 days (60 * 60 * 24 * 7)
     */
    expiresIn: 604800,
  },
  /**
   * Email and password authentication
   */
  emailAndPassword: {
    /**
     * Enable email and password authentication
     *
     * @default false
     */
    enabled: true,
    /**
     * The minimum length of the password.
     *
     * @default 8
     */
    minPasswordLength: 8,
    /**
     * Require email verification before a session
     * can be created for the user.
     *
     * if the user is not verified, the user will not be able to sign in
     * and on sign in attempts, the user will be prompted to verify their email.
     */
    requireEmailVerification: true,
    /**
     * Send reset password
     */
    sendResetPassword: async ({ user, url }) => {
      await ResetPasswordEmail({ user, url });
    },
  },
  /**
   * Email verification configuration
   */
  emailVerification: {
    /**
     * Auto signin the user after they verify their email
     */
    autoSignInAfterVerification: true,
    /**
     * Number of seconds the verification token is
     * valid for.
     *
     * @default 3600 seconds (1 hour)
     */
    expiresIn: 3600,
    /**
     * Send a verification email automatically
     * after sign up
     *
     * @default false
     */
    sendOnSignUp: true,
    /**
     * Send a verification email
     */
    sendVerificationEmail: async ({ user, url }) => {
      await VerificationEmail({ user, url });
    },
  },
  /**
   * User configuration
   */
  user: {
    /**
     * Changing email configuration
     */
    changeEmail: {
      /**
       * Enable changing email
       *
       * @default false
       */
      enabled: true,
      /**
       * Send a verification email when the user changes their email.
       */
      sendChangeEmailVerification: async ({ user, url, newEmail }) => {
        // TODO
      },
    },
    /**
     * User deletion configuration
     */
    deleteUser: {
      /**
       * Enable user deletion
       */
      enabled: true,
      /**
       * Send a verification email when the user deletes their account.
       *
       * if this is not set, the user will be deleted immediately.
       */
      sendDeleteAccountVerification: async ({ user, url }) => {
        // TODO
      },
    },
  },
  /**
   * list of social providers
   */
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
} satisfies BetterAuthOptions;

export default authConfig;
