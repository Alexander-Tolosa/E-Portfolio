import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Graceful fallback for local development if Resend API key is not yet set
      console.warn("RESEND_API_KEY is not configured in environment variables.");
      return NextResponse.json({
        success: true,
        message: "Thank you for subscribing! (Dev mode: API key pending)",
        email: trimmedEmail,
      });
    }

    const resend = new Resend(apiKey);
    const notificationRecipient =
      process.env.CONTACT_NOTIFICATION_EMAIL || "alexandertolosa45@gmail.com";

    // 1. Send confirmation & welcome email to the subscriber
    const subscriberEmailPromise = resend.emails.send({
      from: "Alexander Tolosa <onboarding@resend.dev>",
      to: [trimmedEmail],
      subject: "✨ You're Subscribed to Alexander Tolosa's Updates!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; margin: 0; padding: 24px; color: #f3f4f6; }
              .container { max-width: 580px; margin: 0 auto; background-color: #0b0f19; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.6); }
              .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 32px 28px; text-align: left; }
              .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; }
              .header p { margin: 6px 0 0 0; color: rgba(255, 255, 255, 0.85); font-size: 14px; }
              .content { padding: 32px 28px; line-height: 1.6; font-size: 14px; color: #d1d5db; }
              .highlight-card { background-color: #111827; border: 1px solid #1f2937; border-left: 4px solid #6366f1; border-radius: 8px; padding: 16px 20px; margin: 20px 0; }
              .btn { display: inline-block; background-color: #5b52f9; color: #ffffff !important; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 9999px; margin-top: 16px; font-size: 14px; }
              .footer { background-color: #050811; padding: 20px 28px; text-align: center; border-top: 1px solid #1f2937; font-size: 12px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Welcome to the Newsletter!</h1>
                <p>Stay in the loop with Alexander Tolosa's latest builds &amp; write-ups</p>
              </div>
              <div class="content">
                <p>Hello,</p>
                <p>
                  Thank you for subscribing! You will now be among the first to receive updates on:
                </p>
                <div class="highlight-card">
                  <p style="margin: 0 0 8px 0;">🚀 <strong>New Proposed Projects:</strong> Early previews &amp; live demos</p>
                  <p style="margin: 0 0 8px 0;">💡 <strong>AI &amp; Automation:</strong> Architecture insights &amp; workflows</p>
                  <p style="margin: 0;">🎨 <strong>Frontend Engineering:</strong> Design experiments &amp; technical articles</p>
                </div>
                <p>
                  Feel free to reply to this email anytime if you'd like to collaborate, discuss a project idea, or give feedback.
                </p>
                <a href="https://github.com/Alexander-Tolosa" class="btn" target="_blank">
                  Explore GitHub Projects &rarr;
                </a>
              </div>
              <div class="footer">
                &copy; ${new Date().getFullYear()} Alexander Tolosa &bull; Iloilo, Philippines<br>
                You are receiving this because you subscribed on Alexander's portfolio website.
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // 2. Send notification email to Alexander Tolosa
    const notificationPromise = resend.emails.send({
      from: "Portfolio Newsletter <onboarding@resend.dev>",
      to: [notificationRecipient],
      subject: `📬 New Newsletter Subscriber: ${trimmedEmail}`,
      html: `
        <div style="font-family: sans-serif; background-color: #0b0f19; color: #f3f4f6; padding: 24px; border-radius: 12px;">
          <h2 style="color: #6366f1; margin-top: 0;">🎉 New Newsletter Subscriber!</h2>
          <p>A new user just subscribed to your newsletter on your portfolio:</p>
          <div style="background-color: #111827; padding: 16px; border-radius: 8px; border: 1px solid #1f2937; margin: 16px 0;">
            <p style="margin: 0;"><strong>Subscriber Email:</strong> <a href="mailto:${trimmedEmail}" style="color: #818cf8;">${trimmedEmail}</a></p>
            <p style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af;">Timestamp: ${new Date().toUTCString()}</p>
          </div>
        </div>
      `,
    });

    // Send both in parallel
    const [subscriberRes, notifRes] = await Promise.allSettled([
      subscriberEmailPromise,
      notificationPromise,
    ]);

    if (
      subscriberRes.status === "rejected" &&
      notifRes.status === "rejected"
    ) {
      console.error("Resend error sending newsletter emails:", subscriberRes.reason);
      return NextResponse.json(
        {
          success: false,
          message: "Unable to process subscription via email service. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully! Welcome email sent.",
      email: trimmedEmail,
    });
  } catch (err: any) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err?.message || "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
