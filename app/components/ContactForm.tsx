"use client";

import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import TextArea from "../components/TextArea";
import Input from "../components/Input";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
    const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    useEffect(() => {
        if (!SITE_KEY) {
            console.error('reCAPTCHA site key is not configured');
            return;
        }

        if (!window.grecaptcha) {
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
            script.async = true;
            script.onload = () => setIsRecaptchaReady(true);
            script.onerror = () => {
                console.error('Failed to load reCAPTCHA script');
                setStatus('Failed to load reCAPTCHA. Please refresh the page.');
            };
            document.body.appendChild(script);
        } else {
            setIsRecaptchaReady(true);
        }
    }, [SITE_KEY]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setStatus('Please fill in all fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus('Please enter a valid email address.');
            return;
        }

        if (!SITE_KEY) {
            setStatus('reCAPTCHA is not configured.');
            return;
        }

        if (!isRecaptchaReady) {
            setStatus('reCAPTCHA is still loading. Please try again.');
            return;
        }

        setStatus('Verifying...');

        try {
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(async (token: string) => {
                    setStatus('Sending...');

                    const response = await fetch('/api/sendmail', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...formData, recaptchaToken: token })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        setStatus('Message sent. I will reply as soon as possible.');
                        setFormData({ name: '', email: '', message: '' });
                    } else {
                        setStatus(`Error: ${data.message || 'Something went wrong.'}`);
                    }
                });
            });
        } catch (error) {
            setStatus('Failed to send. Check your connection and try again.');
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="name" className="text-sm font-bold">name</label>
            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            <label htmlFor="email" className="text-sm font-bold">email</label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            <label htmlFor="message" className="text-sm font-bold">message</label>
            <TextArea id="message" name="message" value={formData.message} onChange={handleChange} />
            <button
                type="submit"
                className="border border-white px-4 py-2 text-sm font-bold hover:bg-white hover:text-black transition-all duration-150"
            >
                send
            </button>
            {status && (
                <p className="border border-white p-3 text-sm">{status}</p>
            )}
        </form>
    );
}

export default ContactForm;
