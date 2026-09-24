import React from 'react';
import { useFamily } from '../../context/FamilyContext';
import { Plane, MapPin, Calendar, CheckCircle2, Circle, Sun, Cloud, Wind } from 'lucide-react';

export const TravelView: React.FC = () => {
  const { members, trip, packingItems, togglePackingItem } = useFamily();
  const packedCount = packingItems.filter(i => i.isPacked).length;
  const progress = packingItems.length > 0 ? (packedCount / packingItems.length) * 100 : 0;

  const itinerary = [
    { day: 'Day 1', activity: 'Drive to Pine Lake & set up camp', icon: '🚗' },
    { day: 'Day 2', activity: 'Kayaking & campfire cookout', icon: '🛶' },
    { day: 'Day 3', activity: 'Hiking the Ridge Trail', icon: '🥾' },
    { day: 'Day 4', activity: 'Pack up & drive home', icon: '🏠' },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in w-full">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#00b875] dark:text-[#34d399]">Travel & Vacation</p>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0f291e] dark:text-white tracking-tight mt-0.5">Trip Planner</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Coordinate packing and itineraries for the whole family.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* Trip Hero Card */}
          <div className="hearth-card p-6 bg-gradient-to-br from-[#00b875] to-[#047857] text-white border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-tr-full pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider text-emerald-100">Next Trip</span>
                </div>
                <div className="px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full text-xs font-bold">{trip.countdownDays} Days Left</div>
              </div>
              <div>
                <h2 className="text-2xl font-black">{trip.destination}</h2>
                <div className="flex items-center gap-2 mt-2 text-emerald-50 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{trip.startDate} – {trip.endDate}</span>
                </div>
              </div>
              {/* Packing Progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-emerald-100">
                  <span>Packing progress</span>
                  <span>{packedCount}/{packingItems.length} items</span>
                </div>
                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Weather Card */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Forecast at Pine Lake</span>
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Thu', icon: <Sun className="w-5 h-5 text-amber-400" />, high: 74, low: 58 },
                { label: 'Fri', icon: <Cloud className="w-5 h-5 text-slate-400" />, high: 68, low: 55 },
                { label: 'Sat', icon: <Sun className="w-5 h-5 text-amber-400" />, high: 72, low: 56 },
                { label: 'Sun', icon: <Wind className="w-5 h-5 text-blue-400" />, high: 65, low: 52 },
              ].map(day => (
                <div key={day.label} className="hearth-subcard rounded-xl p-2 flex flex-col items-center gap-1">
                  <p className="text-[10px] font-bold text-slate-500">{day.label}</p>
                  {day.icon}
                  <p className="text-xs font-bold text-[#0f291e] dark:text-white">{day.high}°</p>
                  <p className="text-[10px] text-slate-400">{day.low}°</p>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div className="hearth-card p-4 sm:p-5 space-y-3">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>Itinerary</span>
            </h2>
            <div className="space-y-3">
              {itinerary.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#eaf2ed] dark:bg-[#0c2b1e] flex items-center justify-center text-sm flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-[10px] font-bold text-[#00b875] dark:text-[#34d399] uppercase tracking-wide">{item.day}</p>
                    <p className="text-xs font-semibold text-[#0f291e] dark:text-white">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Packing List */}
        <div className="lg:col-span-7 space-y-5">
          <div className="hearth-card p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0f291e] dark:text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00b875] dark:text-[#34d399]" />
              <span>Shared Packing List</span>
            </h2>
            <div className="space-y-3">
              {packingItems.map((item) => {
                const assignee = members.find(m => m.id === item.assigneeId);
                return (
                  <div key={item.id} onClick={() => togglePackingItem(item.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${item.isPacked ? 'bg-[#f8faf9] border-[#e2ece5] dark:bg-[#0c2b1e] dark:border-[#184732]' : 'bg-white border-slate-200 dark:bg-[#082117] dark:border-slate-700 hover:border-[#00b875]/50 dark:hover:border-[#34d399]/50 shadow-xs'}`}
                  >
                    <div className="flex items-center gap-3">
                      <button className={`flex-shrink-0 transition-colors ${item.isPacked ? 'text-[#00b875] dark:text-[#34d399]' : 'text-slate-300 dark:text-slate-600 group-hover:text-[#00b875]/50'}`}>
                        {item.isPacked ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                      </button>
                      <span className={`text-sm font-semibold transition-all ${item.isPacked ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-[#0f291e] dark:text-white'}`}>{item.name}</span>
                    </div>
                    {assignee && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400">{assignee.name}</span>
                        <div className="w-6 h-6 rounded-full bg-[#d5ebe0] dark:bg-[#0e3b27] text-[#0f4a33] dark:text-[#34d399] font-bold text-[8px] flex items-center justify-center">{assignee.avatar}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Packing Tips */}
          <div className="hearth-card p-4 sm:p-5 space-y-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
            <h2 className="text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
              💡 Camping Tips
            </h2>
            <div className="space-y-2">
              {['Check if the campsite allows fires before packing matches', 'Bring extra bug spray — Pine Lake has mosquitoes at dusk', 'Keep food in sealed containers to avoid wildlife visitors'].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold text-xs flex-shrink-0 mt-0.5">•</span>
                  <p className="text-xs text-amber-700 dark:text-amber-400">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
