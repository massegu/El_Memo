import React from 'react';
import { ChatMessage, MessageRole } from '../types';
import BotIcon from './icons/BotIcon';
import DefaultAvatar from './avatars/DefaultAvatar';

interface ChatMessageProps {
  message: ChatMessage;
  avatarComponent?: React.FC<{ className?: string }>;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message, avatarComponent: AvatarComponent = DefaultAvatar }) => {
  const isUser = message.role === MessageRole.USER;
  const messageText = message.text.replace('[STAR_AWARDED]', '').trim();

  // Don't render empty messages
  if (!messageText) return null;

  return (
    <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
          <BotIcon className="w-5 h-5" />
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl shadow-sm transition-all duration-300 ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'
        }`}
      >
        <p className="whitespace-pre-wrap">{messageText}</p>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center overflow-hidden">
          <AvatarComponent className="w-full h-full text-slate-600" />
        </div>
      )}
    </div>
  );
};

export default ChatMessageComponent;