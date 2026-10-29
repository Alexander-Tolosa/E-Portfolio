import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  detailRows,
  emailShell,
  emailStyles,
  escapeHtml,
  formatManilaTime,
} from "@/lib/email";

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
    const safeEmail = escapeHtml(trimmedEmail);

    // 1. Welcome email to the subscriber
    const subscriberEmailPromise = resend.emails.send({
      from: "Alexander Tolosa <onboarding@resend.dev>",
      to: [trimmedEmail],
      subject: "You're subscribed",
      html: emailShell(
        `<h1 style="${emailStyles.heading}">Thanks for subscribing</h1>
         <p style="${emailStyles.body}">I'll write to you when I publish a new project or write-up. There is no fixed schedule.</p>
         <p style="${emailStyles.body}">If you want to talk about a project or leave feedback, reply to this email. It comes straight to me.</p>
         <p style="${emailStyles.body}">Alexander<br><a href="https://github.com/Alexander-Tolosa" style="${emailStyles.link}">github.com/Alexander-Tolosa</a></p>`,
        `You got this because ${safeEmail} was subscribed on my portfolio website. If that wasn't you, reply and I'll remove the address.`
      ),
      text: [
        "Thanks for subscribing",
        "",
        "I'll write to you when I publish a new project or write-up. There is no fixed schedule.",
        "",
        "If you want to talk about a project or leave feedback, reply to this email. It comes straight to me.",
        "",
        "Alexander",
        "https://github.com/Alexander-Tolosa",
        "",
        `You got this because ${trimmedEmail} was subscribed on my portfolio website. If that wasn't you, reply and I'll remove the address.`,
      ].join("\n"),
    });

    // 2. Notification email to Alexander Tolosa
    const received = formatManilaTime();
    const notificationPromise = resend.emails.send({
      from: "Portfolio Newsletter <onboarding@resend.dev>",
      to: [notificationRecipient],
      subject: `New newsletter subscriber: ${trimmedEmail.replace(/[\r\n]+/g, " ")}`,
      html: emailShell(
        `<h1 style="${emailStyles.heading}">New newsletter subscriber</h1>
         ${detailRows([
           ["Email", `<a href="mailto:${safeEmail}" style="${emailStyles.link}">${safeEmail}</a>`],
           ["Received", received],
         ])}`,
        "Sent by the newsletter form on your portfolio."
      ),
      text: `New newsletter subscriber\n\nEmail: ${trimmedEmail}\nReceived: ${received}`,
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
  } catch (err: unknown) {
    console.error("Newsletter API error:", err);
    const message = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}
