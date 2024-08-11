import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
    text: string;
    delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 175 }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLSpanElement>(null);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
            const timeout = setTimeout(() => {
                if (currentIndex < text.length) {
                    setCurrentText((prevText) => prevText + text[currentIndex]);
                    setCurrentIndex((prevIndex) => prevIndex + 1);
                }
            }, delay);

            return () => clearTimeout(timeout);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection);

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [currentIndex, delay, text]);

    return <span ref={containerRef}>{currentText}</span>;
};

export default Typewriter;