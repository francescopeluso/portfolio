"use server";

import React from 'react';
import Image from 'next/image';

interface ExperienceCardProps {
    title: string;
    location: string;
    startDate: string;
    endDate?: string;
    imageSrc: string;
    description: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
    title,
    location,
    startDate,
    endDate,
    imageSrc,
    description
}: ExperienceCardProps) => {
    return (
        <div className="group bg-white/60 dark:bg-black/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl w-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
            <div
                className="w-full h-32 bg-black flex items-center justify-center p-4"
                style={{
                    backgroundImage: `url(/imgs/placeholder.jpg)`,
                    backgroundSize: 'cover',
                }}
            >
                <Image src={imageSrc} alt={location} width={96} height={96} />
            </div>
            <div className="p-6 flex flex-col gap-2 flex-grow">
                <h3 className="text-lg font-bold tracking-tight">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{location}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 font-[family-name:var(--font-geist-mono)]">{startDate} - {endDate ?? 'present'}</p>
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

export default ExperienceCard;