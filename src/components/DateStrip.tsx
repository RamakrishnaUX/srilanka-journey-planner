import { formatDate } from "../lib/utils";
import type { Day } from "../types";

interface DateStripProps {
  days: Day[];
  activeDay: string | null;
  onSelect: (id: string) => void;
}

export function DateStrip({ days, activeDay, onSelect }: DateStripProps) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-[56px] z-40 overflow-x-auto scrollbar-hide">
      <div className="flex gap-1 px-4 py-2 max-w-6xl mx-auto">
        {days.map((day, i) => (
          <button key={day.id} onClick={() => onSelect(day.id)}
            className={`flex flex-col items-center px-4 py-2 rounded-xl whitespace-nowrap transition-all text-sm min-w-[80px]
              ${activeDay === day.id
                ? "bg-primary text-white shadow-md"
                : "text-gray-600 hover:bg-primary/5 hover:text-primary"}`}>
            <span className="font-semibold">Day {i + 1}</span>
            <span className={`text-xs ${activeDay === day.id ? "text-white/70" : "text-gray-400"}`}>
              {formatDate(day.date).split(",")[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
