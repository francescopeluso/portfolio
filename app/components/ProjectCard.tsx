import React from 'react';
import Link from 'next/link';

interface ProjectCardProps {
    name: string;
    description: string;
    gitUrl?: string;
    demoUrl?: string;
    reportUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, gitUrl, demoUrl, reportUrl }) => {
    return (
        <div className="border border-white p-5 flex flex-col gap-3">
            <h3 className="text-base font-bold">{name}</h3>
            <p className="text-sm leading-relaxed">{description}</p>
            <div className="flex flex-wrap gap-3 mt-1">
                {gitUrl && (
                    <Link href={gitUrl} target="_blank" className="border border-white px-2 py-0.5 text-xs hover:bg-white hover:text-black transition-all duration-150">[github]</Link>
                )}
                {demoUrl && (
                    <Link href={demoUrl} target="_blank" className="border border-white px-2 py-0.5 text-xs hover:bg-white hover:text-black transition-all duration-150">[demo]</Link>
                )}
                {reportUrl && (
                    <Link href={reportUrl} target="_blank" className="border border-white px-2 py-0.5 text-xs hover:bg-white hover:text-black transition-all duration-150">[report]</Link>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
