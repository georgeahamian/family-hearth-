import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import {
  PiggyBank,
  TrendingUp,
  TrendingDown,
  Plus,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface FinancesViewProps {
  onOpenQuickAdd?: (type?: any) => void;
}

export const FinancesView: React.FC<FinancesViewProps> = () => {
  const { members, transactions, addTransaction } = useFamily();
  const [isAddingTx, setIsAddingTx] = useState(false);
  const [newTxAmount, setNewTxAmount] = useState('');
  const [newTxDesc, setNewTxDesc] = useState('');
  const [newTxType, setNewTxType] = useState<'allowance' | 'purchase' | 'bonus' | 'penalty'>('purchase');
  const [newTxMember, setNewTxMember] = useState<string>('m3');

  const kids = members.filter(m => m.role === 'kid' || m.role === 'teen');
  const getBalance = (memberId: string) =>
    transactions.filter(tx => tx.memberId === memberId).reduce((sum, tx) => sum + tx.amount, 0);
  const totalSpent = transactions.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const totalEarned = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);

  const handleAddTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTxAmount || !newTxDesc) return;
    addTransaction({
      amount: parseFloat(newTxAmount) * (newTxType === 'purchase' || newTxType === 'penalty' ? -1 : 1),
      description: newTxDesc,
      date: new Date().toISOString().split('T')[0],
      memberId: newTxMember,
      type: newTxType
    });
    setNewTxAmount(''); setNewTxDesc(''); setIsAddingTx(false);
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">Allowance & Finances</p>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">Family Economy</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Track allowances, spending, and financial goals.</p>
      </div>

      {/* STAT PILLS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="hearth-card p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
            <ArrowUpRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Total Earned</p>
            <p className="text-lg font-black text-[#00b875] dark:text-[#34d399]">${totalEarned.toFixed(2)}</p>
          </div>
        </div>
        <div className="hearth-card p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0">
            <ArrowDownRight className="w-4 h-4 text-rose-500 dark:text-rose-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Total Spent</p>
            <p className="text-lg font-black text-rose-500 dark:text-rose-400">${totalSpent.toFixed(2)}</p>
          </div>
        </div>
        <div className="hearth-card p-4 flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="w-9 h-9 rounded-xl bg-[#d5ebe0] dark:bg-[#0e3b27] flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Net Balance</p>
            <p className="text-lg font-black text-[#0f291e] dark:text-white">${(totalEarned - totalSpent).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 space-y-5">
          {/* Kids Accounts */}
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <PiggyBank className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>Kids' Accounts</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {kids.map(kid => {
                const balance = getBalance(kid.id);
                const kidTxs = transactions.filter(tx => tx.memberId === kid.id);
                const spent = kidTxs.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
                const earned = kidTxs.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
                return (
                  <div key={kid.id} className="hearth-subcard p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#00b875]/10 to-transparent rounded-bl-full pointer-events-none" />
                    <span className="w-10 h-10 rounded-full bg-[#d5ebe0] dark:bg-[#0e3b27] text-[#0f4a33] dark:text-[#34d399] font-bold text-sm flex items-center justify-center mb-1">{kid.avatar}</span>
                    <h3 className="text-sm font-bold text-[#0f291e] dark:text-white">{kid.name}</h3>
                    <p className={`text-2xl font-black ${balance >= 0 ? 'text-[#00b875] dark:text-[#34d399]' : 'text-rose-500'}`}>${balance.toFixed(2)}</p>
                    <div className="flex gap-3 text-[10px] pt-1">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">+${earned.toFixed(2)} in</span>
                      <span className="text-rose-500 dark:text-rose-400 font-bold">-${spent.toFixed(2)} out</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Allowance Schedule */}
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>Allowance Schedule</span>
            </h2>
            <div className="space-y-3">
              {kids.map(kid => (
                <div key={kid.id} className="hearth-subcard p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#d5ebe0] dark:bg-[#0e3b27] text-[#0f4a33] dark:text-[#34d399] font-bold text-[10px] flex items-center justify-center">{kid.avatar}</div>
                    <div>
                      <p className="text-xs font-bold text-[#0f291e] dark:text-white">{kid.name}</p>
                      <p className="text-[10px] text-slate-500">Every Sunday</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#00b875] dark:text-[#34d399]">{kid.role === 'teen' ? '+$10.00' : '+$5.00'} / week</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="lg:col-span-5 space-y-5">
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">Recent Activity</h2>
              <button onClick={() => setIsAddingTx(!isAddingTx)} className="p-1.5 rounded-lg text-slate-400 hover:text-[#00b875] dark:hover:text-[#34d399] bg-[#eaf2ed] dark:bg-[#0d3322]">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            {isAddingTx && (
              <form onSubmit={handleAddTx} className="p-3 bg-[#f8faf9] dark:bg-[#0c2b1e] rounded-xl border border-[#e2ece5] dark:border-[#184732] flex flex-col gap-2 animate-fade-in">
                <div className="flex gap-2">
                  <select value={newTxMember} onChange={e => setNewTxMember(e.target.value)} className="text-xs p-1.5 rounded-lg bg-white dark:bg-[#082117] border border-slate-200 dark:border-slate-700 flex-1 text-[#0f291e] dark:text-white">
                    {kids.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
                  </select>
                  <select value={newTxType} onChange={e => setNewTxType(e.target.value as any)} className="text-xs p-1.5 rounded-lg bg-white dark:bg-[#082117] border border-slate-200 dark:border-slate-700 flex-1 text-[#0f291e] dark:text-white">
                    <option value="allowance">Allowance</option>
                    <option value="bonus">Bonus</option>
                    <option value="purchase">Purchase</option>
                    <option value="penalty">Penalty</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <input type="number" step="0.01" placeholder="Amount" value={newTxAmount} onChange={e => setNewTxAmount(e.target.value)} className="w-20 text-xs p-1.5 rounded-lg bg-white dark:bg-[#082117] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white" />
                  <input type="text" placeholder="Description" value={newTxDesc} onChange={e => setNewTxDesc(e.target.value)} className="flex-1 text-xs p-1.5 rounded-lg bg-white dark:bg-[#082117] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white" />
                </div>
                <button type="submit" className="mt-1 w-full text-xs font-bold bg-[#00b875] dark:bg-[#22c55e] text-white dark:text-black py-1.5 rounded-lg">Save</button>
              </form>
            )}
            <div className="space-y-3">
              {transactions.slice(0, 10).map((tx) => {
                const kid = members.find(m => m.id === tx.memberId);
                const isPositive = tx.amount >= 0;
                return (
                  <div key={tx.id} className="hearth-subcard p-3 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isPositive ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#0f291e] dark:text-white">{tx.description}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{kid?.name} • {tx.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold ${isPositive ? 'text-[#00b875] dark:text-[#34d399]' : 'text-rose-500 dark:text-rose-400'}`}>
                      {isPositive ? '+' : ''}{tx.amount.toFixed(2)}
                    </span>
                  </div>
                );
              })}
              {transactions.length === 0 && <p className="text-xs text-center text-slate-500 py-4">No transactions yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
