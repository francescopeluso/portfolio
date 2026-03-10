import React from 'react';

interface ExperienceCardProps {
    title: string;
    location: string;
    startDate: string;
    endDate?: string;
    description: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
    title,
    location,
    startDate,
    endDate,
    description
}) => {
    return (
        <div className="border border-white p-5 flex flex-col gap-2">
            <h3 className="text-base font-bold">{title}</h3>
            <p className="text-sm">{location}</p>
            <p className="text-xs">{startDate} — {endDate ?? 'present'}</p>
            <p className="text-sm mt-1 leading-relaxed">{description}</p>
        </div>
    );
}

export default ExperienceCard;
