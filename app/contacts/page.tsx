import { TransitionLink } from "../components/TransitionLink";
import BlinkingCursor from "../components/BlinkingCursor";
import Typewriter from "../components/TypingEffect";
import ContactForm from "../components/ContactForm";
import Link from "next/link";

import { FaGithub, FaLinkedin, FaReddit, FaTelegram } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'About me',
};

export default function Contacts() {
    return (
        <div className="bg-white dark:bg-black rounded-t-[36px] mx-auto w-[99%] flex flex-col items-start justify-center min-h-screen mt-4 p-8 pb-20 gap-8 font-[family-name:var(--font-geist-sans)]">
            
            <TransitionLink
                href="/"
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            >&larr; Go back</TransitionLink>
            
            <h2 className="text-3xl font-[family-name:var(--font-geist-mono)]">
                <Typewriter text="contact me" /><BlinkingCursor />
            </h2>

            <div className="flex flex-col md:flex-row gap-8 w-full">
                <div className="flex flex-col gap-4 md:w-[67%]">
                    <p>
                        If you want to contact me for any information or curiosity, feel free to fill out the form below. I will reply as soon as possible.
                    </p>
                    <ContactForm />
                </div>
                <div className="flex flex-col gap-4 justify-center items-center md:w-[33%]">
                    <p>Or just connect with me on social media:</p>
                    <div className="flex gap-4 items-center flex-col md:flex-row md:flex-wrap">
                        <Link 
                            href="https://github.com/francescopeluso"
                            className='flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-200'
                            target='_blank'
                        ><FaGithub size={24} /> <span>GitHub</span></Link>
                        <Link
                            href="https://linkedin.com/in/francescopeluso04"
                            className='flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-200'
                            target='_blank'
                        ><FaLinkedin size={24} /> <span>LinkedIn</span></Link>
                        <Link
                            href="https://reddit.com/u/ThatsFrankie"
                            className='flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-200'
                            target='_blank'
                        ><FaReddit size={24} /> <span>Reddit</span></Link>
                        <Link
                            href="https://t.me/thatsfrankiee"
                            className='flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-200'
                            target='_blank'
                        ><FaTelegram size={24} /> <span>Telegram</span></Link>
                    </div>
                </div>
                
            </div>

        </div>
    );
}
