import React from "react";

interface StarIconProps {
  fill?: number;
  width?: number;
  height?: number;
  className?: string;
}

export const StarIcon: React.FC<StarIconProps> = ({
  fill = 1,
  width = 16,
  height = 16,
}) => {
  const fillPercent = Math.max(0, Math.min(fill, 1)) * 100;
  const gradientId = React.useId();
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId}>
          <stop offset={`${fillPercent}%`} stopColor="#FFD700" />
          <stop offset={`${fillPercent}%`} stopColor="#E0E0E0" />
        </linearGradient>
      </defs>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 
           5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};
