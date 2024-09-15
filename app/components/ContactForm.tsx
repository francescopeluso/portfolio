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
        <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
            <label htmlFor="name" className="text-sm font-bold">Your name</label>
            <Input type="text" id="name" name="name" className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none bg-gray-100" onChange={handleChange} />
            <label htmlFor="email" className="text-sm font-bold">Your email address</label>
            <Input type="email" id="email" name="email" className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none bg-gray-100" onChange={handleChange} />
            <label htmlFor="message" className="text-sm font-bold mt-4">Write a message...</label>
            <TextArea id="message" name="message" className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none bg-gray-100" onChange={handleChange} />
            <button type="submit" className="bg-black dark:bg-white text-white dark:text-black font-bold p-2 rounded-md hover:bg-gray-700 dark:hover:200">Send message</button>
            {
                status && 
                <p className="rounded-md p-2 text-dark bg-black dark:bg-white dark:text-black text-white">
                    {status}
                </p>
            }
        </form>
    );
}

export default ContactForm;