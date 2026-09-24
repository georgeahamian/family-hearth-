import React from 'react';
import { useFamily } from '../../context/FamilyContext';
import { BookOpen, Tv, CheckCircle2, Circle, Film } from 'lucide-react';

export const MediaView: React.FC = () => {
  const { members, libraryBooks, toggleLibraryBook, subscriptions } = useFamily();
  const totalMonthly = subscriptions.reduce((s, sub) => s + sub.cost, 0);

  const watchlist = [
    { title: 'The Wild Robot', type: 'Movie', emoji: '🎬', platform: 'Theaters' },
    { title: 'Blue Planet III', type: 'Docuseries', emoji: '🌊', platform: 'Netflix' },
    { title: 'Inside Out 2', type: 'Movie', emoji: '🎭', platform: 'Disney+' },
  ];

  const bookRecommendations = [
    { title: 'Percy Jackson & the Olympians', emoji: '⚡', for: 'Lucas (Ages 10-14)' },
    { title: 'Charlotte\'s Web', emoji: '🕷️', for: 'Maya (Ages 6-10)' },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">Library & Media</p>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">Entertainment Hub</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Track library books, subscriptions, and what to watch next.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Books */}
        <div className="lg:col-span-7 space-y-5">
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>Library Books</span>
            </h2>
            <div className="space-y-3">
              {libraryBooks.map((book) => {
                const borrower = members.find(m => m.id === book.borrowerId);
                return (
                  <div key={book.id} onClick={() => toggleLibraryBook(book.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${book.isReturned ? 'bg-[#f8faf9] border-[#e2ece5] dark:bg-[#0c2b1e] dark:border-[#184732]' : 'bg-white border-slate-200 dark:bg-[#082117] dark:border-slate-700 hover:border-[#00b875]/50 dark:hover:border-[#34d399]/50 shadow-xs'}`}
                  >
                    <div className="flex items-center gap-3">
                      <button className={`flex-shrink-0 transition-colors ${book.isReturned ? 'text-[#00b875] dark:text-[#34d399]' : 'text-slate-300 dark:text-slate-600 group-hover:text-[#00b875]/50'}`}>
                        {book.isReturned ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                      </button>
                      <div>
                        <span className={`text-sm font-semibold ${book.isReturned ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-[#0f291e] dark:text-white'}`}>{book.title}</span>
                        <p className={`text-[10px] ${book.isReturned ? 'text-slate-400' : 'text-rose-500 dark:text-rose-400 font-bold'}`}>Due: {book.dueDate}</p>
                      </div>
                    </div>
                    {borrower && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400">{borrower.name}</span>
                        <div className="w-6 h-6 rounded-full bg-[#d5ebe0] dark:bg-[#0e3b27] text-[#0f4a33] dark:text-[#34d399] font-bold text-[8px] flex items-center justify-center">{borrower.avatar}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Book Recommendations */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">📖 Reading Recommendations</h2>
            <div className="space-y-2">
              {bookRecommendations.map((book, i) => (
                <div key={i} className="hearth-subcard p-3 rounded-xl flex items-center gap-3">
                  <span className="text-xl">{book.emoji}</span>
                  <div>
                    <p className="text-xs font-bold text-[#0f291e] dark:text-white">{book.title}</p>
                    <p className="text-[10px] text-slate-500">{book.for}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Family Watchlist */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <Film className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>Family Watchlist</span>
            </h2>
            <div className="space-y-2">
              {watchlist.map((item, i) => (
                <div key={i} className="hearth-subcard p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.emoji}</span>
                    <div>
                      <p className="text-xs font-bold text-[#0f291e] dark:text-white">{item.title}</p>
                      <p className="text-[10px] text-slate-500">{item.type}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eaf2ed] dark:bg-[#0c2b1e] text-[#00b875] dark:text-[#34d399]">{item.platform}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Subscriptions */}
        <div className="lg:col-span-5 space-y-5">
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
                <Tv className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
                <span>Subscriptions</span>
              </h2>
              <span className="text-xs font-black text-[#00b875] dark:text-[#34d399]">${totalMonthly.toFixed(2)}/mo</span>
            </div>
            <div className="space-y-3">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="p-3 bg-white dark:bg-[#082117] rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-[#0f291e] dark:text-white">{sub.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Renews: {sub.renewalDate}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">${sub.cost.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="p-3 bg-[#f8faf9] dark:bg-[#0c2b1e] rounded-xl border border-[#e2ece5] dark:border-[#184732] flex justify-between items-center">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Monthly Total</span>
              <span className="text-sm font-black text-[#0f291e] dark:text-white">${totalMonthly.toFixed(2)}</span>
            </div>
          </div>

          {/* Library Card */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">📚 Library Cards</h2>
            <div className="space-y-2">
              {['Lucas', 'Maya', 'Sarah'].map(name => (
                <div key={name} className="hearth-subcard p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0f291e] dark:text-white">{name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eaf2ed] dark:bg-[#0c2b1e] text-[#00b875] dark:text-[#34d399]">Active Card</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500">Riverside Public Library • Limit 10 books each</p>
          </div>
        </div>
      </div>
    </div>
  );
};
