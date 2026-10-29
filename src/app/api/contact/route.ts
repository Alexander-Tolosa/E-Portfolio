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
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim() || "New message from your portfolio";
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email and message are required." },
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

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);
    const received = formatManilaTime();

    const resend = new Resend(apiKey);
    const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "alexandertolosa45@gmail.com";

    const html = emailShell(
      `<h1 style="${emailStyles.heading}">${safeSubject}</h1>
       <p style="${emailStyles.body}white-space:pre-wrap;">${safeMessage}</p>
       ${detailRows([
         ["From", safeName],
         ["Email", `<a href="mailto:${safeEmail}" style="${emailStyles.link}">${safeEmail}</a>`],
         ["Received", received],
       ])}`,
      `Reply to this email to answer ${safeName}. Your reply goes to ${safeEmail}.`
    );

    const text = [
      subject,
      "",
      message,
      "",
      `From: ${name}`,
      `Email: ${email}`,
      `Received: ${received}`,
      "",
      `Reply to this email to answer ${name}.`,
    ].join("\n");

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email,
      subject: `[Portfolio Contact] ${subject.replace(/[\r\n]+/g, " ")}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { success: false, message: error.message || "Failed to send email via Resend." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    console.error("Contact API route error:", err);
    const message = err instanceof Error ? err.message : "An internal error occurred while processing your request.";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
