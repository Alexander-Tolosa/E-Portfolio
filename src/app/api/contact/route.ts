import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields (name, email, subject, message) are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "RESEND_API_KEY is not set in environment variables.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "alexandertolosa45@gmail.com";

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; margin: 0; padding: 24px; color: #f3f4f6; }
              .container { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5); }
              .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 28px 32px; text-align: left; }
              .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.025em; }
              .header p { margin: 4px 0 0 0; color: rgba(255, 255, 255, 0.8); font-size: 13px; }
              .content { padding: 32px; }
              .field-group { margin-bottom: 20px; }
              .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; font-weight: 600; margin-bottom: 6px; }
              .value { font-size: 15px; color: #f9fafb; font-weight: 500; }
              .value a { color: #818cf8; text-decoration: none; }
              .divider { height: 1px; background-color: #1f2937; margin: 24px 0; }
              .message-box { background-color: #1f2937; border-left: 4px solid #6366f1; border-radius: 8px; padding: 20px; margin-top: 8px; }
              .message-text { margin: 0; font-size: 14px; line-height: 1.6; color: #e5e7eb; white-space: pre-wrap; }
              .footer { background-color: #0b0f19; padding: 20px 32px; text-align: center; border-top: 1px solid #1f2937; font-size: 12px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📬 New Portfolio Inquiry</h1>
                <p>Received from your website's contact section</p>
              </div>
              <div class="content">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <div class="field-group">
                    <div class="label">Sender Name</div>
                    <div class="value">${name}</div>
                  </div>
                  <div class="field-group">
                    <div class="label">Email Address</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                </div>

                <div class="field-group" style="margin-top: 8px;">
                  <div class="label">Subject</div>
                  <div class="value">${subject}</div>
                </div>

                <div class="divider"></div>

                <div class="field-group">
                  <div class="label">Message</div>
                  <div class="message-box">
                    <p class="message-text">${message}</p>
                  </div>
                </div>
              </div>
              <div class="footer">
                Tip: You can hit <strong>Reply</strong> directly in your email client to respond to ${name} (${email}).
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { success: false, message: error.message || "Failed to send email via Resend." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Contact API route error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "An internal error occurred while processing your request." },
      { status: 500 }
    );
  }
}
