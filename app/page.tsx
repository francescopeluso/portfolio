import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaReddit, FaFileAlt } from "react-icons/fa";
import { TransitionLink } from './components/TransitionLink';

export default function Home() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 pb-16 gap-6 font-[family-name:var(--font-geist-sans)]">
            <main className="w-full max-w-4xl animate-fade-in">
                <div className="group relative shadow-2xl bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-2xl flex flex-col md:flex-row justify-center items-center p-6 md:p-8 gap-6 border border-gray-200/50 dark:border-gray-800/50 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)] transition-all duration-500 hover:scale-[1.01]">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="relative">
                        <div className="relative group/img">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#4a90e2] via-[#9013fe] to-[#ff006e] rounded-full blur opacity-25 group-hover/img:opacity-75 transition duration-1000 group-hover/img:duration-200 animate-pulse-slow"></div>
                            <Image
                                className="relative object-cover rounded-full ring-2 ring-white/50 dark:ring-black/50 transition-transform duration-500 group-hover/img:scale-105"
                                src="https://avatars.githubusercontent.com/u/59664699?v=4"
                                alt="My profile picture"
                                width={180}
                                height={180}
                                priority
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 md:gap-3 relative z-10">
                        <h1 className="text-2xl md:text-4xl font-bold text-center md:text-start animate-slide-up tracking-tight">
                            Hey there <span className='inline-block animate-wave'>👋</span>
                        </h1>
                        <p className="text-center text-2xl md:text-5xl font-black md:text-start leading-tight tracking-tighter animate-slide-up-delay-1">
                            I'm&nbsp;
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4a90e2] via-[#9013fe] to-[#ff006e] animate-gradient-shift bg-[length:200%_auto]">
                                Francesco Peluso
                            </span>
                        </p>
                        <div className="h-0.5 w-20 bg-gradient-to-r from-[#4a90e2] to-[#9013fe] rounded-full mx-auto md:mx-0 animate-slide-up-delay-2"></div>
                        <p className="text-center text-sm md:text-lg mt-1 font-medium md:text-start text-gray-600 dark:text-gray-400 animate-slide-up-delay-3 font-[family-name:var(--font-geist-mono)] tracking-tight">
                            Computer Engineering Student<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-500">Full Stack Developer</span>
                        </p>
                    </div>
                </div>
            </main>

            <div className="animate-fade-in-delay flex flex-col md:flex-row gap-3 items-center">
                <nav className="flex flex-row gap-1 md:gap-3 text-center bg-white/80 dark:bg-black/80 backdrop-blur-xl py-2 px-4 md:py-2.5 md:px-6 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 hover:shadow-2xl transition-all duration-300">
                    <TransitionLink
                        href="/about"
                        className='relative px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-bold tracking-tight transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:scale-105 group'
                    >
                        <span className="relative z-10">About</span>
                        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#4a90e2] to-[#9013fe] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                    </TransitionLink>
                    <div className='hidden md:block w-px h-5 self-center bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600'></div>
                    <TransitionLink
                        href="/projects"
                        className='relative px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-bold tracking-tight transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:scale-105 group'
                    >
                        <span className="relative z-10">Projects</span>
                        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#9013fe] to-[#ff006e] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                    </TransitionLink>
                    <div className='hidden md:block w-px h-5 self-center bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600'></div>
                    <TransitionLink
                        href="/contacts"
                        className='relative px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-bold tracking-tight transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-red-500/10 hover:scale-105 group'
                    >
                        <span className="relative z-10">Contacts</span>
                        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#ff006e] to-[#ff4d6d] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                    </TransitionLink>
                </nav>

            </div>

            <div className='flex gap-3 items-center flex-col md:flex-row animate-fade-in-delay-2'>
                <p className='text-xs md:text-sm font-bold tracking-tight text-gray-600 dark:text-gray-400 uppercase'>Let's connect: </p>
                <div className='flex gap-2'>
                    <Link
                        href="https://drive.google.com/file/d/1Z8OG1Du7OYnhpZW9pyCHdMU8PPHt17kM/view?usp=sharing"
                        target="_blank"
                        className="group flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:bg-white dark:hover:bg-black hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                        <FaFileAlt size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-sm md:text-base font-semibold tracking-tight">Resume</span>
                    </Link>
                    <Link
                        href="https://github.com/francescopeluso"
                        className='group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:bg-white dark:hover:bg-black hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700'
                        target='_blank'
                    >
                        <FaGithub size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span className="hidden md:inline text-sm font-semibold tracking-tight">GitHub</span>
                    </Link>
                    <Link
                        href="https://linkedin.com/in/francescopeluso04"
                        className='group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:bg-white dark:hover:bg-black hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-blue-400/50'
                        target='_blank'
                    >
                        <FaLinkedin size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span className="hidden md:inline text-sm font-semibold tracking-tight">LinkedIn</span>
                    </Link>
                    <Link
                        href="https://reddit.com/u/ThatsFrankie"
                        className='group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:bg-white dark:hover:bg-black hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-orange-400/50'
                        target='_blank'
                    >
                        <FaReddit size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span className="hidden md:inline text-sm font-semibold tracking-tight">Reddit</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}