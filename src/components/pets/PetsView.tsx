import React from 'react';
import { useFamily } from '../../context/FamilyContext';
import { Bone, CheckCircle2, Circle, Calendar, Info } from 'lucide-react';

export const PetsView: React.FC = () => {
  const { members, pets, petTasks, togglePetTask } = useFamily();
  const doneCount = petTasks.filter(t => t.isDone).length;

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">Pet Care</p>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">Furry Friends</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Daily care tracking for the family pets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Pet Profiles */}
        <div className="lg:col-span-5 space-y-5">
          {pets.map(pet => (
            <div key={pet.id} className="hearth-card p-6 flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00b875]/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="w-24 h-24 rounded-full bg-[#eaf2ed] dark:bg-[#0c2b1e] text-5xl flex items-center justify-center shadow-inner relative z-10 border-4 border-white dark:border-[#082117]">{pet.avatar}</div>
              <div className="space-y-1 relative z-10">
                <h2 className="text-2xl font-black text-[#0f291e] dark:text-white">{pet.name}</h2>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{pet.type}</p>
                <div className="inline-block mt-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs font-bold">🍗 {pet.diet}</div>
              </div>
              {/* Daily progress */}
              <div className="w-full relative z-10 space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Today's tasks</span>
                  <span>{doneCount}/{petTasks.length} done</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00b875] dark:bg-[#34d399] rounded-full transition-all duration-500" style={{ width: `${(doneCount / petTasks.length) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}

          {/* Vet Info */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>Upcoming Vet Visits</span>
            </h2>
            <div className="p-3 bg-white dark:bg-[#082117] rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
              <h4 className="text-xs font-bold text-[#0f291e] dark:text-white">Annual Checkup & Vaccines</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Oct 28 • Dr. Patel at Oak Valley Animal Clinic</p>
              <p className="text-[10px] text-[#00b875] dark:text-[#34d399] font-bold mt-1">(555) 039-7701</p>
            </div>
          </div>

          {/* Pet Info */}
          <div className="hearth-card p-4 sm:p-5 space-y-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30">
            <h2 className="text-sm font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>Pepper's Notes</span>
            </h2>
            <div className="space-y-1.5 text-xs text-blue-700 dark:text-blue-400">
              <p>• No grapes, raisins, or chocolate</p>
              <p>• Currently on flea & tick prevention (monthly)</p>
              <p>• Loves belly rubs, hates thunder</p>
            </div>
          </div>
        </div>

        {/* Right Column: Daily Tracker */}
        <div className="lg:col-span-7 space-y-5">
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <Bone className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>Today's Care Plan</span>
            </h2>
            <div className="space-y-3">
              {petTasks.map((task) => {
                const assignee = members.find(m => m.id === task.assignedToId);
                return (
                  <div key={task.id} onClick={() => togglePetTask(task.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${task.isDone ? 'bg-[#f8faf9] border-[#e2ece5] dark:bg-[#0c2b1e] dark:border-[#184732]' : 'bg-white border-slate-200 dark:bg-[#082117] dark:border-slate-700 hover:border-[#00b875]/50 dark:hover:border-[#34d399]/50 shadow-xs'}`}
                  >
                    <div className="flex items-center gap-3">
                      <button className={`flex-shrink-0 transition-colors ${task.isDone ? 'text-[#00b875] dark:text-[#34d399]' : 'text-slate-300 dark:text-slate-600 group-hover:text-[#00b875]/50'}`}>
                        {task.isDone ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                      </button>
                      <div>
                        <span className={`text-sm font-semibold transition-all ${task.isDone ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-[#0f291e] dark:text-white'}`}>{task.title}</span>
                        <p className={`text-[10px] ${task.isDone ? 'text-slate-400' : 'text-slate-500'}`}>{task.time}</p>
                      </div>
                    </div>
                    {assignee ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400">{assignee.name}</span>
                        <div className="w-6 h-6 rounded-full bg-[#d5ebe0] dark:bg-[#0e3b27] text-[#0f4a33] dark:text-[#34d399] font-bold text-[8px] flex items-center justify-center">{assignee.avatar}</div>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">Unassigned</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Facts */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">🐾 Quick Facts</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Breed', value: 'Labrador Retriever' },
                { label: 'Age', value: '3 years old' },
                { label: 'Weight', value: '62 lbs' },
                { label: 'Microchip', value: '#9847561234' },
              ].map(f => (
                <div key={f.label} className="hearth-subcard p-3 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{f.label}</p>
                  <p className="text-xs font-bold text-[#0f291e] dark:text-white mt-0.5">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
