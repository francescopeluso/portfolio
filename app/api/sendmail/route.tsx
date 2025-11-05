import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  message: string;
  recaptchaToken: string;
}

const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export async function POST(request: NextRequest) {
    const { name, email, message, recaptchaToken }: EmailData = await request.json();

    // Validate required fields
    if (!name || !name.trim()) {
        return NextResponse.json({
            message: 'Name is required.',
        }, { status: 400 });
    }

    if (!email || !email.trim()) {
        return NextResponse.json({
            message: 'Email is required.',
        }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({
            message: 'Please provide a valid email address.',
        }, { status: 400 });
    }

    if (!message || !message.trim()) {
        return NextResponse.json({
            message: 'Message is required.',
        }, { status: 400 });
    }

    if (!recaptchaToken) {
        return NextResponse.json({
            message: 'reCAPTCHA token is missing.',
        }, { status: 400 });
    }

    // Verifica il token reCAPTCHA
    const recaptchaVerificationResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            secret: SECRET_KEY || '',
            response: recaptchaToken
        }).toString(),
    });
  
    const recaptchaVerificationResult = await recaptchaVerificationResponse.json();

    if (!recaptchaVerificationResult.success) {
        return NextResponse.json({
            message: 'reCAPTCHA verification failed. Please try again.',
        }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT ?? '465'),
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        authMethod: 'PLAIN',
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        await transporter.verify();
        console.log('SMTP connection verified successfully');

        await transporter.sendMail({
            from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `Francesco Peluso | New message from ${name}`,
            text: `You received a message from ${name} (${email}):\n\n${message}`,
            html: `<p>You received a message from ${name} (${email}):</p><p>${message}</p>`
        });
        return NextResponse.json({ message: 'Mail was sent successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Errore nell\'invio dell\'email:', error);
        return NextResponse.json({ 
            message: 'Errore nell\'invio dell\'email',
            error: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}