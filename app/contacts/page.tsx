import { TransitionLink } from "../components/TransitionLink";
import BlinkingCursor from "../components/BlinkingCursor";
import Typewriter from "../components/TypingEffect";
import ContactForm from "../components/ContactForm";
import Link from "next/link";

import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'About me',
};

export default function Contacts() {
    return (
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-t-3xl mx-auto w-[99%] flex flex-col items-start justify-center min-h-screen mt-4 p-6 md:p-8 pb-16 gap-6 font-[family-name:var(--font-geist-sans)] border-t border-x border-gray-200/50 dark:border-gray-800/50 shadow-2xl">

            <TransitionLink
                href="/"
                className="flex items-center gap-2 font-semibold tracking-tight hover:underline hover:underline-offset-4 transition-all duration-300 hover:gap-3"
            >&larr; Go back</TransitionLink>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-[family-name:var(--font-geist-mono)]">
                <Typewriter text="contact me" /><BlinkingCursor />
            </h2>

            <div className="flex flex-col md:flex-row gap-8 w-full">
                <div className="flex flex-col gap-4 md:w-[67%]">
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                        If you want to contact me for any information or curiosity, feel free to fill out the form below. I will reply as soon as possible.
                    </p>
                    <ContactForm />
                </div>
                <div className="flex flex-col gap-4 justify-center items-center md:w-[33%]">
                    <p className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">Or connect here:</p>
                    <div className="flex gap-3 items-center flex-col w-full">
                        <Link
                            href="https://github.com/francescopeluso"
                            className='group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:bg-white dark:hover:bg-black hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 w-full justify-center'
                            target='_blank'
                        >
                            <FaGithub size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                            <span className="font-semibold tracking-tight">GitHub</span>
                        </Link>
                        <Link
                            href="https://linkedin.com/in/francescopeluso04"
                            className='group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:bg-white dark:hover:bg-black hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-blue-400/50 w-full justify-center'
                            target='_blank'
                        >
                            <FaLinkedin size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                            <span className="font-semibold tracking-tight">LinkedIn</span>
                        </Link>
                        <Link
                            href="https://t.me/thatsfrankiee"
                            className='group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:bg-white dark:hover:bg-black hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-blue-500/50 w-full justify-center'
                            target='_blank'
                        >
                            <FaTelegram size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                            <span className="font-semibold tracking-tight">Telegram</span>
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );
}
