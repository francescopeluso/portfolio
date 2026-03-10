"use client";

import { useState, useEffect } from 'react';

export default function BlockCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [visible, setVisible] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const touch = window.matchMedia('(hover: none)').matches;
        if (touch) {
            setIsTouch(true);
            return;
        }

        const move = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
            setVisible(true);
        };
        const leave = () => setVisible(false);
        const enter = () => setVisible(true);

        window.addEventListener('mousemove', move);
        document.addEventListener('mouseleave', leave);
        document.addEventListener('mouseenter', enter);
        return () => {
            window.removeEventListener('mousemove', move);
            document.removeEventListener('mouseleave', leave);
            document.removeEventListener('mouseenter', enter);
        };
    }, []);

    if (isTouch || !visible) return null;

    return (
        <div
            className="fixed pointer-events-none z-[9999] mix-blend-difference bg-white"
            style={{
                left: pos.x,
                top: pos.y,
                width: 12,
                height: 20,
                transform: 'translate(-2px, -2px)',
            }}
        />
    );
}
