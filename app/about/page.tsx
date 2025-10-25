import { TransitionLink } from "../components/TransitionLink";
import BlinkingCursor from "../components/BlinkingCursor";
import Typewriter from "../components/TypingEffect";
import ExperienceCard from "../components/ExperienceCard";
import { Metadata } from "next";
import Link from "next/link";
import { FaFileAlt } from "react-icons/fa";

export const metadata: Metadata = {
    title: 'About me',
};

export default function About() {
    return (
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-t-3xl mx-auto w-[99%] flex flex-col items-start justify-center min-h-screen mt-4 p-6 md:p-8 pb-16 gap-6 font-[family-name:var(--font-geist-sans)] border-t border-x border-gray-200/50 dark:border-gray-800/50 shadow-2xl">

            <TransitionLink
                href="/"
                className="flex items-center gap-2 font-semibold tracking-tight hover:underline hover:underline-offset-4 transition-all duration-300 hover:gap-3"
            >&larr; Go back</TransitionLink>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-[family-name:var(--font-geist-mono)]">
                $ <Typewriter text="whoami" /><BlinkingCursor />
            </h2>
            <div className="flex flex-col gap-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                    Since I was a child, my passion for technology and computer science has guided my path. Currently,
                    I am a M.Sc. Computer Engineering Student (LM-32) at the Dept. of Information and Electrical Engineering and
                    Applied Mathematics (DIEM) of the University of Salerno, where I deepen my theoretical and practical knowledge.
                </p>
                <p>
                    In parallel with my studies, I work as a full stack developer, specializing in the creation of efficient and
                    innovative solutions. I am a supporter of the open source philosophy and I believe, above all, in the
                    importance of well-designed software, easy to use and accessible to everyone.
                </p>
                <p>
                    I am constantly seeking new challenges and opportunities to learn and contribute to projects that have a
                    positive impact on the technology sector. The combination of academic training and practical experience
                    allows me to have a comprehensive and dynamic view of the field, always aiming for continuous improvement
                    and innovation.
                </p>
                <p>
                    I am always looking for new opportunities to collaborate on interesting projects, so feel free to contact me
                    for any information or curiosity.
                </p>
            </div>

            <Link
                href="https://drive.google.com/file/d/1Z8OG1Du7OYnhpZW9pyCHdMU8PPHt17kM/view?usp=sharing"
                target="_blank"
                className="group flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:bg-white dark:hover:bg-black hover:shadow-lg hover:scale-105 transition-all duration-300 self-start"
            >
                <FaFileAlt size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm md:text-base font-semibold tracking-tight">View My Resume</span>
            </Link>

            <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight font-[family-name:var(--font-geist-mono)]">
                <Typewriter text="ongoing things" /><BlinkingCursor />
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
                <ExperienceCard
                    title="M.Sc. in Computer Engineering"
                    location="DIEM @ University of Salerno"
                    startDate="Sep 2025"
                    imageSrc="/imgs/unisa.png"
                    description="Starting my Master's Degree in Computer Engineering ('Artificial Intelligence and Intelligent Robotics' track) at the University of Salerno, where I will deepen my knowledge in advanced topics and specialized areas of computer engineering."
                />
                <ExperienceCard
                    title="B.Sc. in Computer Engineering"
                    location="DIEM @ University of Salerno"
                    startDate="Sep 2022"
                    endDate="Sep 2025"
                    imageSrc="/imgs/unisa.png"
                    description="I got my Bachelor's Degree in Computer Engineering ('Software' track) at the University of Salerno. The course of study includes a wide range of subjects, from mathematics to electronics, from computer science to telecommunications."
                />
                <ExperienceCard
                    title="Full-stack Developer"
                    location="Considera SRL"
                    startDate="2022"
                    imageSrc="/imgs/considera.png"
                    description="I am part-time full stack developer here at Considera, where I work on the development of web applications and services."
                />
            </div>

        </div>
    );
}
