import type { Day } from "../types";
import { formatDate } from "../lib/utils";

interface DateStripProps {
  days: Day[];
  activeDay: string | null;
  onSelect: (id: string) => void;
}

export function DateStrip({ days, activeDay, onSelect }: DateStripProps) {
  return (
    <div className="sticky top-[56px] z-40 overflow-x-auto scrollbar-hide"
      style={{ background: "rgba(253,246,232,0.94)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(184,134,11,0.15)", borderTop: "1px solid rgba(184,134,11,0.1)" }}>
      <div className="flex gap-1 px-2 py-2">
        {days.map((day, i) => (
          <button key={day.id} onClick={() => onSelect(day.id)}
            className="flex flex-col items-center px-4 py-2 whitespace-nowrap transition-all min-w-[76px] relative"
            style={activeDay === day.id ? {
              background: "linear-gradient(160deg, #1A5C2A, #0f2d16)",
              color: "#FDF6E8",
              clipPath: "polygon(8% 0,92% 0,100% 12%,100% 88%,92% 100%,8% 100%,0 88%,0 12%)",
            } : { color: "rgba(44,24,16,0.55)" }}>
            <span className="text-[9px] font-display uppercase tracking-widest"
              style={{ color: activeDay === day.id ? "rgba(184,134,11,0.9)" : undefined }}>
              Day {i + 1}
            </span>
            <span className="text-xs font-body">{formatDate(day.date).split(",")[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
