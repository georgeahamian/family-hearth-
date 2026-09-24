import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import {
  Car,
  Sun,
  Check,
  Plus,
  ChevronDown,
  Trash2,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface DashboardViewProps {
  onOpenQuickAdd: (type?: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = () => {
  const {
    currentMember,
    chores,
    toggleChoreStatus,
    carpoolTrips,
    toggleCarpoolStatus,
    notes,
    addNote,
    deleteNote,
    reactToNote,
  } = useFamily();

  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteColor, setNewNoteColor] = useState<'yellow' | 'mint' | 'peach'>('yellow');
  const [isBriefingSpeaking, setIsBriefingSpeaking] = useState(false);

  // Next carpool trip
  const activeCarpool = carpoolTrips[1] || carpoolTrips[0];

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    addNote(newNoteContent.trim(), newNoteColor);
    setNewNoteContent('');
    setIsAddingNote(false);
  };

  const completedChores = chores.filter((c) => c.status === 'completed');
  const chorePct = chores.length > 0 ? Math.round((completedChores.length / chores.length) * 100) : 0;

  const handleToggleBriefingSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isBriefingSpeaking) {
        window.speechSynthesis.cancel();
        setIsBriefingSpeaking(false);
      } else {
        const text = `Good evening, ${currentMember.name}. Here is your Family Hearth briefing. Next carpool is Lincoln Elementary pickup at 3:20 PM. Maya has Fractions homework due tomorrow, and tonight's dinner is Taco Fiesta Night! You have a 12-day streak going strong!`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsBriefingSpeaking(false);
        utterance.onerror = () => setIsBriefingSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsBriefingSpeaking(true);
      }
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">
      
      {/* 🌿 PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">
            Monday, September 14
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">
            Good evening, {currentMember.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            A calm look at everything moving your family forward today.
          </p>
        </div>

        {/* AI Audio Daily Briefing Button */}
        <button
          onClick={handleToggleBriefingSpeech}
          className={`self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all shadow-xs ${
            isBriefingSpeaking
              ? 'bg-rose-50 dark:bg-[#381616] border-rose-300 text-rose-600 dark:text-rose-300 animate-pulse'
              : 'bg-white dark:bg-[#082117] border-[#d6e5dc] dark:border-[#143d2b] text-[#0f291e] dark:text-slate-200 hover:border-[#00b875]'
          }`}
        >
          {isBriefingSpeaking ? (
            <>
              <VolumeX className="w-4 h-4 text-rose-500" />
              <span>Stop Briefing</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>Play AI Audio Briefing</span>
            </>
          )}
        </button>
      </div>

      {/* 🤖 SMART FAMILY BRIEFING BANNER */}
      <div className="hearth-subcard p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#d6e5dc] dark:border-[#184732]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#00b875] dark:bg-[#22c55e] text-white dark:text-black flex items-center justify-center font-bold flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-[#0f291e] dark:text-white">Daily Focus: </span>
            <span className="text-slate-600 dark:text-slate-300">
              3:20 PM Pickup • Maya's Fractions Math due tomorrow • Tonight: Taco Fiesta Night 🌮
            </span>
          </div>
        </div>
      </div>

      {/* 🌟 TOP ROW: CARPOOL HERO & WEATHER/STREAK */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Next carpool card (7 cols) */}
        <div className="lg:col-span-7 hearth-card p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e8f5ed] dark:bg-[#0d3322] text-[#008f5a] dark:text-[#34d399] text-[11px] font-bold">
                <Car className="w-3.5 h-3.5" />
                <span>Next carpool · 3:20 PM</span>
              </div>

              {/* Scheduled Status Button */}
              <button
                onClick={() => toggleCarpoolStatus(activeCarpool.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs flex-shrink-0 ${
                  activeCarpool.status === 'Completed'
                    ? 'border border-[#d6e5dc] dark:border-[#1b4a34] text-slate-600 dark:text-slate-300 bg-white dark:bg-transparent'
                    : 'bg-[#00b875] dark:bg-[#22c55e] hover:bg-[#00a368] dark:hover:bg-[#16a34a] text-white dark:text-black'
                }`}
              >
                <span>{activeCarpool.status}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-[#0f291e] dark:text-white mt-3">
              Lincoln Elementary pickup
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Sarah driving · Sage Honda CR-V · Lucas + Maya
            </p>
          </div>

          {/* 3-segment progress indicator */}
          <div className="grid grid-cols-3 gap-2 mt-5">
            <div className={`h-1.5 rounded-full ${activeCarpool.status === 'Completed' || activeCarpool.status === 'Scheduled' ? 'bg-[#00b875] dark:bg-[#22c55e]' : 'bg-[#badccb]'}`} />
            <div className={`h-1.5 rounded-full ${activeCarpool.status === 'Completed' ? 'bg-[#00b875] dark:bg-[#22c55e]' : 'bg-[#e2ece5] dark:bg-[#123626]'}`} />
            <div className={`h-1.5 rounded-full ${activeCarpool.status === 'Completed' ? 'bg-[#00b875] dark:bg-[#22c55e]' : 'bg-[#e2ece5] dark:bg-[#123626]'}`} />
          </div>
        </div>

        {/* Weather & Point Stats (5 cols) */}
        <div className="lg:col-span-5 hearth-card p-4 sm:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                Partly sunny · 72°F
              </p>
              <h3 className="text-sm font-bold text-[#0f291e] dark:text-white mt-0.5">
                Perfect park weather
              </h3>
            </div>
            <Sun className="w-6 h-6 text-amber-400 fill-amber-400" />
          </div>

          {/* Two stats boxes */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="hearth-subcard p-3 rounded-2xl">
              <p className="text-lg font-black text-[#0f291e] dark:text-white leading-tight">
                {currentMember.points}
              </p>
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5 truncate">
                points balance
              </p>
            </div>

            <div className="hearth-subcard p-3 rounded-2xl">
              <p className="text-lg font-black text-[#0f291e] dark:text-white leading-tight flex items-center gap-1">
                <span>🔥</span> {currentMember.completedStreak}
              </p>
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5 truncate">
                day streak
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 🌟 BOTTOM ROW: TODAY'S QUESTS & FAMILY FRIDGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Little wins, shared (7 cols) */}
        <div className="lg:col-span-7 hearth-card p-4 sm:p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Today's Quests
              </p>
              <span className="text-xs font-black text-[#00b875] dark:text-[#34d399]">
                {chorePct}%
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#0f291e] dark:text-white mt-0.5">
              Little wins, shared
            </h3>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#e2ece5] dark:bg-[#123626] rounded-full overflow-hidden mt-2.5">
              <div
                className="h-full bg-[#00b875] dark:bg-[#22c55e] rounded-full transition-all duration-500"
                style={{ width: `${chorePct}%` }}
              />
            </div>
          </div>

          {/* Chore Checklist */}
          <div className="space-y-2 pt-1">
            {chores.map((chore) => {
              const isDone = chore.status === 'completed';

              return (
                <div
                  key={chore.id}
                  onClick={() => toggleChoreStatus(chore.id)}
                  className={`group cursor-pointer flex items-center justify-between p-3 rounded-2xl border transition-all duration-150 ${
                    isDone
                      ? 'bg-transparent border-[#e2ece5]/70 dark:border-[#123626]'
                      : 'bg-white dark:bg-[#082117] border-[#e2ece5] dark:border-[#143d2b] hover:border-[#00b875] dark:hover:border-[#22c55e]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                        isDone
                          ? 'bg-[#00b875] dark:bg-[#22c55e] text-white dark:text-black'
                          : 'border-2 border-slate-300 dark:border-slate-600 group-hover:border-[#00b875] dark:group-hover:border-[#22c55e]'
                      }`}
                    >
                      {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`text-xs font-bold leading-tight truncate ${
                          isDone
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-[#0f291e] dark:text-slate-100'
                        }`}
                      >
                        {chore.title}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {chore.assignedToId === 'm1' && 'Sarah · Outdoor'}
                        {chore.assignedToId === 'm2' && 'Alex · Laundry'}
                        {chore.assignedToId === 'm3' && 'Lucas · Pets'}
                        {chore.assignedToId === 'm4' && 'Maya · Kitchen'}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-[#f0f5f2] dark:bg-[#0c2b1e] px-2 py-0.5 rounded-lg flex-shrink-0 ml-2">
                    +{chore.points}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Family Fridge sticky notes with Reactions (5 cols) */}
        <div className="lg:col-span-5 hearth-card p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Family Fridge
              </p>
              <h3 className="text-sm font-bold text-[#0f291e] dark:text-white mt-0.5">
                Notes for everyone
              </h3>
            </div>

            <button
              onClick={() => setIsAddingNote(!isAddingNote)}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-[#00b875] dark:hover:text-[#34d399] hover:bg-[#e8f5ed] dark:hover:bg-[#0d3322] transition-colors"
              title="Add a note"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* New note creator popup */}
          {isAddingNote && (
            <form onSubmit={handleCreateNote} className="p-3 bg-[#f8faf9] dark:bg-[#0c2b1e] rounded-2xl border border-[#e2ece5] dark:border-[#184732] space-y-2 animate-fade-in">
              <input
                type="text"
                placeholder="Write a sticky note..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                autoFocus
                className="w-full text-xs p-2 rounded-xl bg-white dark:bg-[#082117] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#00b875]"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {(['yellow', 'mint', 'peach'] as const).map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewNoteColor(color)}
                      className={`w-4 h-4 rounded-full border ${
                        newNoteColor === color ? 'ring-2 ring-[#00b875]' : ''
                      } ${
                        color === 'yellow' ? 'bg-[#fef9c3]' : color === 'mint' ? 'bg-[#dcfce7]' : 'bg-[#ffedd5]'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsAddingNote(false)}
                    className="text-[11px] text-slate-400 hover:text-slate-600 px-2 py-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-[11px] font-bold bg-[#00b875] dark:bg-[#22c55e] text-white dark:text-black px-2.5 py-1 rounded-lg"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Sticky Notes Grid with Reactions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {notes.map((note) => {
              const bgClass =
                note.colorType === 'yellow'
                  ? 'bg-[#fef08a]/60 dark:bg-[#3d3810] text-[#713f12] dark:text-[#fef08a]'
                  : note.colorType === 'mint'
                  ? 'bg-[#bbf7d0]/60 dark:bg-[#0f3d24] text-[#14532d] dark:text-[#86efac]'
                  : 'bg-[#fed7aa]/60 dark:bg-[#422210] text-[#7c2d12] dark:text-[#fdba74]';

              const reactions = note.reactions || { heart: 0, like: 0, laugh: 0 };

              return (
                <div
                  key={note.id}
                  className={`p-3.5 rounded-2xl relative group transition-transform hover:-translate-y-0.5 flex flex-col justify-between space-y-3 ${bgClass}`}
                >
                  <div>
                    {/* Center pin dot */}
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500/40 mx-auto mb-2" />
                    <p className="text-xs font-semibold leading-relaxed pr-3">
                      {note.content}
                    </p>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 text-slate-400 hover:text-rose-500 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Reaction Buttons */}
                  <div className="flex items-center gap-1.5 pt-1 border-t border-black/5 dark:border-white/5">
                    <button
                      onClick={() => reactToNote(note.id, 'heart')}
                      className="px-1.5 py-0.5 rounded-md bg-white/40 dark:bg-black/20 hover:scale-110 text-[10px] font-bold flex items-center gap-0.5 transition-transform"
                    >
                      <span>❤️</span>
                      <span>{reactions.heart}</span>
                    </button>
                    <button
                      onClick={() => reactToNote(note.id, 'like')}
                      className="px-1.5 py-0.5 rounded-md bg-white/40 dark:bg-black/20 hover:scale-110 text-[10px] font-bold flex items-center gap-0.5 transition-transform"
                    >
                      <span>👍</span>
                      <span>{reactions.like}</span>
                    </button>
                    <button
                      onClick={() => reactToNote(note.id, 'laugh')}
                      className="px-1.5 py-0.5 rounded-md bg-white/40 dark:bg-black/20 hover:scale-110 text-[10px] font-bold flex items-center gap-0.5 transition-transform"
                    >
                      <span>😂</span>
                      <span>{reactions.laugh}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
