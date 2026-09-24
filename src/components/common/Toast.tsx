import React from 'react';
import { useFamily } from '../../context/FamilyContext';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useFamily();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-down flex items-center gap-3 bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/60 max-w-md">
      <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-lg">
        <Sparkles className="w-5 h-5 animate-pulse" />
      </div>
      <p className="text-sm font-medium leading-snug flex-1">{toastMessage}</p>
    </div>
  );
};
