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
        <div className="flex flex-col gap-8 animate-fade-in">
            <TransitionLink
                href="/"
                className="border border-white px-3 py-1 text-sm self-start hover:bg-white hover:text-black transition-all duration-150"
            >
                &larr; cd ..
            </TransitionLink>

            <div className="flex flex-col gap-6 w-full justify-between items-start min-w-0">
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl md:text-2xl font-bold">
                        $ <Typewriter text="ls ~/projects" /><BlinkingCursor />
                    </h2>
                    <p className="text-sm">
                        Visit my{' '}
                        <Link
                            className="underline hover:bg-white hover:text-black transition-all duration-150 px-1"
                            href="https://github.com/francescopeluso"
                            target="_blank"
                        >
                            GitHub profile
                        </Link>{' '}
                        to see all projects.
                    </p>
                </div>

                <div className="overflow-x-auto max-w-full">
                    <GitHubCalendar
                        username="francescopeluso"
                        colorScheme="dark"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
                <ProjectCard
                    name="Readit"
                    description="Team project for Mobile Programming course - a multi-platform mobile application to manage a personal library of books. Built with React Native, Expo, SQLite."
                    gitUrl="https://github.com/francescopeluso/MobProg-Project"
                    reportUrl="https://github.com/francescopeluso/MobProg-Project/blob/main/_docs/RELAZIONE%20GRUPPO%2010.pdf"
                    demoUrl="https://github.com/francescopeluso/MobProg-Project/blob/main/_docs/PRESENTAZIONE%20GRUPPO%2010.pdf"
                />
                <ProjectCard
                    name="BetterRoute @ SVST Hackathon 2025"
                    description="Prototype made in less than 24 hours for the Silicon Valley Study Tour Hackathon 2025. Helps SMEs optimize delivery routes, reducing costs and environmental impact."
                    demoUrl="https://betterroute-phi.vercel.app/"
                    reportUrl="https://drive.google.com/file/d/1RpDgwJ6809lGasCJoe0Ip0FOhMx6oFpQ/view?usp=sharing"
                />
                <ProjectCard
                    name="IOCommerce"
                    description="E-commerce platform for zero-km products. Built with HTML, JS, CSS, PHP, MySQL. Won first place in the Italian selection and third place in the European selection of the EU Codeweek Hackathon 2021."
                    demoUrl="https://iocommerce.didamatteifortunato.it/"
                />
                <ProjectCard
                    name="MatteiFortunatoBot"
                    description="Telegram bot built with Python on a Raspberry Pi 4, automatically retrieves school notices and notifies registered users (no longer active)."
                    demoUrl="https://telegram.didamatteifortunato.it/"
                    reportUrl="https://telegram.didamatteifortunato.it/docs/11062021_MatteiFortunatoDocs-RelazioneTecnica.pdf"
                />
                <ProjectCard
                    name="This portfolio"
                    description="My personal portfolio built with Next.js, Tailwind CSS and TypeScript."
                    gitUrl="https://github.com/francescopeluso/portfolio"
                    demoUrl="/"
                />
            </div>
        </div>
    );
}
