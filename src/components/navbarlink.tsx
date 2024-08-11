import React from 'react';

interface NavbarLinkProps {
    to: string;
    label: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ to, label }) => {
    return (
        <a href={to} className="navbar-link">
            {label}
        </a>
    );
};

export default NavbarLink;