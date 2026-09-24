import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import {
  Image as ImageIcon,
  Heart,
  Plus
} from 'lucide-react';

interface MemoriesViewProps {
  onOpenQuickAdd?: (type?: any) => void;
}

export const MemoriesView: React.FC<MemoriesViewProps> = () => {
  const {
    members,
    memories,
    addMemory
  } = useFamily();

  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl || !newCaption) return;
    
    addMemory({
      imageUrl: newImageUrl,
      caption: newCaption,
      date: new Date().toISOString().split('T')[0],
      addedById: 'm1' // default to Sarah for demo
    });
    
    setNewImageUrl('');
    setNewCaption('');
    setIsAddingMemory(false);
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">
      
      {/* 🌿 PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">
            Family Memories
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">
            Photo Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Capture and share the best moments of the week.
          </p>
        </div>
        
        <button
          onClick={() => setIsAddingMemory(!isAddingMemory)}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00b875] dark:bg-[#22c55e] hover:bg-[#00a368] dark:hover:bg-[#16a34a] text-white dark:text-black font-bold text-xs shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {isAddingMemory && (
        <form onSubmit={handleAddMemory} className="p-4 hearth-card space-y-3 animate-fade-in max-w-2xl">
          <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">New Memory</h2>
          <div className="space-y-2">
            <input
              type="url"
              placeholder="Image URL (e.g., Unsplash link)"
              value={newImageUrl}
              onChange={e => setNewImageUrl(e.target.value)}
              className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-[#082117] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
            />
            <input
              type="text"
              placeholder="Caption this moment..."
              value={newCaption}
              onChange={e => setNewCaption(e.target.value)}
              className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-[#082117] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setIsAddingMemory(false)} className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-1.5 text-xs font-bold bg-[#00b875] dark:bg-[#22c55e] text-white dark:text-black rounded-xl">
              Post Memory
            </button>
          </div>
        </form>
      )}

      {/* 🌟 PHOTO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {memories.map(memory => {
          const addedBy = members.find(m => m.id === memory.addedById);
          return (
            <div key={memory.id} className="hearth-card overflow-hidden group">
              <div className="aspect-square relative overflow-hidden bg-slate-100 dark:bg-[#0c2b1e]">
                {memory.imageUrl ? (
                  <img
                    src={memory.imageUrl}
                    alt={memory.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                  </div>
                )}
                
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80" />
                
                {/* Content on top of image */}
                <div className="absolute inset-x-0 bottom-0 p-4 space-y-1.5 text-white">
                  <p className="text-sm font-bold leading-tight drop-shadow-md">
                    {memory.caption}
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-medium text-white/80">
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center font-bold text-[8px]">
                        {addedBy?.avatar}
                      </span>
                      <span>{addedBy?.name} • {memory.date}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                      <Heart className="w-3 h-3 fill-white/80" />
                      <span>{memory.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {memories.length === 0 && (
          <div className="lg:col-span-3 py-12 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 space-y-3 hearth-card">
            <ImageIcon className="w-10 h-10 opacity-50" />
            <p className="text-sm font-medium">No memories shared yet this week.</p>
          </div>
        )}
      </div>

    </div>
  );
};
