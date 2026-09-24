import React, { useState } from 'react';
import { useFamily } from '../../context/FamilyContext';
import {
  GraduationCap,
  PenTool,
  Phone,
  Mail,
  Check,
  Shield,
  Copy,
  CheckCheck,
} from 'lucide-react';

interface SchoolViewProps {
  onOpenQuickAdd?: (type?: any) => void;
}

export const SchoolView: React.FC<SchoolViewProps> = () => {
  const {
    carpoolTrips,
    toggleCarpoolStatus,
    homeworkItems,
    toggleHomeworkStatus,
    permissionSlips,
    signPermissionSlip,
    directoryContacts,
    vaultCards,
    showToast,
  } = useFamily();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast(`Copied "${text}" to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">
      
      {/* 🌿 PAGE HEADER */}
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">
          School & Carpool HQ
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">
          School days, handled
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Coordinate every ride, deadline, signature, emergency info, and school contact.
        </p>
      </div>

      {/* 🌟 TWO COLUMNS: DISPATCH & HOMEWORK / SLIPS, DIRECTORY & VAULT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column (7 cols): Carpool dispatch & Homework */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Carpool dispatch card */}
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
                Carpool dispatch
              </h2>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#eaf2ed] dark:bg-[#0d3322] text-slate-600 dark:text-[#86efac]">
                Monday routes
              </span>
            </div>

            <div className="divide-y divide-[#eef4f0] dark:divide-[#123626]">
              {carpoolTrips.map((trip) => {
                const isCompleted = trip.status === 'Completed';

                return (
                  <div
                    key={trip.id}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 first:pt-1 last:pb-1"
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                      <span className="text-xs font-bold text-[#0f291e] dark:text-white w-14 flex-shrink-0">
                        {trip.time}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-[#0f291e] dark:text-white truncate">
                          {trip.title}
                        </h3>
                        <p className="text-[11px] text-slate-400 dark:text-slate-400 truncate">
                          {trip.details}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleCarpoolStatus(trip.id)}
                      className={`self-end sm:self-auto px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs flex-shrink-0 ${
                        isCompleted
                          ? 'border border-[#d6e5dc] dark:border-[#1b4a34] text-slate-600 dark:text-slate-300 bg-white dark:bg-transparent'
                          : 'bg-[#00b875] dark:bg-[#22c55e] hover:bg-[#00a368] dark:hover:bg-[#16a34a] text-white dark:text-black'
                      }`}
                    >
                      {trip.status}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Homework & exams card */}
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
              Homework & exams
            </h2>

            <div className="divide-y divide-[#eef4f0] dark:divide-[#123626]">
              {homeworkItems.map((item) => {
                const isUrgent = item.urgency === 'urgent';

                return (
                  <div
                    key={item.id}
                    onClick={() => toggleHomeworkStatus(item.id)}
                    className="py-3 flex items-center justify-between gap-3 cursor-pointer group first:pt-1 last:pb-1"
                  >
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                      <div className="text-[#00b875] dark:text-[#34d399] flex-shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h3
                          className={`text-xs font-bold truncate ${
                            item.isCompleted
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-[#0f291e] dark:text-white'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-slate-400 truncate">
                          {item.subject}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 sm:px-3 py-1 rounded-full flex-shrink-0 ${
                        isUrgent
                          ? 'bg-rose-100 dark:bg-[#3f1616] text-rose-500 dark:text-[#f87171]'
                          : item.dueDateLabel === 'This week'
                          ? 'bg-[#dcfce7] dark:bg-[#0e3323] text-[#14532d] dark:text-[#4ade80]'
                          : 'bg-[#eaf2ed] dark:bg-[#133326] text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {item.dueDateLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Permission slips, Emergency directory & Family Vault */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Permission slips card */}
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
              Permission slips
            </h2>

            <div className="space-y-3.5">
              {permissionSlips.map((slip) => (
                <div
                  key={slip.id}
                  className="hearth-subcard p-4 rounded-2xl space-y-3"
                >
                  <div>
                    <h3 className="text-xs font-bold text-[#0f291e] dark:text-white">
                      {slip.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {slip.subtext}
                    </p>
                  </div>

                  {slip.isSigned ? (
                    <div className="py-2 bg-emerald-50 dark:bg-[#0e3323] text-emerald-700 dark:text-[#4ade80] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-emerald-200 dark:border-[#1b4a34]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Signed by {slip.signedBy || 'Sarah'}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => signPermissionSlip(slip.id)}
                      className="w-full py-2 bg-[#00b875] dark:bg-[#22c55e] hover:bg-[#00a368] dark:hover:bg-[#16a34a] text-white dark:text-black text-xs font-bold rounded-xl transition-all shadow-sm shadow-emerald-600/20 active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>Sign now</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Emergency directory card */}
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
              Emergency directory
            </h2>

            <div className="space-y-3">
              {directoryContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="hearth-subcard p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <h3 className="text-xs font-bold text-[#0f291e] dark:text-white truncate">
                    {contact.name}
                  </h3>

                  <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#d6e5dc] dark:border-[#1b4a34] bg-white dark:bg-[#0a2318] text-slate-700 dark:text-slate-200 text-[11px] font-semibold hover:bg-slate-50 dark:hover:bg-[#113324] transition-colors shadow-xs"
                    >
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{contact.phone}</span>
                    </a>

                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="p-1.5 rounded-xl border border-[#d6e5dc] dark:border-[#1b4a34] bg-white dark:bg-[#0a2318] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#113324] transition-colors"
                        title={contact.email}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🔒 Family Vault & Safety Cards */}
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">
                Family Safety & Quick Vault
              </h2>
            </div>

            <div className="space-y-3">
              {vaultCards.map((card) => (
                <div
                  key={card.id}
                  className="hearth-subcard p-3 rounded-2xl flex flex-col justify-between space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{card.icon}</span>
                      <h4 className="text-xs font-bold text-[#0f291e] dark:text-white">
                        {card.title}
                      </h4>
                    </div>

                    {card.copyableText && (
                      <button
                        onClick={() => handleCopyText(card.id, card.copyableText!)}
                        className="flex items-center gap-1 text-[10px] font-bold text-[#008f5a] dark:text-[#34d399] bg-white dark:bg-[#082117] border border-[#d6e5dc] dark:border-[#1b4a34] px-2 py-0.5 rounded-lg hover:border-[#00b875]"
                      >
                        {copiedId === card.id ? (
                          <>
                            <CheckCheck className="w-3 h-3" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {card.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
