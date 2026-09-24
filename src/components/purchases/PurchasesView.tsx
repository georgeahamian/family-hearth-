import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import {
  Package,
  Check,
  DollarSign,
  Plus,
} from 'lucide-react';

interface PurchasesViewProps {
  onOpenQuickAdd: (type?: any) => void;
}

export const PurchasesView: React.FC<PurchasesViewProps> = () => {
  const {
    groceries,
    toggleGroceryItem,
    addGroceryItem,
    pantryItems,
    restockPantryItem,
    savingsGoal,
    contributeSavings,
  } = useFamily();

  const [isAddingCustomGrocery, setIsAddingCustomGrocery] = useState(false);
  const [newGroceryName, setNewGroceryName] = useState('');
  const [newGroceryPrice, setNewGroceryPrice] = useState('3.50');

  // Categories list
  const categories = ['PRODUCE', 'DAIRY', 'PANTRY'] as const;

  // Calculate estimated total
  const estimatedTotal = groceries
    .reduce((sum, item) => sum + (item.price || 0), 0)
    .toFixed(2);

  const remainingToSave = Math.max(0, savingsGoal.targetAmount - savingsGoal.currentAmount);

  const handleAddGrocery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroceryName.trim()) return;
    addGroceryItem({
      name: newGroceryName.trim(),
      category: 'PRODUCE',
      price: parseFloat(newGroceryPrice) || 3.0,
    });
    setNewGroceryName('');
    setIsAddingCustomGrocery(false);
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">
      
      {/* 🌿 PAGE HEADER */}
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">
          Purchases & Wishes
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">
          Shop smarter, save together
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          One shared place for groceries, pantry needs, and family goals.
        </p>
      </div>

      {/* 🌟 TWO COLUMNS: GROCERY LIST & PANTRY/SAVINGS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Grocery list (7 cols) */}
        <div className="lg:col-span-7 hearth-card p-4 sm:p-6 space-y-5">
          
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
              Grocery list
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#eaf2ed] dark:bg-[#0d3322] text-slate-600 dark:text-[#86efac]">
                Est. ${estimatedTotal}
              </span>
              <button
                onClick={() => setIsAddingCustomGrocery(!isAddingCustomGrocery)}
                className="p-1 rounded-lg text-slate-400 hover:text-[#00b875] dark:hover:text-[#34d399]"
                title="Add grocery item"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick inline add form */}
          {isAddingCustomGrocery && (
            <form onSubmit={handleAddGrocery} className="p-3 bg-[#f8faf9] dark:bg-[#0c2b1e] rounded-xl border border-[#e2ece5] dark:border-[#184732] flex flex-col sm:flex-row items-center gap-2 animate-fade-in">
              <input
                type="text"
                placeholder="Item name..."
                value={newGroceryName}
                onChange={(e) => setNewGroceryName(e.target.value)}
                autoFocus
                className="w-full sm:flex-1 text-xs p-1.5 rounded-lg bg-white dark:bg-[#082117] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
              />
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="number"
                  step="0.25"
                  placeholder="Price"
                  value={newGroceryPrice}
                  onChange={(e) => setNewGroceryPrice(e.target.value)}
                  className="flex-1 sm:w-16 text-xs p-1.5 rounded-lg bg-white dark:bg-[#082117] border border-slate-200 dark:border-slate-700 text-[#0f291e] dark:text-white"
                />
                <button
                  type="submit"
                  className="text-xs font-bold bg-[#00b875] dark:bg-[#22c55e] text-white dark:text-black px-3.5 py-1.5 rounded-lg"
                >
                  Add
                </button>
              </div>
            </form>
          )}

          {/* Categorized items */}
          <div className="space-y-4">
            {categories.map((cat) => {
              const items = groceries.filter((g) => g.category === cat);
              if (items.length === 0) return null;

              return (
                <div key={cat} className="space-y-1.5">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    {cat}
                  </p>

                  <div className="divide-y divide-[#eef4f0] dark:divide-[#123626]">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleGroceryItem(item.id)}
                        className="py-2.5 flex items-center justify-between cursor-pointer group hover:bg-black/[0.01] dark:hover:bg-white/[0.02] px-1 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                              item.isCompleted
                                ? 'bg-[#00b875] dark:bg-[#22c55e] text-white dark:text-black'
                                : 'border border-slate-300 dark:border-slate-600 group-hover:border-[#00b875] dark:group-hover:border-[#22c55e]'
                            }`}
                          >
                            {item.isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>

                          <span
                            className={`text-xs font-semibold truncate ${
                              item.isCompleted
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-[#0f291e] dark:text-slate-200'
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>

                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex-shrink-0 ml-3">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Pantry restock & Beach weekend goal (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Pantry restock card */}
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
              Pantry restock
            </h2>

            <div className="space-y-3">
              {pantryItems.map((item) => (
                <div
                  key={item.id}
                  className="hearth-subcard p-3 rounded-2xl flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="p-1.5 sm:p-2 text-[#00b875] dark:text-[#34d399] flex-shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-[#0f291e] dark:text-white truncate">
                        {item.name}
                      </h3>
                      <p className="text-[11px] font-bold text-rose-500 dark:text-[#f87171]">
                        {item.stockPercentage === 100
                          ? '✅ Restocked'
                          : `Only ${item.stockPercentage}% left`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => restockPantryItem(item.id)}
                    className="px-3 py-1 rounded-xl bg-[#00b875] dark:bg-[#22c55e] hover:bg-[#00a368] dark:hover:bg-[#16a34a] text-white dark:text-black text-[11px] font-bold transition-all shadow-xs flex-shrink-0"
                  >
                    Restock
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Beach weekend savings goal card */}
          <div className="hearth-card p-4 sm:p-6 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
                  {savingsGoal.title}
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {savingsGoal.subtitle}
                </p>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#e8f5ed] dark:bg-[#0d3322] text-[#008f5a] dark:text-[#34d399] flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Savings progress bar */}
            <div className="w-full h-2 bg-[#badccb] dark:bg-[#123626] rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-[#00b875] dark:bg-[#22c55e] rounded-full transition-all duration-500"
                style={{
                  width: `${(savingsGoal.currentAmount / savingsGoal.targetAmount) * 100}%`,
                }}
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="font-bold text-[#0f291e] dark:text-white">
                ${savingsGoal.currentAmount} saved
              </span>
              <span className="text-slate-400">
                ${remainingToSave} to go
              </span>
            </div>

            <button
              onClick={() => contributeSavings(25)}
              className="w-full py-2 bg-[#00b875] dark:bg-[#22c55e] hover:bg-[#00a368] dark:hover:bg-[#16a34a] text-white dark:text-black text-xs font-bold rounded-xl transition-all shadow-sm shadow-emerald-600/20 active:scale-95 mt-2"
            >
              + Contribute $25
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
