"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
    children: React.ReactNode;
    href: string;
    className?: string;
}

export const TransitionLink = ({
    children,
    href,
    className,
    ...props
}: TransitionLinkProps) => {
    const router = useRouter();

    const handleTransmission = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const body = document.querySelector('body');
        body?.classList.add("screen-flash");
        setTimeout(() => {
            router.push(href);
            body?.classList.remove("screen-flash");
        }, 100);
    };

    return (
        <Link onClick={handleTransmission} href={href} className={className} {...props}>
            {children}
        </Link>
    );
};
