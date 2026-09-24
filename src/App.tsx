import React, { useState } from 'react';
import { FamilyProvider, useFamily } from './context/FamilyContext';
import { Toast } from './components/common/Toast';
import { QuickAddModal } from './components/common/QuickAddModal';
import { DashboardView } from './components/dashboard/DashboardView';
import { ChoresView } from './components/chores/ChoresView';
import { ScheduleView } from './components/schedule/ScheduleView';
import { PurchasesView } from './components/purchases/PurchasesView';
import { SchoolView } from './components/school/SchoolView';
import { MealsView } from './components/meals/MealsView';
import { FinancesView } from './components/finances/FinancesView';
import { MemoriesView } from './components/memories/MemoriesView';
import { TravelView } from './components/travel/TravelView';
import { PetsView } from './components/pets/PetsView';
import { HealthView } from './components/health/HealthView';
import { HomeView } from './components/home/HomeView';
import { MediaView } from './components/media/MediaView';
import { SafetyView } from './components/safety/SafetyView';
import { GiftsView } from './components/gifts/GiftsView';
import type { TabType } from './types';
import {
  Users,
  Home,
  Trophy,
  Calendar as CalendarIcon,
  ShoppingBag,
  GraduationCap,
  UtensilsCrossed,
  Plus,
  Moon,
  Sun,
  RotateCcw,
  ChevronDown,
  Menu,
  X,
  PiggyBank,
  Image as ImageIcon,
  Plane,
  HeartPulse,
  PawPrint,
  Wrench,
  BookOpen,
  ShieldAlert,
  Gift,
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentMember,
    setCurrentMemberId,
    members,
    isDarkMode,
    toggleDarkMode,
    resetAllData,
  } = useFamily();

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickAddType, setQuickAddType] = useState<any>('chore');
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenQuickAdd = (type: any = 'chore') => {
    setQuickAddType(type);
    setIsQuickAddOpen(true);
  };

  const navItems: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Daily Pulse', icon: Home },
    { id: 'chores', label: 'Chores & Rewards', icon: Trophy },
    { id: 'schedule', label: 'Calendar', icon: CalendarIcon },
    { id: 'purchases', label: 'Purchases', icon: ShoppingBag },
    { id: 'meals', label: 'Meals & Kitchen', icon: UtensilsCrossed },
    { id: 'school', label: 'School & Carpool', icon: GraduationCap },
    { id: 'finances', label: 'Finances & Allowances', icon: PiggyBank },
    { id: 'memories', label: 'Family Memories', icon: ImageIcon },
    { id: 'travel', label: 'Travel & Vacation', icon: Plane },
    { id: 'pets', label: 'Pet Care', icon: PawPrint },
    { id: 'health', label: 'Health & Wellness', icon: HeartPulse },
    { id: 'home', label: 'Home & Vehicles', icon: Wrench },
    { id: 'media', label: 'Library & Media', icon: BookOpen },
    { id: 'safety', label: 'Safety & Emergency', icon: ShieldAlert },
    { id: 'gifts', label: 'Gifts & Wishlists', icon: Gift },
  ];

  const handleSelectTab = (id: TabType) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f2f7f4] dark:bg-[#04120b] text-[#0f291e] dark:text-[#f0fdf4] transition-colors duration-200 antialiased font-sans">
      
      {/* 📱 MOBILE OVERLAY BACKDROP */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 🌿 SIDEBAR (Permanent on Desktop, Drawer on Mobile) */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 min-w-[256px] flex flex-col justify-between p-5 border-r border-[#e2ece5] dark:border-[#103022] bg-[#f2f7f4] dark:bg-[#04120b] transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Brand & Navigation */}
        <div className="space-y-6">
          {/* Logo & Close button on mobile */}
          <div className="flex items-center justify-between">
            <div 
              onClick={() => handleSelectTab('dashboard')} 
              className="flex items-center gap-3 cursor-pointer select-none group"
            >
              <div className="w-9 h-9 rounded-2xl bg-[#00b875] dark:bg-[#10b981] flex items-center justify-center text-white shadow-sm shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h1 className="font-bold text-sm tracking-tight text-[#0f291e] dark:text-white leading-tight">
                  Family Hearth
                </h1>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  The Morgan family
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-150 text-left ${
                    isActive
                      ? 'bg-[#d8efe2] dark:bg-[#0e3b27] text-[#084c31] dark:text-[#34d399] font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-[#0f291e] dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-4 h-4 stroke-[2] ${isActive ? 'text-[#084c31] dark:text-[#34d399]' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar: Weekly Family Goal Widget */}
        <div className="bg-[#dcf0e5] dark:bg-[#092218] rounded-2xl p-3.5 border border-[#cee4d7] dark:border-[#143d2b] mt-6">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#2e6e4f] dark:text-[#34d399]">
            Weekly Family Goal
          </p>
          <p className="text-xs font-black text-[#0f291e] dark:text-white mt-0.5">
            22 of 30 quests
          </p>
          <div className="w-full h-1.5 bg-[#badccb] dark:bg-[#123626] rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-[#00b875] dark:bg-[#10b981] rounded-full transition-all duration-500" 
              style={{ width: `${(22 / 30) * 100}%` }}
            />
          </div>
        </div>

      </aside>

      {/* 🌟 MAIN CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto min-h-screen">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 bg-[#f2f7f4]/90 dark:bg-[#04120b]/90 backdrop-blur-md border-b border-[#e2ece5]/60 dark:border-[#103022]/60 lg:border-none">
          
          {/* Left: Mobile Hamburger + Member Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hamburger Button (Mobile Only) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-[#d6e5dc] dark:border-[#143d2b] bg-[#f2f7f4] dark:bg-[#092218] text-slate-700 dark:text-slate-200 shadow-xs active:scale-95 transition-transform"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Member Profile Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setIsMemberDropdownOpen(!isMemberDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-2xl border border-[#d6e5dc] dark:border-[#143d2b] bg-[#f2f7f4] dark:bg-[#092218] hover:bg-white dark:hover:bg-[#0e3122] transition-all text-xs font-semibold text-[#0f291e] dark:text-white shadow-xs"
              >
                <span className="w-5 h-5 rounded-full bg-[#d5ebe0] dark:bg-[#0e3b27] text-[#0f4a33] dark:text-[#34d399] font-bold text-[10px] flex items-center justify-center">
                  {currentMember.avatar}
                </span>
                <span className="truncate max-w-[80px] sm:max-w-none">{currentMember.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Member dropdown list */}
              {isMemberDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMemberDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#082117] shadow-xl border border-[#e2ece5] dark:border-[#143d2b] p-1.5 z-50 animate-fade-in">
                    <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Active View
                    </div>
                    {members.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          setCurrentMemberId(m.id);
                          setIsMemberDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                          currentMember.id === m.id
                            ? 'bg-[#d8efe2] dark:bg-[#0e3b27] text-[#084c31] dark:text-[#34d399]'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0e3122]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#d5ebe0] dark:bg-[#0e3b27] text-[#0f4a33] dark:text-[#34d399] font-bold text-[10px] flex items-center justify-center">
                            {m.avatar}
                          </span>
                          <span>{m.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 capitalize font-normal">{m.role}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Top Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* + Add Item Button */}
            <button
              onClick={() => handleOpenQuickAdd('chore')}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#00b875] dark:bg-[#10b981] hover:bg-[#00a368] dark:hover:bg-[#059669] text-white font-semibold text-xs shadow-sm shadow-emerald-600/20 active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="inline">Add item</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-xl text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Reset Demo Data Button */}
            <button
              onClick={() => {
                if (window.confirm('Reset all demo data to default Morgan family state?')) {
                  resetAllData();
                }
              }}
              className="p-1.5 rounded-xl text-slate-500 dark:text-slate-300 hover:text-[#00b875] dark:hover:text-[#10b981] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-6 pt-2 sm:pt-3">
          {activeTab === 'dashboard' && <DashboardView onOpenQuickAdd={handleOpenQuickAdd} />}
          {activeTab === 'chores' && <ChoresView onOpenQuickAdd={handleOpenQuickAdd} />}
          {activeTab === 'schedule' && <ScheduleView onOpenQuickAdd={handleOpenQuickAdd} />}
          {activeTab === 'purchases' && <PurchasesView onOpenQuickAdd={handleOpenQuickAdd} />}
          {activeTab === 'meals' && <MealsView onOpenQuickAdd={handleOpenQuickAdd} />}
          {activeTab === 'school' && <SchoolView onOpenQuickAdd={handleOpenQuickAdd} />}
          {activeTab === 'finances' && <FinancesView onOpenQuickAdd={handleOpenQuickAdd} />}
          {activeTab === 'memories' && <MemoriesView onOpenQuickAdd={handleOpenQuickAdd} />}
          {activeTab === 'travel' && <TravelView />}
          {activeTab === 'pets' && <PetsView />}
          {activeTab === 'health' && <HealthView />}
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'media' && <MediaView />}
          {activeTab === 'safety' && <SafetyView />}
          {activeTab === 'gifts' && <GiftsView />}
        </main>

      </div>

      {/* Quick Add Universal Modal */}
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        defaultType={quickAddType}
      />

      {/* Toast Notification */}
      <Toast />

    </div>
  );
};

export default function App() {
  return (
    <FamilyProvider>
      <MainLayout />
    </FamilyProvider>
  );
}
