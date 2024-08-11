import React, { memo } from 'react';

// import styles
import '../styles/App.css';
import '../styles/Sections.css';

// import assets
import unisaLogo from '../images/unisa.png';
import consideraLogo from '../images/considera.png';
import memoji from '../images/memoji.png';

// import components
import AboutCard from './aboutcards';
import Typewriter from './typewriter';
import BlinkingCursor from './blinkingcursor';

const AboutMe = () => {
    return (
        <div id='aboutme'>
            <h2>$ <Typewriter text={"whoami"} /><BlinkingCursor /></h2>
            <AboutCard
                bgIcon={unisaLogo}
                iconPosition={"top left"}
                iconOpacity={0.2}
                text={"Since I was a child, my passion for technology and computer science has guided my path. Currently, I am a Computer Engineering Student (L-8) at the Dept. of Information and Electrical Engineering and Applied Mathematics (DIEM) of the University of Salerno, where I deepen my theoretical and practical knowledge."}
                />
            <AboutCard
                bgIcon={consideraLogo}
                iconSize='25%'
                iconPosition={"bottom right"}
                text={"In parallel with my studies, I work as a back end developer, specializing in the creation of efficient and innovative solutions. I am a supporter of the open source philosophy and I believe, above all, in the importance of well-designed software, easy to use and accessible to everyone."}
                />
            <AboutCard
                bgIcon={memoji}
                iconPosition={"center center"}
                text={"I am always looking for new challenges and  opportunities to learn and contribute to projects that have a positive impact on the field of technology. The combination of academic training and practical experience allows me to have a complete and dynamic vision of the sector, always with the aim of improving and innovating."}
                />
        </div>
    );
};

export default AboutMe;