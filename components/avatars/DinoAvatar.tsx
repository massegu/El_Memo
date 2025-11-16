import React from 'react';

const DinoAvatar: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}>
        <path d="M19 13.5c0-1.62-.38-3.15-.99-4.5H14v-3c0-.55-.45-1-1-1s-1 .45-1 1v3H8.99c-.61 1.35-.99 2.88-.99 4.5 0 1.99.63 3.82 1.62 5.24.43.62 1.35.79 2 .36.65-.43.82-1.35.39-2C11.39 16.21 11 14.9 11 13.5c0-1.13.29-2.18.78-3.09.43.23.9.39 1.42.39.52 0 .99-.16 1.42-.39.49.91.78 1.96.78 3.09 0 1.4-.39 2.71-1.01 3.74-.43.65-.26 1.57.39 2 .27.18.57.26.86.26.4 0 .79-.15 1.1-.45.99-1.42 1.62-3.25 1.62-5.25z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
);

export default DinoAvatar;
