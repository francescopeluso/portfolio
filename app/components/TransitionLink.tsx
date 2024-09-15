"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
    children: React.ReactNode;
    href: string;
    className?: string;
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({
    children,
    href,
    className,
    ...props
}: TransitionLinkProps) => {
    
    const router = useRouter();

    const handleTransmission = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        const body = document.querySelector('body');
        body?.classList.add("page-transition");
        await sleep(320);
        router.push(href);
        await sleep(320);
        body?.classList.remove("page-transition");

    }

    return (
        <Link
            onClick={handleTransmission}
            href={href}
            className={className}
            {...props}
        >
            {children}
        </Link>
    );
}