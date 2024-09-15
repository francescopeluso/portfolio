import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaReddit } from "react-icons/fa";
import { TransitionLink } from './components/TransitionLink';

export default function Home() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 font-[family-name:var(--font-geist-sans)]">
            
            <main>
                <div className="shadow-xl bg-white dark:bg-black rounded-xl flex flex-row flex-col md:flex-row justify-center items-center p-5 gap-5">
                    <Image
                        className="object-cover rounded-full"
                        src="/imgs/propic.jpg"
                        alt="My profile picture"
                        width={256}
                        height={256}
                        priority
                    />
                    <div>
                        <h1 className="md:text-4xl font-bold text-center md:text-start">Hello <span className='animation-wave'>👋🏻</span>,</h1>
                        <p className="text-center text-2xl md:text-5xl font-bold text-center md:text-start">I'm&nbsp;
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4a90e2] to-[#9013fe]">
                                Francesco Peluso
                            </span>
                        </p>
                        <p className="text-center text-xs md:text-xl mt-5 font-bold text-center md:text-start text-gray-500 dark:text-gray-300">Computer Engineering student &<br /> Back-end developer</p>
                    </div>
                </div>
            </main>

            <nav className="flex flex-col md:flex-row gap-2 md:gap-8 text-center">
                <TransitionLink
                    href="/about"
                    className='hover:underline hover:underline-offset-4 font-black'
                >About</TransitionLink>
                <TransitionLink
                    href="/projects"
                    className='hover:underline hover:underline-offset-4 font-black'
                >Projects</TransitionLink>
                <TransitionLink
                    href="/contacts"
                    className='hover:underline hover:underline-offset-4 font-black'
                >Contacts</TransitionLink>
            </nav>

            <div className='flex gap-4 items-center flex-row'>
                <Link 
                    href="https://github.com/francescopeluso"
                    className='flex items-center gap-2 hover:underline hover:underline-offset-4'
                    target='_blank'
                ><FaGithub size={24} /> <span>GitHub</span></Link>
                <Link
                    href="https://linkedin.com/in/francescopeluso04"
                    className='flex items-center gap-2 hover:underline hover:underline-offset-4'
                    target='_blank'
                ><FaLinkedin size={24} /> <span>LinkedIn</span></Link>
                <Link
                    href="https://reddit.com/u/ThatsFrankie"
                    className='flex items-center gap-2 hover:underline hover:underline-offset-4'
                    target='_blank'
                ><FaReddit size={24} /> <span>Reddit</span></Link>
            </div>

        </div>
    )
}