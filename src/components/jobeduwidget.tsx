import React from 'react';

// import styles
import '../styles/App.css';
import '../styles/JobEduWidget.css';

interface JobEduWidgetProps {
    type: string;
    place: string;
    start: string;
    end?: string;
    description: string;
    color?: string;
    icon?: string;
}

const JobEduWidget: React.FC<JobEduWidgetProps> = ({ type, place, start, end, description, color, icon }) => {

    return (
        <div className='job-edu-widget'>
            <div className='widget-header'>
                <p>{place}</p>
                <img src={icon} alt="icon" />
            </div>
            
            <p className='widget-period'>{start} - {end ?? 'Present'}</p>
            <p className='widget-description'>{description}</p>
        </div>
    );
};

export default JobEduWidget;