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
        <div className="flex flex-col md:flex-row gap-4 w-full bg-[var(--background)] rounded-xl md:h-[280px]">
            <div className='w-full md:w-1/3 bg-black md:h-full rounded-t-xl md:rounded-tr-[0] md:rounded-bl-xl flex items-center justify-center overflow-hidden'>
                <Image src={imageUrl} alt={`${name} image`} width={0} height={0} sizes='100vw' style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            </div>
            <div className='w-full md:w-2/3 p-4 pt-0 md:pt-4 flex flex-col'>
                <h3 className="text-2xl text-wrap font-bold self-top font-bold font-[family-name:var(--font-geist-mono)]">{name}</h3>
                <p className="text-sm mt-2 h-full text-gray-700 dark:text-gray-300 w-[85%]">{description}</p>
                <div className="flex flex-row gap-4 mt-4 justify-self-end">
                    {gitUrl && ( <Link href={gitUrl} className='flex items-center gap-2' target='_blank'><FaGithub /><span>GitHub</span></Link> )}
                    {demoUrl && ( <Link href={demoUrl} className='flex items-center gap-2' target='_blank'><FaExternalLinkAlt /><span>Demo</span></Link> )}
                    {reportUrl && ( <Link href={reportUrl} className='flex items-center gap-2' target='_blank'><FaFileAlt /><span>Report</span></Link> )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;