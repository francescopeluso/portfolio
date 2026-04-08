import { TransitionLink } from "../components/TransitionLink";
import BlinkingCursor from "../components/BlinkingCursor";
import Typewriter from "../components/TypingEffect";
import ContactForm from "../components/ContactForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Contact me',
};

export default function Contacts() {
    return (
        <div className="flex flex-col gap-8 tui-enter">
            <TransitionLink
                href="/"
                className="border border-white px-3 py-1 text-sm self-start hover:bg-white hover:text-black"
            >
                &larr; cd ..
            </TransitionLink>

            <h2 className="text-xl md:text-2xl font-bold">
                $ <Typewriter text="contact me" /><BlinkingCursor />
            </h2>

            <div className="flex flex-col md:flex-row gap-8 w-full">
                <div className="flex flex-col gap-4 md:w-2/3">
                    <p className="text-sm">
                        Fill out the form below and I will reply as soon as possible.
                    </p>
                    <ContactForm />
                </div>
                <div className="flex flex-col gap-4 items-start md:items-center md:w-1/3">
                    <p className="text-sm font-bold">Or connect here:</p>
                    <div className="flex flex-col gap-3 w-full">
                        <Link href="https://github.com/francescopeluso" target="_blank" className="border border-white px-3 py-2 text-sm text-center hover:bg-white hover:text-black">[github]</Link>
                        <Link href="https://linkedin.com/in/francescopeluso04" target="_blank" className="border border-white px-3 py-2 text-sm text-center hover:bg-white hover:text-black">[linkedin]</Link>
                        <Link href="https://t.me/thatsfrankiee" target="_blank" className="border border-white px-3 py-2 text-sm text-center hover:bg-white hover:text-black">[telegram]</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
