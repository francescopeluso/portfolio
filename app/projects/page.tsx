import { TransitionLink } from "../components/TransitionLink";
import BlinkingCursor from "../components/BlinkingCursor";
import Typewriter from "../components/TypingEffect";
import ProjectCard from "../components/ProjectCard";
import GitHubCalendar from "react-github-calendar";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Projects',
};

export default function Projects() {
    return (
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-t-3xl mx-auto w-[99%] flex flex-col items-start justify-center min-h-screen mt-4 p-6 md:p-8 pb-16 gap-6 font-[family-name:var(--font-geist-sans)] border-t border-x border-gray-200/50 dark:border-gray-800/50 shadow-2xl">

            <TransitionLink
                href="/"
                className="flex items-center gap-2 font-semibold tracking-tight hover:underline hover:underline-offset-4 transition-all duration-300 hover:gap-3"
            >&larr; Go back</TransitionLink>

            <div className="flex flex-col lg:flex-row gap-6 w-full justify-between items-start">
                <div className="flex flex-col gap-3">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-[family-name:var(--font-geist-mono)]">
                        <Typewriter text="projects I made or contributed to" /><BlinkingCursor />
                    </h2>
                    <div className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                        Visit my <Link className="font-bold underline hover:text-[#4a90e2] transition-colors" href="https://github.com/francescopeluso">GitHub profile</Link> to see all the projects I have worked on.<br />
                        <em className="text-xs md:text-sm">Note that the contribution graph shows private repo contributions as well.</em>
                    </div>
                </div>

                <div className="lg:ml-auto">
                    <GitHubCalendar username="francescopeluso" />
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
                <ProjectCard
                    name="Readit"
                    description="Team project for Mobile Programming course - a multi-platform mobile application to manage a personal library of books, with features such as book search, reading progress tracking, and book recommendations. Built with React Native, Expo, SQLite."
                    gitUrl="https://github.com/francescopeluso/MobProg-Project"
                    reportUrl="https://github.com/francescopeluso/MobProg-Project/blob/main/_docs/RELAZIONE%20GRUPPO%2010.pdf"
                    demoUrl="https://github.com/francescopeluso/MobProg-Project/blob/main/_docs/PRESENTAZIONE%20GRUPPO%2010.pdf"
                    imageUrl="/imgs/mobprog.jpg"
                />
                <ProjectCard
                    name="BetterRoute @ SVST Hackathon Verbania 2025"
                    description="Prototype made in less than 24 hours for the Silicon Valley Study Tour Hackathon 2025 in Verbania, Italy. Our project aims to help SMEs (small and medium-sized enterprises) to optimize their delivery routes, reducing costs and environmental impact."
                    gitUrl=""
                    demoUrl="https://betterroute-phi.vercel.app/"
                    reportUrl="https://drive.google.com/file/d/1RpDgwJ6809lGasCJoe0Ip0FOhMx6oFpQ/view?usp=sharing"
                    imageUrl="/imgs/svsthack2025.jpeg"
                />
                <ProjectCard
                    name="IOCommerce"
                    description="Project made with my high school 'Multiskills' team for the EU Codeweek Hackathon 2021 - an e-commerce platform for zero-km products. Built from scratch with HTML, JS, CSS as front-end technologies and PHP, MySQL as back-end technologies. The project won the first place in the Italian selection and the third place in the European selection."
                    gitUrl=""
                    demoUrl="https://iocommerce.didamatteifortunato.it/"
                    reportUrl=""
                    imageUrl="/imgs/iocommerce.jpg"
                />
                <ProjectCard
                    name="MatteiFortunatoBot"
                    description="A Telegram bot, built with Python and running on a Raspberry Pi 4, which automatically retrieves latest notices published by the school secretary, sending a notification to registered users (no longer active)."
                    gitUrl=""
                    demoUrl="https://telegram.didamatteifortunato.it/"
                    reportUrl="https://telegram.didamatteifortunato.it/docs/11062021_MatteiFortunatoDocs-RelazioneTecnica.pdf"
                    imageUrl="/imgs/telegram-bot.jpg"
                />
                <ProjectCard
                    name="This portfolio"
                    description="My personal portfolio built with Next.js, Tailwind CSS and TypeScript. As you can see, it is a simple and clean website that I use to present myself and showcase my projects, experiences and skills."
                    gitUrl="https://github.com/francescopeluso/portfolio"
                    demoUrl="/"
                    reportUrl=""
                    imageUrl="/imgs/portfolio.jpg"
                />
            </div>                   

        </div>
    );
}
