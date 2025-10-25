import React from 'react';
import { FaExternalLinkAlt, FaFileAlt, FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
    name: string;
    description: string;
    gitUrl?: string;
    demoUrl?: string;
    reportUrl?: string;
    imageUrl?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, gitUrl, demoUrl, reportUrl, imageUrl }) => {

    if (!imageUrl) {
        imageUrl = '/images/placeholder.jpg';
    }

    return (
        <div className="group flex flex-col md:flex-row gap-4 w-full bg-white/60 dark:bg-black/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl md:h-[280px] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
            <div className='w-full md:w-1/3 bg-black md:h-full rounded-t-2xl md:rounded-tr-[0] md:rounded-bl-2xl flex items-center justify-center overflow-hidden'>
                <Image src={imageUrl} alt={`${name} image`} width={0} height={0} sizes='100vw' style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            </div>
            <div className='w-full md:w-2/3 p-4 pt-0 md:pt-4 flex flex-col'>
                <h3 className="text-xl md:text-2xl text-wrap font-bold tracking-tight font-[family-name:var(--font-geist-mono)]">{name}</h3>
                <p className="text-sm mt-2 h-full text-gray-700 dark:text-gray-300 leading-relaxed w-[85%]">{description}</p>
                <div className="flex flex-row gap-4 mt-4 justify-self-end flex-wrap">
                    {gitUrl && (
                        <Link href={gitUrl} className='group/link flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-200/50 dark:border-gray-800/50 hover:bg-white dark:hover:bg-black hover:shadow-md transition-all duration-300 text-sm font-semibold tracking-tight' target='_blank'>
                            <FaGithub className="group-hover/link:rotate-12 transition-transform duration-300" />
                            <span>GitHub</span>
                        </Link>
                    )}
                    {demoUrl && (
                        <Link href={demoUrl} className='group/link flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-200/50 dark:border-gray-800/50 hover:bg-white dark:hover:bg-black hover:shadow-md transition-all duration-300 text-sm font-semibold tracking-tight' target='_blank'>
                            <FaExternalLinkAlt className="group-hover/link:rotate-12 transition-transform duration-300" />
                            <span>Demo</span>
                        </Link>
                    )}
                    {reportUrl && (
                        <Link href={reportUrl} className='group/link flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-200/50 dark:border-gray-800/50 hover:bg-white dark:hover:bg-black hover:shadow-md transition-all duration-300 text-sm font-semibold tracking-tight' target='_blank'>
                            <FaFileAlt className="group-hover/link:rotate-12 transition-transform duration-300" />
                            <span>Report</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;