import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import {
  Sparkles,
} from 'lucide-react';

interface ScheduleViewProps {
  onOpenQuickAdd: (type?: any) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = () => {
  const { events } = useFamily();

  const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'Month'>('Week');
  const [selectedDay, setSelectedDay] = useState<string>('Mon 14');
  const [isResolvingConflict, setIsResolvingConflict] = useState(false);

  const daysList = [
    'Mon 14',
    'Tue 15',
    'Wed 16',
    'Thu 17',
    'Fri 18',
    'Sat 19',
    'Sun 20',
  ];

  // Family load counts
  const familyLoad = [
    { name: 'Sarah', count: 2, max: 5 },
    { name: 'Alex', count: 3, max: 5 },
    { name: 'Lucas', count: 4, max: 5 },
    { name: 'Maya', count: 5, max: 5 },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">
      
      {/* 🌿 PAGE HEADER */}
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">
          Shared Calendar
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">
          The week, at a glance
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Keep everyone moving without schedule surprises.
        </p>
      </div>

      {/* 🔘 VIEW MODE SWITCHER: DAY | WEEK | MONTH */}
      <div className="flex items-center gap-1 bg-[#e5eee8] dark:bg-[#0c2b1e] p-1 rounded-2xl w-fit">
        {(['Day', 'Week', 'Month'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-3.5 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === mode
                ? 'bg-[#00b875] dark:bg-[#22c55e] text-white dark:text-black shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0f291e] dark:hover:text-white'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* 🌟 TWO COLUMNS: SCHEDULE & CONFLICT / FAMILY LOAD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Timeline List (7 cols) */}
        <div className="lg:col-span-7 hearth-card p-4 sm:p-6 space-y-5">
          
          {/* Day selection pill buttons row */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {daysList.map((day) => {
              const isSelected = selectedDay === day;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`flex-1 min-w-[62px] sm:min-w-[70px] py-2 rounded-xl text-xs font-bold transition-all text-center flex-shrink-0 ${
                    isSelected
                      ? 'bg-[#00b875] dark:bg-[#22c55e] text-white dark:text-black shadow-xs'
                      : 'bg-[#e5eee8] dark:bg-[#0c2b1e] text-[#0f291e] dark:text-slate-300 hover:bg-[#d8e7de] dark:hover:bg-[#133a2a]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Events list on selected day */}
          <div className="space-y-3 pt-2">
            {events.map((evt) => {
              const isMedical = evt.category === 'Medical';

              return (
                <div
                  key={evt.id}
                  className="hearth-subcard p-3.5 sm:p-4 rounded-2xl flex items-center justify-between gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {/* Time */}
                    <span className="text-xs font-bold text-[#0f291e] dark:text-white w-10 text-center flex-shrink-0">
                      {evt.startTime}
                    </span>

                    {/* Vertical colored indicator line */}
                    <div
                      className={`w-0.5 h-8 rounded-full flex-shrink-0 ${
                        isMedical ? 'bg-rose-500' : 'bg-[#00b875] dark:bg-[#22c55e]'
                      }`}
                    />

                    {/* Event Title & Assignee */}
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-[#0f291e] dark:text-white truncate">
                        {evt.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 truncate">
                        {evt.assignedName}
                      </p>
                    </div>
                  </div>

                  {/* Category badge */}
                  <span className="text-[10px] font-bold px-2.5 sm:px-3 py-1 rounded-full bg-[#eaf2ed] dark:bg-[#123626] text-slate-600 dark:text-[#86efac] flex-shrink-0">
                    {evt.category}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Middle Column: Conflict detected & Family Load (3 cols) */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Conflict card */}
          <div className="hearth-card p-4 sm:p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
                Conflict detected
              </h2>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Soccer practice and Maya's dentist appointment overlap by 45 minutes.
            </p>

            <button
              onClick={() => setIsResolvingConflict(!isResolvingConflict)}
              className="px-4 py-1.5 rounded-xl border border-[#d6e5dc] dark:border-[#1b4a34] bg-white dark:bg-[#0a2318] text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-[#113324] transition-all shadow-xs"
            >
              Review options
            </button>

            {isResolvingConflict && (
              <div className="p-3 bg-amber-50 dark:bg-[#2b2413] border border-amber-200 dark:border-amber-800 rounded-xl text-xs space-y-2 text-amber-900 dark:text-amber-200 animate-fade-in">
                <p className="font-semibold">Suggested adjustments:</p>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  <li>Ask Alex to handle Maya's dentist drop-off at 3:45 PM</li>
                  <li>Sarah drives Lucas to Soccer at 3:30 PM</li>
                </ul>
              </div>
            )}
          </div>

          {/* Family load distribution card */}
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
              Family load
            </h2>

            <div className="space-y-3.5">
              {familyLoad.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3 sm:gap-4 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 w-12 flex-shrink-0">
                    {item.name}
                  </span>

                  <div className="flex-1 h-2 bg-[#e2ece5] dark:bg-[#123626] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00b875] dark:bg-[#22c55e] rounded-full transition-all duration-500"
                      style={{ width: `${(item.count / item.max) * 100}%` }}
                    />
                  </div>

                  <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium w-14 text-right flex-shrink-0">
                    {item.count} events
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Far Right Column: Quick Add & Summary */}
        <div className="lg:col-span-5 space-y-5 flex flex-col">
          <div className="hearth-card p-4 sm:p-5 space-y-3 flex-1">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
              Quick Add
            </h2>
            <input type="text" placeholder="Event title..." className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white mb-2" />
            <div className="flex gap-2 mb-2">
              <input type="time" className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white" />
            </div>
            <button className="w-full text-xs font-bold bg-[#00b875] dark:bg-[#22c55e] text-white dark:text-black py-2 rounded-lg mt-auto">Add Event</button>
          </div>
          <div className="hearth-card p-4 sm:p-5 space-y-3 flex-1">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
              This Week
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Sarah</span>
                <span className="font-bold">2 evts</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Alex</span>
                <span className="font-bold">3 evts</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Kids</span>
                <span className="font-bold">9 evts</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
