import React from 'react';
import { IconType } from 'react-icons';

interface SocialLinkProps {
    to: string;
    icon: IconType;
    name: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ to, icon: Icon, name }) => {
    return (
        <a href={to} className="navbar-social-link">
            <Icon/>
        </a>
    );
};

export default SocialLink;