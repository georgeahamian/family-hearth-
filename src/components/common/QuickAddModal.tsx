import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import {
  X,
  CheckSquare,
  Calendar,
  ShoppingCart,
  MessageSquare,
  User,
  Users,
} from 'lucide-react';
import type {
  ChoreCategory,
  ChoreFrequency,
  ChoreScope,
  EventCategory,
  GroceryCategory,
} from '../../types';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'chore' | 'event' | 'grocery' | 'note';
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'chore',
}) => {
  const {
    members,
    addTask,
    addEvent,
    addGroceryItem,
    addNote,
  } = useFamily();

  const [activeType, setActiveType] = useState<'chore' | 'event' | 'grocery' | 'note'>(
    defaultType
  );

  const todayStr = '2026-09-14';

  // --- Chore / Task Form State ---
  const [choreTitle, setChoreTitle] = useState('');
  const [choreScope, setChoreScope] = useState<ChoreScope>('personal');
  const [choreAssignee, setChoreAssignee] = useState(members[2]?.id || members[0]?.id);
  const [chorePoints, setChorePoints] = useState(20);
  const [choreCategory, setChoreCategory] = useState<ChoreCategory>('Kitchen');
  const [choreFrequency, setChoreFrequency] = useState<ChoreFrequency>('Daily');

  // --- Event Form State ---
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<EventCategory>('School');
  const [eventDate, setEventDate] = useState(todayStr);
  const [eventStart, setEventStart] = useState('09:00');
  const [eventMemberId, setEventMemberId] = useState(members[0]?.id);

  // --- Grocery Form State ---
  const [groceryName, setGroceryName] = useState('');
  const [groceryCategory, setGroceryCategory] = useState<GroceryCategory>('PRODUCE');
  const [groceryPrice, setGroceryPrice] = useState(4.5);

  // --- Note Form State ---
  const [noteContent, setNoteContent] = useState('');
  const [noteColor, setNoteColor] = useState<'yellow' | 'mint' | 'peach'>('yellow');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeType === 'chore') {
      if (!choreTitle.trim()) return;
      addTask({
        title: choreTitle.trim(),
        scope: choreScope,
        assignedToId: choreScope === 'family' ? '' : choreAssignee,
        points: Number(chorePoints),
        category: choreCategory,
        frequency: choreFrequency,
      });
      setChoreTitle('');
      setChoreScope('personal');
    } else if (activeType === 'event') {
      if (!eventTitle.trim()) return;
      const assigned = members.find((m) => m.id === eventMemberId);
      addEvent({
        title: eventTitle.trim(),
        category: eventCategory,
        date: eventDate,
        startTime: eventStart,
        assignedMemberIds: [eventMemberId],
        assignedName: assigned?.name || 'Everyone',
      });
      setEventTitle('');
    } else if (activeType === 'grocery') {
      if (!groceryName.trim()) return;
      addGroceryItem({
        name: groceryName.trim(),
        category: groceryCategory,
        price: Number(groceryPrice),
      });
      setGroceryName('');
    } else if (activeType === 'note') {
      if (!noteContent.trim()) return;
      addNote(noteContent.trim(), noteColor);
      setNoteContent('');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#082117] rounded-3xl shadow-2xl border border-[#e2ece5] dark:border-[#143d2b] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#eef4f0] dark:divide-[#123626] flex-shrink-0">
          <h2 className="text-base font-bold text-[#0f291e] dark:text-white">
            Quick Add to Family Hearth
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Subtabs */}
        <div className="grid grid-cols-4 p-2 bg-[#f6faf8] dark:bg-[#0c2b1e] border-b border-[#eef4f0] dark:border-[#143d2b] gap-1 text-xs font-bold flex-shrink-0">
          {[
            { id: 'chore', label: 'Chore', icon: CheckSquare },
            { id: 'event', label: 'Event', icon: Calendar },
            { id: 'grocery', label: 'Grocery', icon: ShoppingCart },
            { id: 'note', label: 'Note', icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveType(tab.id as any)}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all ${
                  active
                    ? 'bg-white dark:bg-[#082117] text-[#00b875] dark:text-[#34d399] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
          
          {/* CHORE / TASK FORM */}
          {activeType === 'chore' && (
            <div className="space-y-3.5">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clean patio table, Feed Pepper..."
                  value={choreTitle}
                  onChange={(e) => setChoreTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00b875]"
                />
              </div>

              {/* Scope toggle */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-2">
                  Task Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setChoreScope('personal')}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 font-bold text-xs transition-all ${
                      choreScope === 'personal'
                        ? 'border-[#00b875] bg-[#eaf2ed] dark:bg-[#0e3b27] text-[#084c31] dark:text-[#34d399]'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <div className="text-left">
                      <div>Personal</div>
                      <div className="text-[10px] font-normal opacity-70">Assign to 1 person</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChoreScope('family')}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 font-bold text-xs transition-all ${
                      choreScope === 'family'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <div className="text-left">
                      <div>Family Pool</div>
                      <div className="text-[10px] font-normal opacity-70">Anyone can claim</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Assignee row (only for personal) */}
              {choreScope === 'personal' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                      Assign To
                    </label>
                    <select
                      value={choreAssignee}
                      onChange={(e) => setChoreAssignee(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                    >
                      {members.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                      Reward Points
                    </label>
                    <input
                      type="number"
                      min="5"
                      step="5"
                      value={chorePoints}
                      onChange={(e) => setChorePoints(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* Points (family) + Category + Frequency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {choreScope === 'family' && (
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                      Reward Points
                    </label>
                    <input
                      type="number"
                      min="5"
                      step="5"
                      value={chorePoints}
                      onChange={(e) => setChorePoints(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                    />
                  </div>
                )}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Category
                  </label>
                  <select
                    value={choreCategory}
                    onChange={(e) => setChoreCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                  >
                    {['Kitchen', 'Pets', 'Laundry', 'Outdoor', 'Cleaning', 'Homework', 'General'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Frequency
                  </label>
                  <select
                    value={choreFrequency}
                    onChange={(e) => setChoreFrequency(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Custom">One-time / Custom</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* EVENT FORM */}
          {activeType === 'event' && (
            <div className="space-y-3.5">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Violin Recital, Soccer Practice..."
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    placeholder="3:30"
                    value={eventStart}
                    onChange={(e) => setEventStart(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Category
                  </label>
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                  >
                    {['School', 'Sports', 'Family', 'Medical', 'Social'].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Family Member
                </label>
                <select
                  value={eventMemberId}
                  onChange={(e) => setEventMemberId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* GROCERY FORM */}
          {activeType === 'grocery' && (
            <div className="space-y-3.5">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sourdough Bread, Almond Milk..."
                  value={groceryName}
                  onChange={(e) => setGroceryName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Category
                  </label>
                  <select
                    value={groceryCategory}
                    onChange={(e) => setGroceryCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                  >
                    {['PRODUCE', 'DAIRY', 'PANTRY', 'SNACKS'].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Est. Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    value={groceryPrice}
                    onChange={(e) => setGroceryPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* NOTE FORM */}
          {activeType === 'note' && (
            <div className="space-y-3.5">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Sticky Note Message
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write a family reminder for the fridge..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0c2b1e] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Color Tag
                </label>
                <div className="flex items-center gap-3">
                  {(['yellow', 'mint', 'peach'] as const).map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNoteColor(color)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold capitalize ${
                        noteColor === color ? 'ring-2 ring-[#00b875]' : ''
                      } ${
                        color === 'yellow' ? 'bg-[#fef9c3] text-[#713f12]' : color === 'mint' ? 'bg-[#dcfce7] text-[#14532d]' : 'bg-[#ffedd5] text-[#7c2d12]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#eef4f0] dark:border-[#143d2b]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#00b875] dark:bg-[#22c55e] hover:bg-[#00a368] dark:hover:bg-[#16a34a] text-white dark:text-black font-bold transition-all shadow-sm shadow-emerald-600/20 active:scale-95"
            >
              Save Item
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
