import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const limits = { name: 100, email: 254, message: 5000 } as const;

type ContactInput = { name?: unknown; email?: unknown; message?: unknown; website?: unknown; recaptchaToken?: unknown };

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

export async function POST(request: NextRequest) {
  let input: ContactInput;
  try { input = await request.json(); } catch { return NextResponse.json({ message: "Invalid request." }, { status: 400 }); }

  if (text(input.website, 200)) return NextResponse.json({ message: "Message sent." }, { status: 200 });
  const name = text(input.name, limits.name);
  const email = text(input.email, limits.email);
  const message = text(input.message, limits.message);
  const token = text(input.recaptchaToken, 4000);
  if (!name || !email || !message || !emailPattern.test(email)) return NextResponse.json({ message: "Please check the form fields." }, { status: 400 });

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || !token) return NextResponse.json({ message: "The contact form is temporarily unavailable." }, { status: 503 });
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ secret, response: token }), signal: AbortSignal.timeout(5000) });
    const result = await response.json() as { success?: boolean; score?: number; action?: string };
    if (!result.success || (result.score !== undefined && result.score < 0.5) || (result.action !== undefined && result.action !== "contact")) return NextResponse.json({ message: "Verification failed. Please try again." }, { status: 400 });
  } catch { return NextResponse.json({ message: "Verification is temporarily unavailable." }, { status: 503 }); }

  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port, secure: port === 465, auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } });
  const safeName = escapeHtml(name), safeEmail = escapeHtml(email), safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  try {
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || "Portfolio contact"}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Francesco Peluso · message from ${name}`,
      text: `New portfolio message from ${name} (${email})\n\n${message}`,
      html: `<!doctype html><html><body style="margin:0;background:#f2f0eb;color:#171717;font-family:Arial,sans-serif"><div style="max-width:620px;margin:32px auto;padding:40px;border:1px solid #c9c5bc;background:#f2f0eb"><p style="margin:0 0 48px;font:12px monospace;letter-spacing:2px;text-transform:uppercase;color:#77746e">FRANCESCO PELUSO · NEW MESSAGE</p><h1 style="margin:0 0 32px;font:normal 42px Georgia,serif;line-height:1">A new signal<br><i>from your portfolio.</i></h1><div style="border-top:1px solid #c9c5bc;padding-top:24px"><p style="font:12px monospace;color:#77746e">FROM</p><p style="font:16px monospace"><strong>${safeName}</strong><br><a href="mailto:${safeEmail}" style="color:#171717">${safeEmail}</a></p><p style="font:12px monospace;color:#77746e;margin-top:32px">MESSAGE</p><p style="font:16px/1.6 Arial,sans-serif">${safeMessage}</p></div><p style="margin:48px 0 0;font:12px monospace;color:#77746e">Reply directly to this email to continue the conversation ↗</p></div></body></html>`,
    });
    return NextResponse.json({ message: "Message sent. I will reply as soon as possible." });
  } catch (error) {
    console.error("Contact email delivery failed", error instanceof Error ? error.name : "unknown error");
    return NextResponse.json({ message: "Message could not be sent. Please try again later." }, { status: 500 });
  }
}
