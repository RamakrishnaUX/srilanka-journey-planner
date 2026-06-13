import { MapPin, Clock, Camera, Ticket, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import type { Day } from "../types";
import { formatDate } from "../lib/utils";
import { CornerOrnament } from "./Ornaments";

interface DayCardProps {
  day: Day;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onAddPhoto: () => void;
  onAddTicket: () => void;
  onViewMemories: () => void;
  onViewTickets: () => void;
  onRemove: () => void;
}

export function DayCard({
  day, index, expanded, onToggle,
  onAddPhoto, onAddTicket, onViewMemories, onViewTickets, onRemove
}: DayCardProps) {
  return (
    <div id={`day-${day.id}`}
      className="relative overflow-hidden transition-all duration-300"
      style={{
        background: expanded ? "#FDF6E8" : "#FEFAF2",
        border: "1px solid rgba(184,134,11,0.22)",
        boxShadow: expanded ? "0 4px 20px rgba(44,24,16,0.10), inset 0 0 0 1px rgba(184,134,11,0.06)" : "0 2px 8px rgba(44,24,16,0.06)",
      }}>

      {/* Corner ornaments */}
      <CornerOrnament className="absolute top-0 left-0 opacity-60" />
      <div className="absolute top-0 right-0 opacity-60" style={{ transform: "scaleX(-1)" }}>
        <CornerOrnament />
      </div>

      {/* Top accent */}
      <div className="absolute top-0 left-8 right-8 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(184,134,11,0.4), transparent)" }} />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-4">
          {/* Day number — temple pillar style */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 relative"
            style={{
              background: "linear-gradient(160deg, #1A5C2A, #0f2d16)",
              clipPath: "polygon(15% 0,85% 0,100% 15%,100% 85%,85% 100%,15% 100%,0 85%,0 15%)",
            }}>
            <span className="text-[8px] text-gold-300/70 font-display uppercase tracking-widest leading-none">Day</span>
            <span className="text-lg font-display font-bold text-ivory leading-none">{index + 1}</span>
          </div>

          <div>
            <h3 className="font-display text-lg text-temple" style={{ letterSpacing: "0.02em" }}>{day.title}</h3>
            <div className="flex items-center gap-3 text-xs text-temple/50 mt-0.5 font-body">
              <span className="flex items-center gap-1"><MapPin size={11} />{day.location}</span>
              <span className="flex items-center gap-1"><Clock size={11} />{formatDate(day.date)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {day.photos.length > 0 && (
            <span className="flex items-center gap-1 text-[10px] font-display tracking-wider uppercase px-2 py-0.5"
              style={{ background: "rgba(184,134,11,0.1)", color: "#956d09", border: "1px solid rgba(184,134,11,0.25)" }}>
              <Camera size={10} /> {day.photos.length}
            </span>
          )}
          {day.tickets.length > 0 && (
            <span className="flex items-center gap-1 text-[10px] font-display tracking-wider uppercase px-2 py-0.5"
              style={{ background: "rgba(26,92,42,0.1)", color: "#1A5C2A", border: "1px solid rgba(26,92,42,0.25)" }}>
              <Ticket size={10} /> {day.tickets.length}
            </span>
          )}
          {expanded
            ? <ChevronUp size={16} className="text-gold-500/60" />
            : <ChevronDown size={16} className="text-gold-500/60" />}
        </div>
      </div>

      {expanded && (
        <div className="px-6 pb-6">
          {/* Gold divider */}
          <div className="h-px mb-4"
            style={{ background: "linear-gradient(to right, transparent, rgba(184,134,11,0.3), transparent)" }} />

          <p className="text-temple/70 text-base font-body italic mb-5">{day.description}</p>

          {day.activities.length > 0 && (
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-display tracking-widest uppercase text-saffron-600/70">Activities</span>
                <div className="h-px flex-1" style={{ background: "linear-gradient(to right, rgba(184,134,11,0.3), transparent)" }} />
              </div>
              <ul className="space-y-2">
                {day.activities.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-temple/80 font-body">
                    {/* Lotus bullet */}
                    <svg viewBox="0 0 10 10" width="10" height="10" className="flex-shrink-0 mt-1.5">
                      <path d="M5 1 C3 1 1 3 1 5 C1 7 3 8 5 8 C7 8 9 7 9 5 C9 3 7 1 5 1Z" fill="rgba(184,134,11,0.5)" stroke="#B8860B" strokeWidth="0.5"/>
                      <circle cx="5" cy="5" r="1.5" fill="#B8860B" opacity="0.7"/>
                    </svg>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {day.photos.length > 0 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-4">
              {day.photos.slice(0, 5).map(photo => (
                <img key={photo.id} src={photo.url} alt={photo.caption}
                  className="w-20 h-20 object-cover flex-shrink-0"
                  style={{ border: "1px solid rgba(184,134,11,0.2)" }} />
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-1">
            {[
              { onClick: onAddPhoto, label: "Add Photo", icon: Camera, style: "gold" },
              { onClick: onAddTicket, label: "Add Ticket", icon: Ticket, style: "jade" },
            ].map(({ onClick, label, icon: Icon, style }) => (
              <button key={label} onClick={onClick}
                className={`flex items-center gap-1.5 text-[10px] font-display tracking-widest uppercase px-3 py-1.5 transition-all
                  ${style === "gold"
                    ? "text-gold-600 hover:bg-gold-50/60 border border-gold-300/40 hover:border-gold-300"
                    : "text-jade-600 hover:bg-jade-50/60 border border-jade-300/40 hover:border-jade-400"}`}>
                <Icon size={11} /> {label}
              </button>
            ))}
            {day.photos.length > 0 && (
              <button onClick={onViewMemories}
                className="flex items-center gap-1.5 text-[10px] font-display tracking-widest uppercase px-3 py-1.5 text-temple/50 hover:text-temple/80 border border-temple/10 hover:border-temple/25 transition-all">
                <Camera size={11} /> Memories
              </button>
            )}
            {day.tickets.length > 0 && (
              <button onClick={onViewTickets}
                className="flex items-center gap-1.5 text-[10px] font-display tracking-widest uppercase px-3 py-1.5 text-temple/50 hover:text-temple/80 border border-temple/10 hover:border-temple/25 transition-all">
                <Ticket size={11} /> Tickets
              </button>
            )}
            <button onClick={onRemove}
              className="ml-auto flex items-center gap-1 text-[10px] px-2 py-1.5 text-maroon-500/40 hover:text-maroon-500 hover:bg-maroon-50/40 transition-colors">
              <Trash2 size={11} />
            </button>
          </div>
        </div>
      )}

      {/* Bottom corner ornaments */}
      {expanded && <>
        <div className="absolute bottom-0 left-0 opacity-40" style={{ transform: "scaleY(-1)" }}>
          <CornerOrnament />
        </div>
        <div className="absolute bottom-0 right-0 opacity-40" style={{ transform: "scale(-1,-1)" }}>
          <CornerOrnament />
        </div>
      </>}
    </div>
  );
}
