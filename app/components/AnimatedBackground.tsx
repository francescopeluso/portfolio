"use client";

import { useState, useEffect } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInViewport, setIsMouseInViewport] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      setIsMouseInViewport(true);
    };

    const handleMouseLeave = () => {
      setIsMouseInViewport(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <div className="fixed min-h-screen w-full inset-0 overflow-hidden">
        <div
          className="fixed w-[500px] h-[500px] rounded-full blur-[100px]
            bg-[#8e16fd]/20 animate-pulse
            top-[20%] left-[70%]
            motion-safe:animate-[spin_15s_linear_infinite]"
        />
        <div
          className="fixed w-[600px] h-[600px] rounded-full blur-[120px]
            bg-[#e40074]/20 animate-pulse
            top-[40%] right-[80%]
            motion-safe:animate-[spin_20s_linear_infinite]"
        />
        <div
          className="fixed w-[400px] h-[400px] rounded-full blur-[90px]
            bg-[#8e16fd]/10 animate-pulse
            bottom-[20%] left-[30%]
            motion-safe:animate-[bounce_18s_linear_infinite]"
        />
      </div>
      <div
        className={`pointer-events-none fixed inset-0 blur-[100px] transition-all duration-300 ${
          isMouseInViewport ? 'opacity-60' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, #4b8de3, transparent 40%)`
        }}
      />
    </div>
  );
};

export default AnimatedBackground;