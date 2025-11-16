import React from 'react';
import { Avatar, Background } from './types';
import DefaultAvatar from './components/avatars/DefaultAvatar';
import RobotAvatar from './components/avatars/RobotAvatar';
import StarAvatar from './components/avatars/StarAvatar';
import DinoAvatar from './components/avatars/DinoAvatar';
import GlitchCatAvatar from './components/avatars/GlitchCatAvatar';
import SpaceDogeAvatar from './components/avatars/SpaceDogeAvatar';


export const avatars: Avatar[] = [
  { id: 'default-avatar', name: 'Usuario', cost: 0, type: 'avatar' },
  { id: 'robot-avatar', name: 'Robot Amigo', cost: 5, type: 'avatar' },
  { id: 'star-avatar', name: 'Estrella Feliz', cost: 10, type: 'avatar' },
  { id: 'dino-avatar', name: 'Dino Curioso', cost: 15, type: 'avatar' },
  { id: 'glitch-cat-avatar', name: 'Gato Glitch', cost: 20, type: 'avatar' },
  { id: 'space-doge-avatar', name: 'Doge Espacial', cost: 25, type: 'avatar' },
];

export const backgrounds: Background[] = [
  { id: 'default-bg', name: 'Oscuro', cost: 0, type: 'background', className: 'bg-slate-900' },
  { id: 'sunset-bg', name: 'Atardecer', cost: 5, type: 'background', className: 'bg-gradient-to-br from-orange-100 to-teal-100' },
  { id: 'sky-bg', name: 'Cielo', cost: 10, type: 'background', className: 'bg-gradient-to-br from-sky-200 to-violet-200' },
  { id: 'night-bg', name: 'Noche Estrellada', cost: 15, type: 'background', className: 'bg-gradient-to-br from-gray-700 via-gray-900 to-black' },
  { id: 'cyberpunk-bg', name: 'Ciudad Ciberpunk', cost: 20, type: 'background', className: 'bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900' },
  { id: 'synthwave-bg', name: 'Synthwave', cost: 25, type: 'background', className: 'bg-gradient-to-b from-fuchsia-900 via-indigo-800 to-slate-900' },
  { id: 'waves-bg', name: 'Olas Relajantes', cost: 30, type: 'background', className: 'waves-bg' },
  { id: 'nebula-bg', name: 'Nebulosa Cósmica', cost: 35, type: 'background', className: 'nebula-bg' },
];

const avatarComponentMap: Record<string, React.FC<{className?: string}>> = {
    'default-avatar': DefaultAvatar,
    'robot-avatar': RobotAvatar,
    'star-avatar': StarAvatar,
    'dino-avatar': DinoAvatar,
    'glitch-cat-avatar': GlitchCatAvatar,
    'space-doge-avatar': SpaceDogeAvatar,
};

export const getAvatarComponent = (id: string): React.FC<{className?: string}> => {
    return avatarComponentMap[id] || DefaultAvatar;
}