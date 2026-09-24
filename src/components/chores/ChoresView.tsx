import React, { useState, useEffect } from 'react';
import { useFamily } from '../../context/FamilyContext';
import {
  Gift,
  Check,
  ClipboardList,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Dices,
  Users,
  User,
  Plus,
  X,
  HandMetal,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import type { ChoreCategory, ChoreFrequency, ChoreScope } from '../../types';

interface ChoresViewProps {
  onOpenQuickAdd?: (type?: any) => void;
}

type TaskTab = 'mine' | 'family' | 'created';

export const ChoresView: React.FC<ChoresViewProps> = () => {
  const {
    chores,
    toggleChoreStatus,
    claimFamilyTask,
    addTask,
    rewards,
    redeemReward,
    members,
    currentMember,
    triggerConfetti,
    showToast,
  } = useFamily();

  const [activeTab, setActiveTab] = useState<TaskTab>('mine');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // 10-Minute Speed Cleanup Timer state
  const [timerSeconds, setTimerSeconds] = useState(600);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Create task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskScope, setTaskScope] = useState<ChoreScope>('personal');
  const [taskAssignee, setTaskAssignee] = useState(currentMember.id);
  const [taskPoints, setTaskPoints] = useState(20);
  const [taskCategory, setTaskCategory] = useState<ChoreCategory>('Kitchen');
  const [taskFrequency, setTaskFrequency] = useState<ChoreFrequency>('Daily');

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      triggerConfetti();
      showToast('🎉 SPEED CLEANUP COMPLETE! +50 Team Bonus Points earned!');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, triggerConfetti, showToast]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Mystery Quest Generator
  const handleMysteryQuest = () => {
    const mysteryQuests = [
      { title: 'Bake warm cookies together 🍪', points: 40, category: 'Kitchen' as const },
      { title: 'Match 10 pairs of clean socks 🧦', points: 20, category: 'Laundry' as const },
      { title: 'Organize the board games 🎲', points: 25, category: 'General' as const },
      { title: 'Wipe all light switches & doorknobs ✨', points: 30, category: 'Cleaning' as const },
      { title: '5-minute patio herb inspection 🌱', points: 15, category: 'Outdoor' as const },
    ];
    const picked = mysteryQuests[Math.floor(Math.random() * mysteryQuests.length)];
    addTask({
      title: picked.title,
      scope: 'personal',
      assignedToId: currentMember.id,
      points: picked.points,
      category: picked.category,
      frequency: 'Daily',
    });
    triggerConfetti();
    showToast(`🎲 Mystery Quest unlocked: "${picked.title}" (+${picked.points} pts)!`);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addTask({
      title: taskTitle.trim(),
      scope: taskScope,
      assignedToId: taskScope === 'family' ? '' : taskAssignee,
      points: taskPoints,
      category: taskCategory,
      frequency: taskFrequency,
    });
    setTaskTitle('');
    setShowCreateForm(false);
  };

  // Derived task lists
  const myTasks = chores.filter(
    (c) => c.scope === 'personal' && c.assignedToId === currentMember.id
  );
  const familyTasks = chores.filter((c) => c.scope === 'family');
  const createdTasks = chores.filter((c) => c.createdById === currentMember.id);

  const TABS = [
    { id: 'mine' as TaskTab, label: 'My Tasks', count: myTasks.filter(c => c.status !== 'completed').length, icon: User },
    { id: 'family' as TaskTab, label: 'Family Pool', count: familyTasks.filter(c => c.status !== 'completed').length, icon: Users },
    { id: 'created' as TaskTab, label: 'I Created', count: createdTasks.length, icon: Sparkles },
  ];

  const activeTasks = activeTab === 'mine' ? myTasks : activeTab === 'family' ? familyTasks : createdTasks;

  const getMemberById = (id: string) => members.find(m => m.id === id);

  const memberColor: Record<string, string> = {
    m1: '#00b875',
    m2: '#3b82f6',
    m3: '#6366f1',
    m4: '#10b981',
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">

      {/* 🌿 PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">
            Task Hub
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">
            {currentMember.name}'s Tasks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Assign tasks, claim family jobs, and track everyone's progress.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          {/* Mystery Quest */}
          <button
            onClick={handleMysteryQuest}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-[#00b875] hover:opacity-95 text-white font-bold text-xs shadow-sm shadow-amber-500/20 active:scale-95 transition-all"
          >
            <Dices className="w-4 h-4" />
            <span>Mystery Quest</span>
          </button>

          {/* Create Task */}
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#00b875] dark:bg-[#22c55e] hover:bg-[#00a368] text-white dark:text-black font-bold text-xs shadow-sm shadow-emerald-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* ⏱️ 10-MINUTE SPEED CLEANUP BANNER */}
      <div className="hearth-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-amber-200 dark:border-amber-900/40 bg-gradient-to-r from-amber-500/10 via-transparent to-emerald-500/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-[#0f291e] dark:text-white">
                10-Minute Family Blitz Challenge
              </h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                +50 Team Pts
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Everyone tackles 1 quick task before the timer hits zero!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-lg sm:text-xl font-black text-[#0f291e] dark:text-white font-mono">
            {formatTimer(timerSeconds)}
          </span>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isTimerRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-[#00b875] dark:bg-[#22c55e] hover:bg-[#00a368] text-white dark:text-black'
            }`}
          >
            {isTimerRunning ? <><Pause className="w-3.5 h-3.5" /><span>Pause</span></> : <><Play className="w-3.5 h-3.5 fill-current" /><span>Start Blitz</span></>}
          </button>
          <button
            onClick={() => { setIsTimerRunning(false); setTimerSeconds(600); }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 🗂️ 3-TAB NAVIGATION */}
      <div className="flex items-center gap-1 p-1 bg-[#eaf2ed] dark:bg-[#0c2b1e] rounded-2xl">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-white dark:bg-[#082117] text-[#00b875] dark:text-[#34d399] shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#0f291e] dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  isActive
                    ? 'bg-[#00b875]/15 dark:bg-[#34d399]/15 text-[#00b875] dark:text-[#34d399]'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Task List (left, wider) */}
        <div className="lg:col-span-7 hearth-card p-4 sm:p-6 space-y-3">

          {/* Tab-specific heading */}
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
              {activeTab === 'mine' && `Tasks assigned to ${currentMember.name}`}
              {activeTab === 'family' && 'Open family tasks — anyone can claim'}
              {activeTab === 'created' && `Tasks ${currentMember.name} created`}
            </h2>
            <span className="text-[11px] font-bold text-slate-400">
              {activeTasks.length} task{activeTasks.length !== 1 ? 's' : ''}
            </span>
          </div>

          {activeTasks.length === 0 && (
            <div className="py-10 flex flex-col items-center justify-center gap-2 text-slate-400">
              <ClipboardList className="w-8 h-8 opacity-40" />
              <p className="text-xs font-medium">
                {activeTab === 'mine' && 'No tasks assigned to you right now 🎉'}
                {activeTab === 'family' && 'No family tasks open right now.'}
                {activeTab === 'created' && "You haven't created any tasks yet."}
              </p>
              {activeTab !== 'family' && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="mt-1 text-xs font-bold text-[#00b875] dark:text-[#34d399] underline underline-offset-2"
                >
                  + Create a task
                </button>
              )}
            </div>
          )}

          <div className="space-y-3">
            {activeTasks.map((chore) => {
              const isDone = chore.status === 'completed';
              const creator = getMemberById(chore.createdById);
              const assignee = chore.assignedToId ? getMemberById(chore.assignedToId) : null;
              const claimer = chore.claimedById ? getMemberById(chore.claimedById) : null;
              const isClaimedByMe = chore.claimedById === currentMember.id;
              const isClaimedByOther = !!chore.claimedById && !isClaimedByMe;

              return (
                <div
                  key={chore.id}
                  className={`hearth-subcard p-3.5 sm:p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-3 transition-all ${isDone ? 'opacity-60' : ''}`}
                >
                  {/* Left: task info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Scope badge */}
                      {chore.scope === 'family' ? (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 flex items-center gap-1">
                          <Users className="w-2.5 h-2.5" /> Family
                        </span>
                      ) : (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#eaf2ed] dark:bg-[#123626] text-slate-600 dark:text-[#86efac] flex items-center gap-1">
                          <User className="w-2.5 h-2.5" /> Personal
                        </span>
                      )}
                      {/* Category */}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {chore.category}
                      </span>
                      {/* Points */}
                      <span className="text-[10px] font-extrabold text-emerald-700 dark:text-[#86efac]">
                        +{chore.points} pts
                      </span>
                    </div>

                    <h3 className={`text-xs sm:text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-[#0f291e] dark:text-white'}`}>
                      {chore.title}
                    </h3>

                    {/* Meta row */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {creator && activeTab === 'created' && assignee && (
                        <span className="text-[11px] text-slate-400">
                          → {chore.scope === 'family' ? 'Family Pool' : assignee.name}
                        </span>
                      )}
                      {creator && activeTab !== 'created' && (
                        <span className="text-[11px] text-slate-400">
                          From {creator.id === currentMember.id ? 'you' : creator.name}
                        </span>
                      )}
                      {chore.frequency && (
                        <span className="text-[11px] text-slate-400">· {chore.frequency}</span>
                      )}
                      {isDone && chore.completedAt && (
                        <span className="text-[11px] text-[#00b875] dark:text-[#34d399] font-semibold">
                          ✓ Done at {chore.completedAt}
                        </span>
                      )}
                      {/* Claimed by indicator */}
                      {claimer && !isDone && (
                        <span
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: (memberColor[claimer.id] || '#888') + '22', color: memberColor[claimer.id] || '#888' }}
                        >
                          {isClaimedByMe ? '🙋 Claimed by you' : `🙋 Claimed by ${claimer.name}`}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: action buttons */}
                  <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                    {/* FAMILY POOL: unclaimed → show Claim button */}
                    {chore.scope === 'family' && !chore.claimedById && !isDone && (
                      <button
                        onClick={() => claimFamilyTask(chore.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold transition-all active:scale-95"
                      >
                        <HandMetal className="w-3.5 h-3.5" />
                        <span>Claim & Do</span>
                      </button>
                    )}

                    {/* FAMILY POOL: claimed by someone else → greyed */}
                    {chore.scope === 'family' && isClaimedByOther && !isDone && (
                      <span className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 text-xs font-bold bg-transparent flex items-center gap-1.5">
                        <ChevronRight className="w-3.5 h-3.5" />
                        Taken
                      </span>
                    )}

                    {/* COMPLETE button: show for personal tasks, or family tasks claimed by me */}
                    {((chore.scope === 'personal' && chore.assignedToId === currentMember.id) ||
                      (chore.scope === 'family' && isClaimedByMe) ||
                      (activeTab === 'created' && chore.scope === 'personal' && chore.assignedToId === currentMember.id)) && (
                      <button
                        onClick={() => toggleChoreStatus(chore.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                          isDone
                            ? 'border border-[#d6e5dc] dark:border-[#1b4a34] text-slate-500 dark:text-slate-300 bg-white dark:bg-transparent'
                            : 'bg-[#e8f5ed] dark:bg-[#0e3b27] text-[#008f5a] dark:text-[#34d399] hover:bg-[#d6ebe0] dark:hover:bg-[#154a32]'
                        }`}
                      >
                        {isDone ? (
                          <><Check className="w-3.5 h-3.5 stroke-[2.5] text-[#00b875] dark:text-[#34d399]" /><span>Done</span></>
                        ) : (
                          <><ClipboardList className="w-3.5 h-3.5" /><span>Mark done</span></>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right sidebar: Reward shop + Leaderboard */}
        <div className="lg:col-span-5 space-y-4 flex flex-col">

          {/* Reward Store */}
          <div className="hearth-card p-4 sm:p-5 space-y-3 flex-1">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
              Reward shop
            </h2>
            <div className="space-y-2">
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  className="hearth-subcard p-3 rounded-xl flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-1.5 rounded-lg text-[#00b875] dark:text-[#34d399] flex-shrink-0">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-[#0f291e] dark:text-white truncate">{reward.title}</h3>
                      <p className="text-[11px] text-slate-400">{reward.cost} pts</p>
                    </div>
                  </div>
                  {reward.isRedeemed ? (
                    <span className="px-2.5 py-1 rounded-lg border border-[#d6e5dc] dark:border-[#1b4a34] text-slate-500 dark:text-slate-400 text-[11px] font-bold flex-shrink-0">
                      Redeemed
                    </span>
                  ) : (
                    <button
                      onClick={() => redeemReward(reward.id)}
                      className="px-2.5 py-1 rounded-lg bg-[#00b875] dark:bg-[#22c55e] hover:bg-[#00a368] text-white dark:text-black text-[11px] font-bold transition-all flex-shrink-0"
                    >
                      Redeem
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="hearth-card p-4 sm:p-5 space-y-3 flex-1">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
              Points leaderboard
            </h2>
            <div className="space-y-2">
              {[...members]
                .sort((a, b) => b.points - a.points)
                .map((m, idx) => (
                  <div
                    key={m.id}
                    className={`flex items-center gap-3 p-2.5 rounded-xl ${m.id === currentMember.id ? 'bg-[#eaf2ed] dark:bg-[#0e3b27]' : ''}`}
                  >
                    <div
                      className="w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: idx === 0 ? '#00b875' : '#e5eee8', color: idx === 0 ? 'white' : '#0f291e' }}
                    >
                      {idx + 1}
                    </div>
                    <div
                      className="w-7 h-7 rounded-full text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: memberColor[m.id] || '#888' }}
                    >
                      {m.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold truncate ${m.id === currentMember.id ? 'text-[#084c31] dark:text-[#34d399]' : 'text-[#0f291e] dark:text-white'}`}>
                        {m.name}{m.id === currentMember.id ? ' (you)' : ''}
                      </p>
                      <p className="text-[11px] text-slate-400">🔥 {m.completedStreak}d streak</p>
                    </div>
                    <span className="text-xs font-extrabold text-[#0f291e] dark:text-white tabular-nums">
                      {m.points.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>

      {/* ✏️ CREATE TASK MODAL */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#082117] rounded-3xl shadow-2xl border border-[#e2ece5] dark:border-[#143d2b] overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#eef4f0] dark:border-[#143d2b]">
              <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">Create New Task</h2>
              <button onClick={() => setShowCreateForm(false)} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-5 space-y-4 text-xs">

              {/* Task title */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clean the garage, Call the doctor..."
                  value={taskTitle}
                  onChange={e => setTaskTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00b875]"
                />
              </div>

              {/* Scope toggle */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-2">Task Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTaskScope('personal')}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 font-bold transition-all ${
                      taskScope === 'personal'
                        ? 'border-[#00b875] bg-[#eaf2ed] dark:bg-[#0e3b27] text-[#084c31] dark:text-[#34d399]'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <div className="text-left">
                      <div>Personal</div>
                      <div className="text-[10px] font-normal opacity-70">Assign to 1 person</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTaskScope('family')}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 font-bold transition-all ${
                      taskScope === 'family'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <div className="text-left">
                      <div>Family Pool</div>
                      <div className="text-[10px] font-normal opacity-70">Anyone can claim it</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Assignee (only for personal tasks) */}
              {taskScope === 'personal' && (
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Assign To</label>
                  <div className="grid grid-cols-2 gap-2">
                    {members.map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setTaskAssignee(m.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 font-bold text-[11px] transition-all ${
                          taskAssignee === m.id
                            ? 'border-[#00b875] bg-[#eaf2ed] dark:bg-[#0e3b27] text-[#084c31] dark:text-[#34d399]'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: memberColor[m.id] || '#888' }}
                        >
                          {m.avatar}
                        </span>
                        <span className="truncate">{m.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Points + Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Points</label>
                  <input
                    type="number"
                    min="5"
                    step="5"
                    value={taskPoints}
                    onChange={e => setTaskPoints(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Category</label>
                  <select
                    value={taskCategory}
                    onChange={e => setTaskCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                  >
                    {['Kitchen', 'Pets', 'Laundry', 'Outdoor', 'Cleaning', 'Homework', 'General'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Frequency</label>
                <select
                  value={taskFrequency}
                  onChange={e => setTaskFrequency(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Custom">One-time / Custom</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#eef4f0] dark:border-[#143d2b]">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00b875] dark:bg-[#22c55e] hover:bg-[#00a368] text-white dark:text-black font-bold transition-all shadow-sm active:scale-95"
                >
                  {taskScope === 'family' ? 'Post to Family Pool' : `Assign to ${getMemberById(taskAssignee)?.name || 'member'}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
