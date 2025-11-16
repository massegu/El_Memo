import React from 'react';
import { Avatar, Background } from './types';
import DefaultAvatar from './components/avatars/DefaultAvatar';
import RobotAvatar from './components/avatars/RobotAvatar';
import StarAvatar from './components/avatars/StarAvatar';
import DinoAvatar from './components/avatars/DinoAvatar';

export const avatars: Avatar[] = [
  { id: 'default-avatar', name: 'Usuario', cost: 0, type: 'avatar' },
  { id: 'robot-avatar', name: 'Robot Amigo', cost: 5, type: 'avatar' },
  { id: 'star-avatar', name: 'Estrella Feliz', cost: 10, type: 'avatar' },
  { id: 'dino-avatar', name: 'Dino Curioso', cost: 15, type: 'avatar' },
];

export const backgrounds: Background[] = [
  // FIX: Added missing 'type' property to conform to the Background interface.
  { id: 'default-bg', name: 'Claro', cost: 0, type: 'background', className: 'bg-slate-50' },
  // FIX: Added missing 'type' property to conform to the Background interface.
  { id: 'sunset-bg', name: 'Atardecer', cost: 5, type: 'background', className: 'bg-gradient-to-br from-orange-100 to-teal-100' },
  // FIX: Added missing 'type' property to conform to the Background interface.
  { id: 'sky-bg', name: 'Cielo', cost: 10, type: 'background', className: 'bg-gradient-to-br from-sky-200 to-violet-200' },
  // FIX: Added missing 'type' property to conform to the Background interface.
  { id: 'night-bg', name: 'Noche Estrellada', cost: 15, type: 'background', className: 'bg-gradient-to-br from-gray-700 via-gray-900 to-black' },
];

const avatarComponentMap: Record<string, React.FC<{className?: string}>> = {
    'default-avatar': DefaultAvatar,
    'robot-avatar': RobotAvatar,
    'star-avatar': StarAvatar,
    'dino-avatar': DinoAvatar,
};

export const getAvatarComponent = (id: string): React.FC<{className?: string}> => {
    return avatarComponentMap[id] || DefaultAvatar;
}