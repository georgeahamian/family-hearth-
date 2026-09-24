import React from 'react';
import { useFamily } from '../../context/FamilyContext';
import { HeartPulse, Pill, CheckCircle2, Circle, AlertTriangle } from 'lucide-react';

export const HealthView: React.FC = () => {
  const { members, medications, toggleMedication } = useFamily();
  const takenCount = medications.filter(m => m.isTaken).length;

  const appointments = [
    { title: 'Dentist Cleaning', date: 'Oct 12 at 3:00 PM', member: 'LU', memberName: 'Lucas', note: 'Oak Valley Dental' },
    { title: 'Annual Physical', date: 'Nov 4 at 9:00 AM', member: 'SA', memberName: 'Sarah', note: 'Riverbrook Medical' },
    { title: 'Eye Exam', date: 'Nov 18 at 2:00 PM', member: 'MA', memberName: 'Maya', note: 'Clear Vision Optometry' },
  ];

  const allergyNotes = [
    { member: 'MA', memberName: 'Maya', allergy: 'Severe Peanut Allergy', action: 'EpiPen in kitchen & backpack' },
  ];

  const bloodTypes = [
    { member: 'SA', name: 'Sarah', type: 'A+' },
    { member: 'AL', name: 'Alex', type: 'O+' },
    { member: 'LU', name: 'Lucas', type: 'O+' },
    { member: 'MA', name: 'Maya', type: 'A+' },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">Health & Wellness</p>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">Medical Center</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Track daily medications, appointments, and important health info.</p>
      </div>

      {/* Meds Progress Banner */}
      <div className="hearth-card p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#d5ebe0] dark:bg-[#0e3b27] flex items-center justify-center flex-shrink-0">
          <Pill className="w-5 h-5 text-[#00b875] dark:text-[#34d399]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-bold text-[#0f291e] dark:text-white">Today's Medications</span>
            <span className="text-slate-500">{takenCount}/{medications.length} taken</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-[#00b875] dark:bg-[#34d399] rounded-full transition-all duration-500" style={{ width: medications.length > 0 ? `${(takenCount / medications.length) * 100}%` : '0%' }} />
          </div>
        </div>
        {takenCount === medications.length && medications.length > 0 && (
          <div className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-xs font-bold text-emerald-600 dark:text-emerald-400 flex-shrink-0">All done! ✓</div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* Appointments */}
          <div className="hearth-card p-4 sm:p-6 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 dark:bg-rose-900/10 rounded-bl-full pointer-events-none" />
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2 relative z-10">
              <HeartPulse className="w-4 h-4 text-rose-500" />
              <span>Upcoming Appointments</span>
            </h2>
            <div className="space-y-3 relative z-10">
              {appointments.map((appt, i) => (
                <div key={i} className="p-3 bg-white dark:bg-[#082117] rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#0f291e] dark:text-white">{appt.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{appt.date}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{appt.note}</p>
                    </div>
                    <div title={appt.memberName} className="w-7 h-7 rounded-full bg-[#d5ebe0] dark:bg-[#0e3b27] text-[#0f4a33] dark:text-[#34d399] font-bold text-[9px] flex items-center justify-center flex-shrink-0">{appt.member}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Allergy Alerts */}
          <div className="hearth-card p-4 sm:p-5 space-y-3 border border-rose-200 dark:border-rose-800/40 bg-rose-50 dark:bg-rose-900/10">
            <h2 className="text-sm font-bold text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Allergy Alerts</span>
            </h2>
            {allergyNotes.map(a => (
              <div key={a.member} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-rose-200 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 font-bold text-[9px] flex items-center justify-center flex-shrink-0">{a.member}</div>
                <div>
                  <p className="text-xs font-bold text-rose-700 dark:text-rose-300">{a.allergy}</p>
                  <p className="text-[10px] text-rose-600 dark:text-rose-400">{a.action}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Blood Types */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">🩸 Blood Types</h2>
            <div className="grid grid-cols-2 gap-2">
              {bloodTypes.map(b => (
                <div key={b.member} className="hearth-subcard p-2.5 rounded-xl flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#d5ebe0] dark:bg-[#0e3b27] text-[#0f4a33] dark:text-[#34d399] font-bold text-[9px] flex items-center justify-center">{b.member}</div>
                  <div>
                    <p className="text-[10px] text-slate-500">{b.name}</p>
                    <p className="text-xs font-black text-[#0f291e] dark:text-white">{b.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Medications */}
        <div className="lg:col-span-7 space-y-5">
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>Daily Medications</span>
            </h2>
            <div className="space-y-3">
              {medications.map((med) => {
                const member = members.find(m => m.id === med.memberId);
                return (
                  <div key={med.id} onClick={() => toggleMedication(med.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${med.isTaken ? 'bg-[#f8faf9] border-[#e2ece5] dark:bg-[#0c2b1e] dark:border-[#184732]' : 'bg-white border-slate-200 dark:bg-[#082117] dark:border-slate-700 hover:border-[#00b875]/50 dark:hover:border-[#34d399]/50 shadow-xs'}`}
                  >
                    <div className="flex items-center gap-3">
                      <button className={`flex-shrink-0 transition-colors ${med.isTaken ? 'text-[#00b875] dark:text-[#34d399]' : 'text-slate-300 dark:text-slate-600 group-hover:text-[#00b875]/50'}`}>
                        {med.isTaken ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                      </button>
                      <div>
                        <span className={`text-sm font-semibold flex items-center gap-2 ${med.isTaken ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-[#0f291e] dark:text-white'}`}>
                          {med.name}
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase no-underline">{med.dosage}</span>
                        </span>
                        <p className={`text-[10px] ${med.isTaken ? 'text-slate-400' : 'text-slate-500'}`}>{med.time}</p>
                      </div>
                    </div>
                    {member && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400">{member.name}</span>
                        <div className="w-6 h-6 rounded-full bg-[#d5ebe0] dark:bg-[#0e3b27] text-[#0f4a33] dark:text-[#34d399] font-bold text-[8px] flex items-center justify-center">{member.avatar}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Insurance Info */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">📋 Insurance & Providers</h2>
            <div className="space-y-2">
              {[
                { label: 'Health Insurance', value: 'BlueCross #MG-88421' },
                { label: 'Primary Pediatrician', value: 'Dr. Gomez • (555) 019-3344' },
                { label: 'Pharmacy', value: 'CVS on Main St • (555) 028-4411' },
              ].map(item => (
                <div key={item.label} className="hearth-subcard p-3 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{item.label}</span>
                  <span className="text-xs font-bold text-[#0f291e] dark:text-white text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
