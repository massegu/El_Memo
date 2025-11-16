import React from 'react';

const RobotAvatar: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <circle cx="8.5" cy="11.5" r="1.5"/>
    <circle cx="15.5" cy="11.5" r="1.5"/>
    <path d="M7.76 16.24c.48.48 1.13.76 1.84.76s1.36-.28 1.84-.76c.48-.48.76-1.13.76-1.84h-5.2c0 .71.28 1.36.76 1.84z" transform="translate(1, 1)"/>
  </svg>
);

export default RobotAvatar;
