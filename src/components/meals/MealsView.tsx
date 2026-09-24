import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import {
  UtensilsCrossed,
  ChefHat,
  ShoppingCart,
  Check,
} from 'lucide-react';

interface MealsViewProps {
  onOpenQuickAdd?: (type?: any) => void;
}

export const MealsView: React.FC<MealsViewProps> = () => {
  const {
    mealPlans,
    toggleMealCooked,
    dinnerPoll,
    sendIngredientsToGroceries,
  } = useFamily();

  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('All');

  const daysOfWeek = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredMeals = mealPlans.filter((m) => {
    if (selectedDayFilter === 'All') return true;
    return m.day.toLowerCase() === selectedDayFilter.toLowerCase();
  });



  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">
      
      {/* 🌿 PAGE HEADER */}
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">
          Kitchen & Nutrition
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">
          Family Meal Board & Dinner Poll
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Coordinate weekly dinners, vote on tonight's cravings, and auto-sync grocery ingredients.
        </p>
      </div>

      {/* 🔘 DAY FILTER PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {daysOfWeek.map((day) => {
          const isSelected = selectedDayFilter === day;

          return (
            <button
              key={day}
              onClick={() => setSelectedDayFilter(day)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                isSelected
                  ? 'bg-[#00b875] dark:bg-[#22c55e] text-white dark:text-black shadow-xs'
                  : 'bg-[#e5eee8] dark:bg-[#0c2b1e] text-[#0f291e] dark:text-slate-200 hover:bg-[#d6e5dc] dark:hover:bg-[#133a2a]'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* 🌟 TWO COLUMNS: WEEKLY MENU & DINNER POLL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column (7 cols): Weekly Meal Schedule */}
        <div className="lg:col-span-7 hearth-card p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>Weekly Dinner Schedule</span>
            </h2>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#eaf2ed] dark:bg-[#0d3322] text-slate-600 dark:text-[#86efac]">
              {mealPlans.filter(m => m.isCooked).length} of 7 cooked
            </span>
          </div>

          <div className="space-y-3.5">
            {filteredMeals.map((meal) => (
              <div
                key={meal.id}
                className="hearth-subcard p-4 rounded-2xl flex flex-col justify-between space-y-3 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#eaf2ed] dark:bg-[#123626] text-slate-600 dark:text-[#86efac]">
                      {meal.day}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <ChefHat className="w-3.5 h-3.5 text-[#00b875] dark:text-[#34d399]" />
                      <span>Chef: {meal.chefName}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
                    <span className="text-base">{meal.emoji}</span>
                    <span className={meal.isCooked ? 'line-through text-slate-400' : ''}>{meal.name}</span>
                  </h3>

                  {/* Ingredients preview */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {meal.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-[#082117] border border-[#e2ece5] dark:border-[#143d2b] text-slate-600 dark:text-slate-300"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#eef4f0] dark:border-[#143d2b]">
                  <button
                    onClick={() => sendIngredientsToGroceries(meal.ingredients, meal.name)}
                    className="px-3 py-1.5 rounded-xl border border-[#d6e5dc] dark:border-[#1b4a34] text-[#0f291e] dark:text-slate-200 text-xs font-bold hover:bg-white dark:hover:bg-[#082117] transition-all flex items-center gap-1.5"
                    title="Copy all ingredients to Grocery List"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-[#00b875] dark:text-[#34d399]" />
                    <span>Send to Grocery List</span>
                  </button>

                  <button
                    onClick={() => toggleMealCooked(meal.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      meal.isCooked
                        ? 'bg-[#00b875] dark:bg-[#22c55e] text-white dark:text-black shadow-xs'
                        : 'bg-[#e8f5ed] dark:bg-[#0e3b27] text-[#008f5a] dark:text-[#34d399] hover:bg-[#d6ebe0]'
                    }`}
                  >
                    {meal.isCooked ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Cooked ✓</span>
                      </>
                    ) : (
                      <span>Mark Cooked</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Grocery List Overview */}
        <div className="lg:col-span-5 space-y-5 flex flex-col">
          <div className="hearth-card p-4 sm:p-5 space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">Shopping List</h2>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                12 items
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f5f9f6] dark:hover:bg-[#0c2b1e] transition-colors">
                <div className="w-4 h-4 rounded border-2 border-slate-300 dark:border-slate-600"></div>
                <span className="text-xs font-semibold text-[#0f291e] dark:text-white">Almond Milk</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f5f9f6] dark:hover:bg-[#0c2b1e] transition-colors">
                <div className="w-4 h-4 rounded border-2 border-slate-300 dark:border-slate-600"></div>
                <span className="text-xs font-semibold text-[#0f291e] dark:text-white">Chicken Breasts</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f5f9f6] dark:hover:bg-[#0c2b1e] transition-colors">
                <div className="w-4 h-4 rounded border-2 border-slate-300 dark:border-slate-600"></div>
                <span className="text-xs font-semibold text-[#0f291e] dark:text-white">Brown Rice</span>
              </div>
            </div>
            
            <button className="w-full py-2 mt-2 rounded-xl border-2 border-[#e2ece5] dark:border-[#143d2b] text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-[#f5f9f6] dark:hover:bg-[#0e3b27] transition-all">
              View Full List
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
