"use client";

import { FormEvent, useState } from "react";

type Status = { kind: "success" | "error"; text: string } | null;

export function ContactForm() {
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || !(window as Window & { grecaptcha?: Grecaptcha }).grecaptcha) {
      setStatus({ kind: "error", text: "The form is not ready yet. Please refresh and try again." });
      return;
    }
    setSending(true);
    try {
      const grecaptcha = (window as unknown as { grecaptcha: Grecaptcha }).grecaptcha;
      const token = await grecaptcha.execute(siteKey, { action: "contact" });
      const response = await fetch("/api/sendmail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), email: data.get("email"), message: data.get("message"), website: data.get("website"), recaptchaToken: token }) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "Something went wrong.");
      form.reset();
      setStatus({ kind: "success", text: result.message || "Message sent." });
    } catch (error) { setStatus({ kind: "error", text: error instanceof Error ? error.message : "Message could not be sent." }); }
    finally { setSending(false); }
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <label htmlFor="name">name<input id="name" name="name" required maxLength={100} autoComplete="name" /></label>
    <label htmlFor="email">email<input id="email" name="email" type="email" required maxLength={254} autoComplete="email" /></label>
    <label htmlFor="message">message<textarea id="message" name="message" required maxLength={5000} rows={5} /></label>
    <button type="submit" disabled={sending}>{sending ? "sending…" : "send message ↗"}</button>
    {status && <p className={`form-status ${status.kind}`} role="status">{status.text}</p>}
    <p className="recaptcha-disclosure">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</p>
  </form>;
}

type Grecaptcha = { execute: (siteKey: string, options: { action: string }) => Promise<string> };
