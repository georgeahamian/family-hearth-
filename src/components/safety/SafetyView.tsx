import React from 'react';
import { useFamily } from '../../context/FamilyContext';
import { ShieldAlert, Phone, FileText, MapPin } from 'lucide-react';

export const SafetyView: React.FC = () => {
  const { emergencyContacts, safetyPlans } = useFamily();

  const meetingPoints = [
    { label: 'Primary', description: 'Big oak tree across from 14 Maple Dr.', icon: '🌳' },
    { label: 'Secondary', description: 'Johnson Park entrance (2 blocks north)', icon: '🏞️' },
  ];

  const importantDocs = [
    { title: 'Passports', location: 'Filing cabinet, 2nd drawer (Red folder)' },
    { title: 'Birth Certificates', location: 'Filing cabinet, 2nd drawer (Blue folder)' },
    { title: 'Insurance Cards', location: 'Wallet + dining room junk drawer' },
    { title: 'Social Security Cards', location: 'Home safe (code on last safety plan)' },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">Emergency & Safety</p>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">Safety Hub</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Quick access to emergency contacts and critical family plans.</p>
      </div>

      {/* Emergency Banner */}
      <div className="hearth-card p-4 border border-rose-300 dark:border-rose-800/40 bg-rose-50 dark:bg-rose-900/10 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-rose-500 text-white text-lg flex items-center justify-center flex-shrink-0 font-black">🆘</div>
        <div>
          <p className="text-sm font-black text-rose-700 dark:text-rose-300">In an emergency — call 911</p>
          <p className="text-xs text-rose-600 dark:text-rose-400">Home address: 14 Maple Drive, Riverside, CA 92501</p>
        </div>
        <a href="tel:911" className="ml-auto px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-xl hover:bg-rose-600 transition-colors flex-shrink-0">Call 911</a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Contacts Column */}
        <div className="space-y-5">
          <div className="hearth-card p-4 sm:p-6 space-y-4 border-l-4 border-l-rose-500">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-rose-500" />
              <span>Emergency Contacts</span>
            </h2>
            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="p-3 bg-white dark:bg-[#082117] rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-[#0f291e] dark:text-white">{contact.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{contact.relation}</p>
                  </div>
                  <a href={`tel:${contact.phone}`} className="text-sm font-bold text-rose-500 bg-rose-50 dark:bg-rose-900/20 px-3 py-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors">{contact.phone}</a>
                </div>
              ))}
            </div>
          </div>

          {/* Evacuation Meeting Points */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>Evacuation Meeting Points</span>
            </h2>
            <div className="space-y-3">
              {meetingPoints.map((point, i) => (
                <div key={i} className="p-3 bg-white dark:bg-[#082117] rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex gap-3 items-start">
                  <span className="text-2xl flex-shrink-0">{point.icon}</span>
                  <div>
                    <p className="text-[10px] font-bold text-[#00b875] dark:text-[#34d399] uppercase tracking-wide">{point.label} Meeting Point</p>
                    <p className="text-xs font-semibold text-[#0f291e] dark:text-white">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plans + Docs Column */}
        <div className="space-y-5">
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>Safety Plans & Info</span>
            </h2>
            <div className="space-y-3">
              {safetyPlans.map((plan) => (
                <div key={plan.id} className="p-3 bg-white dark:bg-[#082117] rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
                  <h4 className="text-sm font-bold text-[#0f291e] dark:text-white">{plan.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{plan.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Documents */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">📁 Important Documents</h2>
            <div className="space-y-2">
              {importantDocs.map((doc, i) => (
                <div key={i} className="hearth-subcard p-3 rounded-xl">
                  <p className="text-xs font-bold text-[#0f291e] dark:text-white">{doc.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{doc.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
