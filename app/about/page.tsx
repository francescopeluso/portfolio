import { TransitionLink } from "../components/TransitionLink";
import BlinkingCursor from "../components/BlinkingCursor";
import Typewriter from "../components/TypingEffect";
import ExperienceCard from "../components/ExperienceCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'About me',
};

export default function About() {
    return (
        <div className="bg-white dark:bg-black rounded-t-[36px] mx-auto w-[99%] flex flex-col items-start justify-center min-h-screen mt-4 p-8 pb-20 gap-8 font-[family-name:var(--font-geist-sans)]">
            
            <TransitionLink
                href="/"
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            >&larr; Go back</TransitionLink>
            
            <h2 className="text-3xl font-[family-name:var(--font-geist-mono)]">
                $ <Typewriter text="whoami" /><BlinkingCursor />
            </h2>
            <p>
                Since I was a child, my passion for technology and computer science has guided my path. Currently,
                I am a Computer Engineering Student (L-8) at the Dept. of Information and Electrical Engineering and
                Applied Mathematics (DIEM) of the University of Salerno, where I deepen my theoretical and practical knowledge.
            </p>
            <p>
                In parallel with my studies, I work as a back end developer, specializing in the creation of efficient and 
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

            <h2 className="mt-4 text-3xl font-[family-name:var(--font-geist-mono)]">
                <Typewriter text="ongoing things" /><BlinkingCursor />
            </h2>
            <div className="flex flex-col md:flex-row gap-4 w-full flex-no-wrap overflow-x-auto">
                <ExperienceCard
                    title="B.Sc. in Computer Engineering"
                    location="DIEM @ University of Salerno"
                    startDate="2022"
                    imageSrc="/imgs/unisa.png"
                    description="I am currently attending the third year of the Bachelor's Degree in Computer Engineering ('Software' track) at the University of Salerno. The course of study includes a wide range of subjects, from mathematics to electronics, from computer science to telecommunications."
                />
                <ExperienceCard
                    title="Back-end Developer"
                    location="Considera SRL"
                    startDate="2022"
                    imageSrc="/imgs/considera.png"
                    description="I am part-time back-end developer here at Considera, where I work on the development of web applications and services."
                />
            </div>

        </div>
    );
}
