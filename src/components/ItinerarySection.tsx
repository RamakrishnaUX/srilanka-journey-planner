import { useState } from "react";
import { Plus } from "lucide-react";
import type { Day } from "../types";
import { DayCard } from "./DayCard";
import { DateStrip } from "./DateStrip";
import { SectionHeading, MandalaBg } from "./Ornaments";

interface ItinerarySectionProps {
  days: Day[];
  onAddDay: () => void;
  onRemoveDay: (id: string) => void;
  onAddPhoto: (dayId: string) => void;
  onAddTicket: (dayId: string) => void;
  onViewMemories: (day: Day) => void;
  onViewTickets: (day: Day) => void;
}

export function ItinerarySection({
  days, onAddDay, onRemoveDay, onAddPhoto, onAddTicket, onViewMemories, onViewTickets
}: ItinerarySectionProps) {
  const [expanded, setExpanded] = useState<string | null>(days[0]?.id ?? null);
  const [activeDay, setActiveDay] = useState<string | null>(days[0]?.id ?? null);

  const handleSelect = (id: string) => {
    setActiveDay(id);
    setExpanded(id);
    document.getElementById(`day-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="itinerary" className="py-20 relative overflow-hidden" style={{ background: "#FDF6E8" }}>
      {/* Background mandala */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-[0.04]">
        <MandalaBg size={500} opacity={1} />
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="flex items-start justify-between mb-10">
          <SectionHeading sub={`${days.length} sacred days of discovery`}>The Sacred Journey</SectionHeading>
        </div>

        <div className="flex justify-end mb-6">
          <button onClick={onAddDay}
            className="btn-jade flex items-center gap-2 rounded-sm">
            <Plus size={14} /> Add Day
          </button>
        </div>

        <DateStrip days={days} activeDay={activeDay} onSelect={handleSelect} />

        <div className="mt-6 space-y-3">
          {days.map((day, i) => (
            <DayCard
              key={day.id}
              day={day}
              index={i}
              expanded={expanded === day.id}
              onToggle={() => {
                setExpanded(expanded === day.id ? null : day.id);
                setActiveDay(day.id);
              }}
              onAddPhoto={() => onAddPhoto(day.id)}
              onAddTicket={() => onAddTicket(day.id)}
              onViewMemories={() => onViewMemories(day)}
              onViewTickets={() => onViewTickets(day)}
              onRemove={() => onRemoveDay(day.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
