import React from 'react';
import { useFamily } from '../../context/FamilyContext';
import { Wrench, Car, Home as HomeIcon, CheckCircle2, Circle, AlertTriangle, Lightbulb } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { maintenanceTasks, toggleMaintenanceTask } = useFamily();

  const seasonalChecks = [
    { task: 'Inspect roof for winter damage', category: 'home', isDue: true },
    { task: 'Drain & store garden hoses', category: 'home', isDue: false },
    { task: 'Check tire pressure (cold weather drop)', category: 'vehicle', isDue: true },
    { task: 'Schedule furnace inspection', category: 'home', isDue: true },
  ];

  const homeTasks = maintenanceTasks.filter(t => t.category === 'home');
  const vehicleTasks = maintenanceTasks.filter(t => t.category === 'vehicle');

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">Home Maintenance & Vehicles</p>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">House & Garage</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Stay on top of repairs, filter changes, and vehicle maintenance.</p>
      </div>

      {/* Overdue Alert */}
      {maintenanceTasks.some(t => !t.isCompleted) && (
        <div className="hearth-card p-4 border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-900/10 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold">
            {maintenanceTasks.filter(t => !t.isCompleted).length} maintenance {maintenanceTasks.filter(t => !t.isCompleted).length === 1 ? 'task' : 'tasks'} still pending — tap to mark complete.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* House Column */}
        <div className="space-y-5">
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <HomeIcon className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>House Upkeep</span>
            </h2>
            <div className="space-y-3">
              {homeTasks.map((task) => (
                <div key={task.id} onClick={() => toggleMaintenanceTask(task.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${task.isCompleted ? 'bg-[#f8faf9] border-[#e2ece5] dark:bg-[#0c2b1e] dark:border-[#184732]' : 'bg-white border-slate-200 dark:bg-[#082117] dark:border-slate-700 hover:border-[#00b875]/50 dark:hover:border-[#34d399]/50 shadow-xs'}`}
                >
                  <div className="flex items-center gap-3">
                    <button className={`flex-shrink-0 transition-colors ${task.isCompleted ? 'text-[#00b875] dark:text-[#34d399]' : 'text-slate-300 dark:text-slate-600 group-hover:text-[#00b875]/50'}`}>
                      {task.isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </button>
                    <div>
                      <span className={`text-sm font-semibold ${task.isCompleted ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-[#0f291e] dark:text-white'}`}>{task.title}</span>
                      <p className={`text-[10px] ${task.isCompleted ? 'text-slate-400' : 'text-slate-500'}`}>Due: {task.dueDate} • {task.frequency}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Card */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Fall Home Prep Tips</span>
            </h2>
            <div className="space-y-2">
              {['Seal any gaps around doors and windows before winter', 'Test smoke & CO detectors and replace batteries', 'Clean gutters to prevent ice dams from forming'].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold text-xs flex-shrink-0 mt-0.5">•</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vehicles Column */}
        <div className="space-y-5">
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <Car className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>Vehicles</span>
            </h2>
            <div className="space-y-3">
              {vehicleTasks.map((task) => (
                <div key={task.id} onClick={() => toggleMaintenanceTask(task.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${task.isCompleted ? 'bg-[#f8faf9] border-[#e2ece5] dark:bg-[#0c2b1e] dark:border-[#184732]' : 'bg-white border-slate-200 dark:bg-[#082117] dark:border-slate-700 hover:border-[#00b875]/50 dark:hover:border-[#34d399]/50 shadow-xs'}`}
                >
                  <div className="flex items-center gap-3">
                    <button className={`flex-shrink-0 transition-colors ${task.isCompleted ? 'text-[#00b875] dark:text-[#34d399]' : 'text-slate-300 dark:text-slate-600 group-hover:text-[#00b875]/50'}`}>
                      {task.isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </button>
                    <div>
                      <span className={`text-sm font-semibold ${task.isCompleted ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-[#0f291e] dark:text-white'}`}>{task.title}</span>
                      <p className={`text-[10px] ${task.isCompleted ? 'text-slate-400' : 'text-slate-500'}`}>Due: {task.dueDate} • {task.frequency}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">🚗 Vehicle Registry</h2>
            <div className="space-y-3">
              {[
                { name: '2022 Honda Odyssey', plate: 'CA 8MTR492', mileage: '34,200 mi', color: 'Pearl White' },
                { name: '2019 Toyota Camry', plate: 'CA 5XYZ881', mileage: '61,400 mi', color: 'Midnight Blue' },
              ].map((v, i) => (
                <div key={i} className="hearth-subcard p-3 rounded-xl">
                  <p className="text-xs font-bold text-[#0f291e] dark:text-white">{v.name}</p>
                  <div className="flex gap-3 mt-1 text-[10px] text-slate-500">
                    <span>🔖 {v.plate}</span>
                    <span>📍 {v.mileage}</span>
                    <span>🎨 {v.color}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seasonal */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white">🍂 Seasonal Checklist</h2>
            <div className="space-y-2">
              {seasonalChecks.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${s.isDue ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-emerald-100 dark:bg-emerald-900/30'}`}>
                    <span className="text-[8px]">{s.isDue ? '⚠️' : '✓'}</span>
                  </div>
                  <p className={`text-xs ${s.isDue ? 'text-[#0f291e] dark:text-white font-semibold' : 'text-slate-400 line-through'}`}>{s.task}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
