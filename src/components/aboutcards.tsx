import React from 'react';

// import styles
import '../styles/App.css';
import '../styles/Sections.css';

interface AboutCardProps {
    bgIcon: string;
    iconPosition: string;
    iconSize?: string;
    iconOpacity?: number;
    text: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ bgIcon, iconPosition, iconSize="40%", iconOpacity=0.28, text }) => {

    // background icon must be transparent, everything else is opaque as it is now

    const bgIconStyle: React.CSSProperties = {
        background: `url(${bgIcon}) no-repeat`,
        backgroundSize: iconSize,
        backgroundPosition: iconPosition,
        filter: 'saturate(0%)',
        opacity: iconOpacity,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    };

    const cardStyle: React.CSSProperties = {
        position: 'relative',
    };

    return (
        <div className='card' style={cardStyle}>
            <div className='bg-icon' style={bgIconStyle}></div>
            <p style={{zIndex: 5}}>{text}</p>
        </div>
    );
};

export default AboutCard;