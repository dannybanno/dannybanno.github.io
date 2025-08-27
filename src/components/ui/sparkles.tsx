import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

export const Sparkles = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; color: string; size: number; style: any }>>([]);

  useEffect(() => {
    const generateSparkle = () => {
      const colors = ["#FFD700", "#FFA500", "#FF69B4", "#00CED1"];
      return {
        id: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        style: {
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          zIndex: 2,
        },
      };
    };

    const interval = setInterval(() => {
      const sparkle = generateSparkle();
      setSparkles((prev) => [...prev, sparkle]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
      }, 1000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none animate-sparkle"
          style={{
            ...sparkle.style,
            width: sparkle.size,
            height: sparkle.size,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="absolute animate-ping"
            style={{
              color: sparkle.color,
              width: sparkle.size,
              height: sparkle.size,
            }}
          >
            <path
              d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
};