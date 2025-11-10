import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import appConfig from "@/config/app.config";

interface PasswordResetProps {
  email: string;
  resetLink: string;
}

const PasswordReset = ({ email, resetLink }: PasswordResetProps) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Password Reset</Preview>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[465px] p-5">
            <Text className="mx-0 mb-8 mt-4 p-0 text-center text-2xl font-normal">
              <span className="font-bold tracking-tighter">
                {appConfig.name}
              </span>
            </Text>

            <Text className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Password Reset
            </Text>

            <Text className="text-sm leading-6 text-black">
              You recently requested to reset your password for your account.
              Use the button below to reset it.{" "}
              <strong className="font-bold">
                This link will expire in one hour.
              </strong>
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded bg-blue-500 text-center text-xs font-semibold text-white no-underline"
                href={resetLink}
                style={{ padding: "12px 20px" }}
              >
                Reset Password
              </Button>
            </Section>

            <Text className="text-sm leading-6 text-black">
              If you’re having trouble with the button above, copy and paste the
              URL below into your web browser.
            </Text>

            <Text className="max-w-sm flex-wrap break-words font-medium text-blue-500 no-underline">
              {resetLink}
            </Text>

            <Hr />

            <Section className="mt-8 text-gray-400">
              <Text className="text-xs">
                © {new Date().getFullYear()}{" "}
                <a
                  href={appConfig.siteUrl}
                  className="text-gray-400 no-underline visited:text-gray-400 hover:text-gray-400"
                  target="_blank"
                >
                  {appConfig.siteUrl.replace(/^https?:\/\//, "")}
                </a>
              </Text>
              <Text className="text-xs">
                This email was intended for{" "}
                <span className="text-black">{email}</span>. If you were not
                expecting this email, you can ignore this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default PasswordReset;
