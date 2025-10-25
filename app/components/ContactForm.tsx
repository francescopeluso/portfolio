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
        const loadRecaptchaScript = () => {
            if (!window.grecaptcha) {
                const script = document.createElement('script');
                script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
                script.async = true;
                script.onload = () => setIsRecaptchaReady(true);
                document.body.appendChild(script);
            } else {
                setIsRecaptchaReady(true);
            }
        };

        loadRecaptchaScript();
    }, [SITE_KEY]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!isRecaptchaReady) {
            setStatus('reCAPTCHA is still loading. Please try again.');
            return;
        }

        setStatus('Verifying reCAPTCHA...');

        try {
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(async (token: string) => {
                    setStatus('Sending message...');

                    const response = await fetch('/api/sendmail', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...formData, recaptchaToken: token })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        setStatus('Your message has been sent successfully. I will reply as soon as possible.');
                        setFormData({ name: '', email: '', message: '' });
                    } else {
                        setStatus(`Error: ${data.message || 'An error occurred. Please try again later.'}`);
                    }
                });
            });
        } catch (error) {
            setStatus('An error occurred while sending the message. Check your internet connection and try again.');
        }
    };

    return (
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            <label htmlFor="name" className="text-sm font-bold tracking-tight">Your name</label>
            <Input type="text" id="name" name="name" className="p-3 border border-gray-300/50 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-[#4a90e2]/50 focus:border-[#4a90e2] focus:outline-none bg-white/50 dark:bg-black/50 backdrop-blur-sm transition-all duration-300" onChange={handleChange} />
            <label htmlFor="email" className="text-sm font-bold tracking-tight">Your email address</label>
            <Input type="email" id="email" name="email" className="p-3 border border-gray-300/50 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-[#4a90e2]/50 focus:border-[#4a90e2] focus:outline-none bg-white/50 dark:bg-black/50 backdrop-blur-sm transition-all duration-300" onChange={handleChange} />
            <label htmlFor="message" className="text-sm font-bold tracking-tight mt-2">Write a message...</label>
            <TextArea id="message" name="message" className="p-3 border border-gray-300/50 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-[#4a90e2]/50 focus:border-[#4a90e2] focus:outline-none bg-white/50 dark:bg-black/50 backdrop-blur-sm transition-all duration-300 min-h-[120px]" onChange={handleChange} />
            <button type="submit" className="bg-gradient-to-r from-[#4a90e2] to-[#9013fe] text-white font-bold tracking-tight py-3 px-4 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300">Send message</button>
            {
                status &&
                <p className="rounded-lg p-3 text-sm bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 shadow-md">
                    {status}
                </p>
            }
        </form>
    );
}

export default ContactForm;