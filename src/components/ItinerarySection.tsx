import { useState } from "react";
import { Plus } from "lucide-react";
import type { Day } from "../types";
import { DayCard } from "./DayCard";
import { DateStrip } from "./DateStrip";

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
    <section id="itinerary" className="py-16 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Your Itinerary</h2>
            <p className="text-gray-500 mt-1">{days.length} days of adventure</p>
          </div>
          <button onClick={onAddDay}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-600 transition-colors shadow-sm">
            <Plus size={18} /> Add Day
          </button>
        </div>

        <DateStrip days={days} activeDay={activeDay} onSelect={handleSelect} />

        <div className="mt-6 space-y-4">
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
