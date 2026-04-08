import { TransitionLink } from "../components/TransitionLink";
import BlinkingCursor from "../components/BlinkingCursor";
import Typewriter from "../components/TypingEffect";
import ExperienceCard from "../components/ExperienceCard";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'About me',
};

export default function About() {
    return (
        <div className="flex flex-col gap-8 tui-enter">
            <TransitionLink
                href="/"
                className="border border-white px-3 py-1 text-sm self-start hover:bg-white hover:text-black"
            >
                &larr; cd ..
            </TransitionLink>

            <h2 className="text-xl md:text-2xl font-bold">
                $ <Typewriter text="whoami" /><BlinkingCursor />
            </h2>

            <div className="flex flex-col gap-4 text-sm leading-relaxed">
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
                className="border border-white px-3 py-1 text-sm self-start hover:bg-white hover:text-black"
            >
                [view resume]
            </Link>

            <h2 className="text-xl md:text-2xl font-bold">
                $ <Typewriter text="cat education.log" /><BlinkingCursor />
            </h2>

            <div className="flex flex-col gap-4 w-full">
                <ExperienceCard
                    title="M.Sc. in Computer Engineering"
                    location="DIEM @ University of Salerno"
                    startDate="Sep 2025"
                    description="Currently pursuing a Master's Degree in Computer Engineering ('Artificial Intelligence and Intelligent Robotics' track) at the University of Salerno, where I will deepen my knowledge in advanced topics and specialized areas of computer engineering."
                />
                <ExperienceCard
                    title="B.Sc. in Computer Engineering"
                    location="DIEM @ University of Salerno"
                    startDate="Sep 2022"
                    endDate="Sep 2025"
                    description="I got my Bachelor's Degree in Computer Engineering ('Software' track) at the University of Salerno. The course of study includes a wide range of subjects, from mathematics to electronics, from computer science to telecommunications."
                />
            </div>

            <h2 className="text-xl md:text-2xl font-bold">
                $ <Typewriter text="cat experience.log" /><BlinkingCursor />
            </h2>

            <div className="flex flex-col gap-4 w-full">
                <ExperienceCard
                    title="Full-stack Developer"
                    location="Considera SRL"
                    startDate="Jul 2022"
                    description="I am part-time full stack developer here at Considera, where I work on the development of web applications and services."
                />
            </div>
        </div>
    );
}
