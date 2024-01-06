import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const emailServer = process.env.NEXT_PUBLIC_EMAIL_SERVER;
const domain = process.env.NEXT_PUBLIC_DOMAIN_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: emailServer as string,
    to: email,
    subject: "2FA Code",
    html: `<h3 style="font-size:18px;font-weight:700;">Your 2FA code: ${token}</h3>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: emailServer as string,
    to: email,
    subject: "Reset your password",
    html: `<h3 style="font-size:18px;font-weight:700;">Click <a href="${resetLink}" target="_blank" rel="noopener noreferrer">here</a> to reset password.</h3>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/verification?token=${token}`;

  await resend.emails.send({
    from: emailServer as string,
    to: email,
    subject: "Confirm your email",
    html: `<h3 style="font-size:18px;font-weight:700;">Click <a href="${confirmLink}" target="_blank" rel="noopener noreferrer">here</a> to confirm email.</h3>`,
  });
};
