import { Plus, FileText, ExternalLink, Trash2, Plane, Hotel, Activity, Car } from "lucide-react";
import type { Ticket as TicketType } from "../types";
import { SectionHeading, CornerOrnament } from "./Ornaments";

const typeIcon: Record<string, React.ReactNode> = {
  flight: <Plane size={13} />, hotel: <Hotel size={13} />,
  activity: <Activity size={13} />, transport: <Car size={13} />, other: <FileText size={13} />,
};

const typeStyle: Record<string, { color: string; bg: string }> = {
  flight:    { color: "#1B4F8A", bg: "rgba(27,79,138,0.08)" },
  hotel:     { color: "#6B2E8B", bg: "rgba(107,46,139,0.08)" },
  activity:  { color: "#1A5C2A", bg: "rgba(26,92,42,0.08)" },
  transport: { color: "#854D0E", bg: "rgba(133,77,14,0.08)" },
  other:     { color: "#44403C", bg: "rgba(68,64,60,0.08)" },
};

interface TicketsSectionProps {
  tickets: TicketType[];
  onAddTicket: () => void;
  onViewTicket: (ticket: TicketType) => void;
  onRemoveTicket: (id: string) => void;
}

export function TicketsSection({ tickets, onAddTicket, onViewTicket, onRemoveTicket }: TicketsSectionProps) {
  return (
    <section id="tickets" className="py-20 relative overflow-hidden" style={{ background: "#FDF6E8" }}>
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <SectionHeading sub={`${tickets.length} documents securely stored`}>Travel Scrolls</SectionHeading>

        <div className="flex justify-center mb-10">
          <button onClick={onAddTicket} className="btn-jade flex items-center gap-2 rounded-sm">
            <Plus size={14} /> Add Document
          </button>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4 opacity-25">📜</div>
            <p className="text-temple/40 font-display text-lg uppercase tracking-widest">No scrolls yet</p>
            <p className="text-temple/30 font-body italic text-sm mt-1">Add flights, hotels, and booking confirmations</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tickets.map(ticket => {
              const ts = typeStyle[ticket.type] || typeStyle.other;
              return (
                <div key={ticket.id} className="relative p-5 transition-all duration-200 hover:shadow-card group"
                  style={{ background: "#FEFAF2", border: "1px solid rgba(184,134,11,0.2)" }}>
                  {/* Corner ornaments */}
                  <CornerOrnament className="absolute top-0 left-0 opacity-40" />
                  <div className="absolute top-0 right-0 opacity-40" style={{ transform: "scaleX(-1)" }}>
                    <CornerOrnament />
                  </div>

                  {/* Accent top bar */}
                  <div className="absolute top-0 left-8 right-8 h-px"
                    style={{ background: "linear-gradient(to right, transparent, rgba(184,134,11,0.5), transparent)" }} />

                  <div className="flex items-start justify-between mb-3">
                    <span className="flex items-center gap-1.5 text-[10px] font-display tracking-widest uppercase px-2.5 py-1"
                      style={{ color: ts.color, background: ts.bg, border: `1px solid ${ts.color}22` }}>
                      {typeIcon[ticket.type]} {ticket.type}
                    </span>
                    <button onClick={() => onRemoveTicket(ticket.id)}
                      className="text-temple/20 hover:text-maroon-500 transition-colors p-1">
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <h3 className="font-display text-temple mb-1" style={{ fontSize: "0.95rem", letterSpacing: "0.02em" }}>{ticket.name}</h3>
                  {ticket.date && <p className="text-[11px] text-temple/40 font-body mb-3">{ticket.date}</p>}

                  {ticket.fileData && (
                    <button onClick={() => onViewTicket(ticket)}
                      className="flex items-center gap-1.5 text-[10px] font-display tracking-wider uppercase text-jade-600 hover:text-jade-700 transition-colors mt-2">
                      <ExternalLink size={11} /> View Document
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
