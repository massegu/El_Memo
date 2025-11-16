import React from 'react';

const GlitchCatAvatar: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={className} 
    shapeRendering="crispEdges">
    <g fill="none" strokeWidth="1.5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z M9 14.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-3-4c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-1z" fill="#f0f" transform="translate(-1, 0)" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z M9 14.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-3-4c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-1z" fill="#0ff" transform="translate(1, 0)" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z M9 14.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-3-4c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-1z" fill="currentColor" />
    </g>
  </svg>
);

export default GlitchCatAvatar;
