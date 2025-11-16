import React from 'react';
import { avatars, backgrounds, getAvatarComponent } from '../rewards';
import StarIcon from './icons/StarIcon';
import LockIcon from './icons/LockIcon';

interface RewardPanelProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
  unlockedItems: string[];
  onUnlock: (item: { id: string, cost: number }) => void;
  selectedAvatarId: string;
  onSelectAvatar: (id: string) => void;
  selectedBackgroundId: string;
  onSelectBackground: (id: string) => void;
}

const RewardPanel: React.FC<RewardPanelProps> = ({
  isOpen, onClose, stars, unlockedItems, onUnlock, 
  selectedAvatarId, onSelectAvatar, selectedBackgroundId, onSelectBackground
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-40 flex justify-center items-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800/95 border border-slate-700 rounded-2xl shadow-2xl w-11/12 max-w-2xl h-[90vh] max-h-[700px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 flex justify-between items-center border-b border-slate-700 flex-shrink-0">
          <h2 className="text-2xl font-bold text-slate-100">Tienda de Recompensas</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl font-light leading-none">&times;</button>
        </header>

        <div className="p-4">
            <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-amber-400/10 border border-amber-400/20">
            <p className="font-bold text-amber-300">Tus Estrellas:</p>
            <div className="flex items-center gap-1 font-bold text-amber-200 text-lg">
                <StarIcon className="w-5 h-5 text-amber-400"/>
                {stars}
            </div>
            </div>
        </div>

        <div className="overflow-y-auto px-4 pb-4 flex-1">
          {/* Avatars */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-slate-300 mb-3 border-b border-slate-700 pb-2">Avatares</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {avatars.map(avatar => {
                const isUnlocked = unlockedItems.includes(avatar.id);
                const isSelected = selectedAvatarId === avatar.id;
                const canUnlock = stars >= avatar.cost;
                const AvatarComponent = getAvatarComponent(avatar.id);

                return (
                  <div key={avatar.id} className="text-center flex flex-col items-center gap-2 bg-slate-700/50 p-3 rounded-lg transition hover:bg-slate-700">
                    <div className={`relative w-20 h-20 mx-auto rounded-full flex items-center justify-center p-2 transition-all duration-200 ${isSelected ? 'bg-indigo-500/20 ring-2 ring-indigo-500' : 'bg-slate-800'}`}>
                      <AvatarComponent className="w-14 h-14 text-slate-300"/>
                      {!isUnlocked && <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center"><LockIcon className="w-8 h-8 text-white/80"/></div>}
                    </div>
                    <p className="font-semibold text-sm text-slate-300 flex-1">{avatar.name}</p>
                    {isUnlocked ? (
                      <button onClick={() => onSelectAvatar(avatar.id)} disabled={isSelected} className={`w-full text-sm py-1.5 rounded-md transition-colors ${isSelected ? 'bg-indigo-600 text-white cursor-default' : 'bg-slate-600 hover:bg-indigo-600 text-slate-200'}`}>
                        {isSelected ? 'Equipado' : 'Equipar'}
                      </button>
                    ) : (
                      <button onClick={() => onUnlock(avatar)} disabled={!canUnlock} className={`w-full text-sm py-1.5 rounded-md flex items-center justify-center gap-1.5 font-semibold transition-colors ${canUnlock ? 'bg-amber-400 hover:bg-amber-300 text-amber-900' : 'bg-slate-600 text-slate-400 cursor-not-allowed'}`}>
                        <StarIcon className="w-4 h-4" /> {avatar.cost}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Backgrounds */}
          <section>
            <h3 className="text-lg font-semibold text-slate-300 mb-3 border-b border-slate-700 pb-2">Fondos de Chat</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {backgrounds.map(bg => {
                 const isUnlocked = unlockedItems.includes(bg.id);
                 const isSelected = selectedBackgroundId === bg.id;
                 const canUnlock = stars >= bg.cost;

                return (
                   <div key={bg.id} className="text-center flex flex-col items-center gap-2 bg-slate-700/50 p-3 rounded-lg transition hover:bg-slate-700">
                    <div className={`relative w-full h-16 rounded-lg ${bg.className} border-2 ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-slate-600'}`}>
                       {!isUnlocked && <div className="absolute inset-0 bg-black/60 rounded-md flex items-center justify-center"><LockIcon className="w-6 h-6 text-white/80"/></div>}
                    </div>
                     <p className="font-semibold text-sm text-slate-300 flex-1 mt-1">{bg.name}</p>
                     {isUnlocked ? (
                      <button onClick={() => onSelectBackground(bg.id)} disabled={isSelected} className={`w-full text-sm py-1.5 rounded-md transition-colors ${isSelected ? 'bg-indigo-600 text-white cursor-default' : 'bg-slate-600 hover:bg-indigo-600 text-slate-200'}`}>
                        {isSelected ? 'Equipado' : 'Equipar'}
                      </button>
                    ) : (
                      <button onClick={() => onUnlock(bg)} disabled={!canUnlock} className={`w-full text-sm py-1.5 rounded-md flex items-center justify-center gap-1.5 font-semibold transition-colors ${canUnlock ? 'bg-amber-400 hover:bg-amber-300 text-amber-900' : 'bg-slate-600 text-slate-400 cursor-not-allowed'}`}>
                        <StarIcon className="w-4 h-4" /> {bg.cost}
                      </button>
                    )}
                   </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RewardPanel;