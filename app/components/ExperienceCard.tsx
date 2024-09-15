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
        <div className="flex-shrink-0 bg-[var(--background)] rounded-xl md:w-[720px] md:h-[240px] flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
            <div 
                className="w-full md:w-2/8 bg-black h-full rounded-t-xl md:rounded-tr-[0] md:rounded-bl-xl flex items-center justify-center p-2"
                style={{
                    backgroundImage: `url(/imgs/placeholder.jpg)`,
                    backgroundSize: 'cover',
                }}
            >
                <Image src={imageSrc} alt={location} width={192} height={192} />
            </div>
            <div className="w-full md:w-6/8 p-4 pt-0 md:pt-4">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm text-gray-500">{location}</p>
                <p className="text-sm text-gray-500">{startDate} - {endDate ?? 'present'}</p>
                <p className="text-sm mt-4">{description}</p>
            </div>
        </div>
    );
}

export default ExperienceCard;