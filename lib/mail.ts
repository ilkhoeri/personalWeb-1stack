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
    // html: `<h3 style="font-size:18px;font-weight:700;">Click <a href="${confirmLink}" target="_blank" rel="noopener noreferrer">here</a> to confirm email.</h3>`,
    html: ComponentsSendVerificationEmail({domain,confirmLink}),
  });
};


export const ComponentsSendVerificationEmail = ({
  domain,
  confirmLink,
}: {
  domain: string | undefined;
  confirmLink: string;
}) => `<table
      id="u_body"
      style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%;box-sizing: border-box;margin: 0;"
      cellpadding="0"
      cellspacing="0"
    >
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <div
              class="u-row-container"
              style="padding: 0px;background-image: url('${domain}/images/mail/image-10.png');background-repeat: repeat;background-position: center top;background-color: transparent;min-width: 100%;"
            >
              <div
                class="u-row"
                style="margin: 0 auto;min-width: 320px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;"
              >
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <div class="u-col u-col-100" style="min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                      <img
                                        align="center"
                                        border="0"
                                        src="${domain}/images/mail/image-2.png"
                                        alt="image"
                                        title="image"
                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 59%;max-width: 354px;"
                                        width="354"
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family:arial,helvetica,sans-serif;margin-top: 32px;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 20px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <h1 style="margin: 0px; color: #63fff7; line-height: 100%; text-align: center; word-wrap: break-word; font-family: 'Montserrat',sans-serif; font-size: 60px; font-weight: 700;">
                                  aoeri.dev
                                </h1>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div
                class="u-row"
                style="margin: 0 auto;min-width: 320px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;"
              >
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <div class="u-col u-col-100" style="min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #00003a;height: 100%;width: 100% !important;">
                      <div style="box-sizing: border-box; height: 100%; padding: 4px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <div align="center">
                                  <a
                                    href="${confirmLink}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #000000; background-color: #63fff7; border-radius: 6px;-webkit-border-radius: 6px; -moz-border-radius: 6px; width:39%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 20px;font-weight: 700;padding-block: 8px;"
                                  >
                                    Confirm your email
                                  </a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <h1 style="margin: 0px; color: #ffffff; line-height: 120%; text-align: center; word-wrap: break-word; font-family: 'Montserrat',sans-serif; font-size: 24px; font-weight: 700;">
                                  <span>
                                    <span>or copy</span>
                                  </span>
                                </h1>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <blockquote style="margin: 0px; color: #ffffff; line-height: 120%; text-align: center; word-wrap: break-word; font-size: 16px; border-radius: 8px;overflow: hidden;font-weight: 500;padding: 16px;background-image: url('${domain}/images/mail/image-10.png');background-repeat: repeat;background-position: center top;background-color: transparent;height: max-content;">
                                  <code>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    <br />
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    <br />
                                    Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
                                    lacus vel facilisis.
                                  </code>
                                </blockquote>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                      <img
                                        align="center"
                                        border="0"
                                        src="${domain}/images/mail/image-4.png"
                                        alt="image"
                                        title="image"
                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 40%;max-width: 232px;"
                                        width="232"
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 2px 0px 0px;background-color: transparent">
              <div
                class="u-row"
                style="margin: 0 auto;min-width: 320px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;"
              >
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <div class="u-col u-col-33p33" style="min-width: 200px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #00003a;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                      <img
                                        align="center"
                                        border="0"
                                        src="${domain}/images/mail/image-3.png"
                                        alt="image"
                                        title="image"
                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 50%;max-width: 90px;"
                                        width="90"
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <h1 style="margin: 0px; color: #ffffff; line-height: 120%; text-align: center; word-wrap: break-word; font-size: 18px; font-weight: 400;">
                                  <span style="line-height: 21.6px;">
                                    <span style="line-height: 21.6px;">
                                      <span style="line-height: 21.6px;">
                                        <span style="line-height: 21.6px;">
                                          <span style="line-height: 21.6px;">
                                            Quality
                                            <br />
                                            services
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </h1>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div class="u-col u-col-33p33" style="min-width: 200px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #00003a;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                      <img
                                        align="center"
                                        border="0"
                                        src="${domain}/images/mail/image-5.png"
                                        alt="image"
                                        title="image"
                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 50%;max-width: 90px;"
                                        width="90"
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <h1 style="margin: 0px; color: #ffffff; line-height: 120%; text-align: center; word-wrap: break-word; font-size: 18px; font-weight: 400;">
                                  <span>
                                    <span style="line-height: 21.6px;">
                                      <span style="line-height: 21.6px;">
                                        Fast and
                                        <br />
                                        reliable
                                      </span>
                                    </span>
                                  </span>
                                </h1>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div class="u-col u-col-33p33" style="min-width: 200px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #00003a;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                      <img
                                        align="center"
                                        border="0"
                                        src="${domain}/images/mail/image-1.png"
                                        alt="image"
                                        title="image"
                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 50%;max-width: 90px;"
                                        width="90"
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 30px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <h1 style="margin: 0px; color: #ffffff; line-height: 120%; text-align: center; word-wrap: break-word; font-size: 18px; font-weight: 400;">
                                  <span>
                                    <span style="line-height: 21.6px;">
                                      <span style="line-height: 21.6px;">
                                        <span style="line-height: 21.6px;">
                                          Excellent
                                          <br />
                                          support
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </h1>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div
                class="u-row"
                style="margin: 0 auto;min-width: 320px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;"
              >
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <div class="u-col u-col-100" style="min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #00003a;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <div style="box-sizing: border-box; height: 100%; padding: 20px 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Open Sans',sans-serif; font-size: 22px; font-weight: 400;">
                                  <span>
                                    <strong>Need any Help?</strong>
                                  </span>
                                </h1>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <div style="font-family: 'Montserrat',sans-serif; font-size: 14px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="line-height: 140%;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <div align="center">
                                  <a
                                    href="http://"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #000000; background-color: #63fff7; border-radius: 6px;-webkit-border-radius: 6px; -moz-border-radius: 6px; width:39%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 20px;font-weight: 700;padding-block: 8px;"
                                  >
                                    Contact Us
                                  </a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="u-row-container" style="padding: 2px 0px 0px;background-color: transparent">
              <div
                class="u-row"
                style="margin: 0 auto;min-width: 320px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;"
              >
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <div class="u-col u-col-100" style="min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #00003a;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:0px 0px 10px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <table
                                  height="0px"
                                  align="center"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"
                                >
                                  <tbody>
                                    <tr style="vertical-align: top">
                                      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                        <span>&#160;</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:20px 50px 10px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <div style="font-size: 14px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style="font-family:arial,helvetica,sans-serif;"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          border="0"
                        >
                          <tbody>
                            <tr>
                              <td
                                style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 60px;font-family:arial,helvetica,sans-serif;"
                                align="left"
                              >
                                <div align="center">
                                  <div style="display: table; max-width:187px;">
                                    <table
                                      align="left"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      width="32"
                                      height="32"
                                      style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px"
                                    >
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            align="left"
                                            valign="middle"
                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"
                                          >
                                            <a href="https://www.facebook.com/unlayer" title="Facebook" target="_blank">
                                              <img
                                                src="${domain}/images/mail/image-8.png"
                                                alt="Facebook"
                                                title="Facebook"
                                                width="32"
                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important"
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      align="left"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      width="32"
                                      height="32"
                                      style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px"
                                    >
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            align="left"
                                            valign="middle"
                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"
                                          >
                                            <a
                                              href="https://www.linkedin.com/company/unlayer/mycompany/"
                                              title="LinkedIn"
                                              target="_blank"
                                            >
                                              <img
                                                src="${domain}/images/mail/image-6.png"
                                                alt="LinkedIn"
                                                title="LinkedIn"
                                                width="32"
                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important"
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>

                                    <table
                                      align="left"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      width="32"
                                      height="32"
                                      style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px"
                                    >
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            align="left"
                                            valign="middle"
                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"
                                          >
                                            <a
                                              href="https://www.instagram.com/unlayer_official/"
                                              title="Instagram"
                                              target="_blank"
                                            >
                                              <img
                                                src="${domain}/images/mail/image-9.png"
                                                alt="Instagram"
                                                title="Instagram"
                                                width="32"
                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important"
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>

                                    <table
                                      align="left"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      width="32"
                                      height="32"
                                      style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px"
                                    >
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            align="left"
                                            valign="middle"
                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"
                                          >
                                            <a href="https://twitter.com/unlayerapp" title="X" target="_blank">
                                              <img
                                                src="${domain}/images/mail/image-7.png"
                                                alt="X"
                                                title="X"
                                                width="32"
                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important"
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
  </table>`;