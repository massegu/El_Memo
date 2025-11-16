import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Chat } from '@google/genai';
import { createChatSession } from './services/geminiService';
import { ChatMessage, MessageRole } from './types';
import ChatInput from './components/ChatInput';
import ChatMessageComponent from './components/ChatMessage';
import RewardPanel from './components/RewardPanel';
import StarIcon from './components/icons/StarIcon';
// Fix: Import BotIcon to resolve reference error.
import BotIcon from './components/icons/BotIcon';
import { backgrounds, avatars, getAvatarComponent } from './rewards';

const App: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reward System State
  const [stars, setStars] = useState<number>(() => parseInt(localStorage.getItem('memoryStars') || '0', 10));
  const [unlockedItems, setUnlockedItems] = useState<string[]>(() => JSON.parse(localStorage.getItem('memoryUnlockedItems') || '["default-avatar", "default-bg"]'));
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(() => localStorage.getItem('memorySelectedAvatar') || 'default-avatar');
  const [selectedBackgroundId, setSelectedBackgroundId] = useState<string>(() => localStorage.getItem('memorySelectedBackground') || 'default-bg');
  const [isRewardPanelOpen, setRewardPanelOpen] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Memoize reward data
  const selectedAvatarComponent = useMemo(() => getAvatarComponent(selectedAvatarId), [selectedAvatarId]);
  const selectedBackgroundClass = useMemo(() => backgrounds.find(b => b.id === selectedBackgroundId)?.className || 'bg-slate-900', [selectedBackgroundId]);

  // Persist reward state to localStorage
  useEffect(() => {
    localStorage.setItem('memoryStars', stars.toString());
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('memoryUnlockedItems', JSON.stringify(unlockedItems));
  }, [unlockedItems]);

  useEffect(() => {
    localStorage.setItem('memorySelectedAvatar', selectedAvatarId);
  }, [selectedAvatarId]);

  useEffect(() => {
    localStorage.setItem('memorySelectedBackground', selectedBackgroundId);
  }, [selectedBackgroundId]);
  
  // Initial setup
  useEffect(() => {
    try {
      const chatSession = createChatSession();
      setChat(chatSession);
      if (messages.length === 0) {
        handleSendMessage('', true);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred during initialization.");
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (message: string, isInitial = false) => {
    if (!chat) return;

    setIsLoading(true);
    if (!isInitial) {
        setMessages((prev) => [...prev, { role: MessageRole.USER, text: message }]);
    }
    
    try {
      const result = await chat.sendMessageStream({ message });
      
      let currentResponse = '';
      let starAwardedInTurn = false;
      setMessages((prev) => [...prev, { role: MessageRole.MODEL, text: '' }]);

      for await (const chunk of result) {
        currentResponse += chunk.text;
        // Fix: Check for star award on the aggregated response to handle cases where the award tag is split across stream chunks.
        if (currentResponse.includes('[STAR_AWARDED]') && !starAwardedInTurn) {
          setStars(prevStars => prevStars + 1);
          starAwardedInTurn = true;
        }
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = currentResponse;
          return newMessages;
        });
      }
    } catch (e) {
      setError("Lo siento, ocurrió un error al comunicarme. Por favor, intenta de nuevo.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlockItem = (item: { id: string, cost: number }) => {
    if (stars >= item.cost && !unlockedItems.includes(item.id)) {
      setStars(s => s - item.cost);
      setUnlockedItems(items => [...items, item.id]);
    }
  };

  return (
    <div className={`flex flex-col h-screen max-w-4xl mx-auto font-sans transition-colors duration-500 ${selectedBackgroundClass}`}>
      <header className="p-4 border-b border-slate-700 bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 flex justify-between items-center">
        <div className="text-left flex-1">
          <h1 className="text-xl font-bold text-slate-100">Dr. Alex</h1>
          <p className="text-sm text-slate-400 hidden sm:block">Entrenador de Memoria</p>
        </div>
        <button 
          onClick={() => setRewardPanelOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-amber-400 hover:bg-amber-500 transition-colors text-amber-900 font-bold shadow-lg shadow-amber-500/10"
          aria-label={`Abrir panel de recompensas. Tienes ${stars} estrellas.`}
        >
          <StarIcon className="w-5 h-5" />
          <span>{stars}</span>
        </button>
      </header>

      <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg my-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="flex flex-col">
            {messages.map((msg, index) => (
               <ChatMessageComponent key={index} message={msg} avatarComponent={selectedAvatarComponent} />
            ))}
            {isLoading && messages[messages.length - 1]?.role === MessageRole.USER && (
                 <div className="flex items-start gap-3 my-4 justify-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 text-indigo-400 flex items-center justify-center">
                         <BotIcon className="w-5 h-5 animate-pulse"/>
                    </div>
                    <div className="max-w-xs md:max-w-md lg:max-w-2xl px-4 py-3 rounded-xl bg-slate-700 text-slate-200 rounded-bl-none border border-slate-600 flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></div>
                    </div>
                </div>
            )}
        </div>
      </main>

      <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-700 p-2 md:p-4 sticky bottom-0">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>

      <RewardPanel
        isOpen={isRewardPanelOpen}
        onClose={() => setRewardPanelOpen(false)}
        stars={stars}
        unlockedItems={unlockedItems}
        onUnlock={handleUnlockItem}
        selectedAvatarId={selectedAvatarId}
        onSelectAvatar={setSelectedAvatarId}
        selectedBackgroundId={selectedBackgroundId}
        onSelectBackground={setSelectedBackgroundId}
      />
    </div>
  );
};

export default App;