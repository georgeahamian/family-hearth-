import React from 'react';
import { useFamily } from '../../context/FamilyContext';
import { Gift, CheckCircle2, Circle, ExternalLink } from 'lucide-react';

export const GiftsView: React.FC = () => {
  const { members, wishlist, toggleWishlistItem } = useFamily();
  const purchasedCount = wishlist.filter(i => i.isPurchased).length;

  const clothingSizes: Record<string, { shirt: string; pants: string; shoes: string }> = {
    'm3': { shirt: 'M (10-12)', pants: '27x30', shoes: 'Youth 6' },
    'm4': { shirt: 'Kids S (6-7)', pants: '6X', shoes: 'Kids 2' },
  };

  const upcomingBirthdays = [
    { name: 'Lucas', date: 'Oct 14', daysAway: 23, member: 'LU' },
    { name: 'Grandma Ruth', date: 'Nov 2', daysAway: 42, member: 'GR' },
    { name: 'Maya', date: 'Dec 3', daysAway: 73, member: 'MA' },
  ];

  const kids = members.filter(m => m.role === 'kid' || m.role === 'teen');

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">Gifts & Wishlists</p>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">Present Planner</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Keep track of gift ideas, clothing sizes, and upcoming birthdays.</p>
      </div>

      {/* Upcoming Birthdays Banner */}
      <div className="hearth-card p-4 space-y-3">
        <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">🎂 Upcoming Birthdays</h2>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {upcomingBirthdays.map((b, i) => (
            <div key={i} className="hearth-subcard p-3 rounded-2xl flex flex-col items-center gap-1 min-w-[90px] flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#d5ebe0] dark:bg-[#0e3b27] text-[#0f4a33] dark:text-[#34d399] font-bold text-[9px] flex items-center justify-center">{b.member}</div>
              <p className="text-xs font-bold text-[#0f291e] dark:text-white text-center">{b.name}</p>
              <p className="text-[10px] text-slate-500">{b.date}</p>
              <div className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 rounded-full text-[9px] font-bold text-amber-600 dark:text-amber-400">{b.daysAway}d away</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Wishlist */}
        <div className="lg:col-span-7 space-y-5">
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
                <span>Gift Ideas</span>
              </h2>
              <span className="text-[10px] font-bold text-slate-500">{purchasedCount}/{wishlist.length} purchased</span>
            </div>
            <div className="space-y-3">
              {wishlist.map((item) => {
                const member = members.find(m => m.id === item.forMemberId);
                return (
                  <div key={item.id} onClick={() => toggleWishlistItem(item.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${item.isPurchased ? 'bg-[#f8faf9] border-[#e2ece5] dark:bg-[#0c2b1e] dark:border-[#184732]' : 'bg-white border-slate-200 dark:bg-[#082117] dark:border-slate-700 hover:border-[#00b875]/50 dark:hover:border-[#34d399]/50 shadow-xs'}`}
                  >
                    <div className="flex items-center gap-3">
                      <button className={`flex-shrink-0 transition-colors ${item.isPurchased ? 'text-[#00b875] dark:text-[#34d399]' : 'text-slate-300 dark:text-slate-600 group-hover:text-[#00b875]/50'}`}>
                        {item.isPurchased ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                      </button>
                      <div>
                        <span className={`text-sm font-semibold ${item.isPurchased ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-[#0f291e] dark:text-white'}`}>{item.name}</span>
                        {item.link && (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-[10px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5">
                            <ExternalLink className="w-3 h-3" /> View Link
                          </a>
                        )}
                      </div>
                    </div>
                    {member && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400">For {member.name}</span>
                        <div className="w-6 h-6 rounded-full bg-[#d5ebe0] dark:bg-[#0e3b27] text-[#0f4a33] dark:text-[#34d399] font-bold text-[8px] flex items-center justify-center">{member.avatar}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sizes + Ideas */}
        <div className="lg:col-span-5 space-y-5">
          {/* Clothing Sizes */}
          <div className="hearth-card p-4 sm:p-5 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">👕 Clothing Sizes</h2>
            {kids.map(kid => {
              const sizes = clothingSizes[kid.id];
              return sizes ? (
                <div key={kid.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#d5ebe0] dark:bg-[#0e3b27] text-[#0f4a33] dark:text-[#34d399] font-bold text-[8px] flex items-center justify-center">{kid.avatar}</div>
                    <p className="text-xs font-bold text-[#0f291e] dark:text-white">{kid.name}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[['Shirt', sizes.shirt], ['Pants', sizes.pants], ['Shoes', sizes.shoes]].map(([label, val]) => (
                      <div key={label} className="hearth-subcard p-2 rounded-lg text-center">
                        <p className="text-[9px] font-bold text-slate-400 uppercase">{label}</p>
                        <p className="text-xs font-bold text-[#0f291e] dark:text-white mt-0.5">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;
            })}
          </div>

          {/* Gift ideas by occasion */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">🎁 Quick Gift Ideas</h2>
            <div className="space-y-2">
              {[
                { category: 'Ages 6-9', ideas: 'Lego sets, art supplies, books, board games' },
                { category: 'Ages 10-14', ideas: 'Gaming accessories, sports gear, gift cards' },
                { category: 'Parents', ideas: 'Experiences, spa days, kitchen gadgets' },
              ].map((g, i) => (
                <div key={i} className="hearth-subcard p-3 rounded-xl">
                  <p className="text-[10px] font-bold text-[#00b875] dark:text-[#34d399] uppercase tracking-wide">{g.category}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{g.ideas}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
