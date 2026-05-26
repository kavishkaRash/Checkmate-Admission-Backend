/**
 * Generates an elegant, business-themed HTML email template for inquiries and verification.
 * * @param {Object} data - The core attributes for the email template.
 * @param {string} data.fullName - Full name of the applicant.
 * @param {string} data.email - Email address of the applicant.
 * @param {string} data.phoneNumber - Contact number of the applicant.
 * @param {string} data.subject - Subject of the inquiry.
 * @param {string} data.message - Detailed message from the applicant.
 * @param {string|number} data.otp - One-Time Password for verification.
 * @returns {string} The complete HTML template string.
 */
export function getDesignedEmailInquiries({ fullName, email, phoneNumber, subject, message }) {
    const currentYear = new Date().getFullYear();

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Inquiry & Verification</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: 'Segoe UI', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #FFFFFF; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(2, 6, 24, 0.04); border: 1px solid rgba(2, 6, 24, 0.05);">
          
          <tr>
            <td style="background-color: #020618; padding: 40px 40px 35px 40px; text-align: left; position: relative;">
              <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background-color: #00ffef;"></div>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <span style="color: #00ffef; font-size: 10px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; display: block; margin-bottom: 8px;">Management Vault</span>
                    <h1 style="color: #FFFFFF; font-size: 26px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">Verification & Inquiry</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px;">
              
              
              <h2 style="color: #020618; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 16px 0; border-bottom: 1px solid rgba(2, 6, 24, 0.06); padding-bottom: 8px;">
                Applicant Core Profile
              </h2>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 35px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px dashed rgba(2, 6, 24, 0.04); width: 35%; font-size: 13px; color: rgba(2, 6, 24, 0.4); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px dashed rgba(2, 6, 24, 0.04); font-size: 15px; color: #020618; font-weight: 700;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px dashed rgba(2, 6, 24, 0.04); font-size: 13px; color: rgba(2, 6, 24, 0.4); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</td>
                  <td style="padding: 10px 0; border-bottom: 1px dashed rgba(2, 6, 24, 0.04); font-size: 14px; color: #020618; font-weight: 500;"><a href="mailto:${email}" style="color: #020618; text-decoration: none; border-bottom: 1px solid #00ffef;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px dashed rgba(2, 6, 24, 0.04); font-size: 13px; color: rgba(2, 6, 24, 0.4); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</td>
                  <td style="padding: 10px 0; border-bottom: 1px dashed rgba(2, 6, 24, 0.04); font-size: 14px; color: #020618; font-weight: 700;"><a href="tel:${phoneNumber}" style="color: #020618; text-decoration: none;">${phoneNumber}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 13px; color: rgba(2, 6, 24, 0.4); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Subject Context</td>
                  <td style="padding: 10px 0; font-size: 14px; color: #020618; font-weight: 600;">${subject}</td>
                </tr>
              </table>

              <h2 style="color: #020618; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 16px 0; border-bottom: 1px solid rgba(2, 6, 24, 0.06); padding-bottom: 8px;">
                Statement / Message
              </h2>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="background-color: rgba(2, 6, 24, 0.02); border-left: 3px solid #00ffef; padding: 20px 24px; border-radius: 0 16px 16px 0;">
                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #020618; font-style: italic; white-space: pre-line;">
                      ${message}
                    </p>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 35px; text-align: center;">
                <tr>
                  <td>
                    <a href="mailto:${email}" style="background-color: #020618; color: #FFFFFF; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; text-decoration: none; padding: 14px 30px; border-radius: 12px; display: inline-block; box-shadow: 0 10px 20px rgba(2, 6, 24, 0.15);">
                      Reply to Applicant
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <tr>
            <td style="background-color: #F8FAFC; padding: 24px 40px; text-align: center; border-top: 1px solid rgba(2, 6, 24, 0.03);">
              <p style="margin: 0; font-size: 11px; color: rgba(2, 6, 24, 0.4); font-weight: 500;">
                This is an automated system notification routed via Checkmate Admission Portal.
              </p>
              <p style="margin: 6px 0 0 0; font-size: 10px; color: rgba(2, 6, 24, 0.3);">
                © ${currentYear} Checkmate Admission. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
        
      </body>
      </html>
    `;
}