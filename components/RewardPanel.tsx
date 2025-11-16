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
      className="fixed inset-0 bg-black/40 z-40 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-2xl h-[90vh] max-h-[700px] flex flex-col p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800">Tienda de Recompensas</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">&times;</button>
        </div>
        
        <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-yellow-100 border border-yellow-200">
          <p className="font-bold text-yellow-800">Tus Estrellas:</p>
          <div className="flex items-center gap-1 font-bold text-yellow-800 text-lg">
            <StarIcon className="w-5 h-5 text-yellow-500"/>
            {stars}
          </div>
        </div>

        <div className="overflow-y-auto pr-2 flex-1">
          {/* Avatars */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-slate-700 mb-3">Avatares</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {avatars.map(avatar => {
                const isUnlocked = unlockedItems.includes(avatar.id);
                const isSelected = selectedAvatarId === avatar.id;
                const canUnlock = stars >= avatar.cost;
                const AvatarComponent = getAvatarComponent(avatar.id);

                return (
                  <div key={avatar.id} className="text-center">
                    <div className={`relative w-24 h-24 mx-auto rounded-full flex items-center justify-center p-2 transition-all duration-200 ${isSelected ? 'bg-blue-200 ring-4 ring-blue-400' : 'bg-slate-100'}`}>
                      <AvatarComponent className="w-16 h-16 text-slate-700"/>
                      {!isUnlocked && <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center"><LockIcon className="w-8 h-8 text-white/80"/></div>}
                    </div>
                    <p className="mt-2 font-semibold text-sm text-slate-600">{avatar.name}</p>
                    {isUnlocked ? (
                      <button onClick={() => onSelectAvatar(avatar.id)} disabled={isSelected} className={`mt-1 w-full text-sm py-1 rounded-md ${isSelected ? 'bg-blue-500 text-white cursor-default' : 'bg-slate-200 hover:bg-slate-300'}`}>
                        {isSelected ? 'Seleccionado' : 'Seleccionar'}
                      </button>
                    ) : (
                      <button onClick={() => onUnlock(avatar)} disabled={!canUnlock} className={`mt-1 w-full text-sm py-1 rounded-md flex items-center justify-center gap-1 ${canUnlock ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}>
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
            <h3 className="text-lg font-semibold text-slate-700 mb-3">Fondos de Chat</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {backgrounds.map(bg => {
                 const isUnlocked = unlockedItems.includes(bg.id);
                 const isSelected = selectedBackgroundId === bg.id;
                 const canUnlock = stars >= bg.cost;

                return (
                   <div key={bg.id} className="text-center">
                    <div className={`relative w-full h-16 rounded-lg ${bg.className} border-2 ${isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-slate-200'}`}>
                       {!isUnlocked && <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center"><LockIcon className="w-6 h-6 text-white/80"/></div>}
                    </div>
                     <p className="mt-2 font-semibold text-sm text-slate-600">{bg.name}</p>
                     {isUnlocked ? (
                      <button onClick={() => onSelectBackground(bg.id)} disabled={isSelected} className={`mt-1 w-full text-sm py-1 rounded-md ${isSelected ? 'bg-blue-500 text-white cursor-default' : 'bg-slate-200 hover:bg-slate-300'}`}>
                        {isSelected ? 'Seleccionado' : 'Seleccionar'}
                      </button>
                    ) : (
                      <button onClick={() => onUnlock(bg)} disabled={!canUnlock} className={`mt-1 w-full text-sm py-1 rounded-md flex items-center justify-center gap-1 ${canUnlock ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}>
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
