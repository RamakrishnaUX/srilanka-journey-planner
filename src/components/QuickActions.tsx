import { useState } from "react";
import { Plus, Camera, Ticket, RotateCcw, ChevronUp } from "lucide-react";

interface QuickActionsProps {
  onAddDay: () => void;
  onAddPhoto: () => void;
  onAddTicket: () => void;
  onReset: () => void;
}

export function QuickActions({ onAddDay, onAddPhoto, onAddTicket, onReset }: QuickActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 items-end">
      {open && (
        <div className="flex flex-col gap-2 items-end animate-slide-up">
          {[
            { onClick: onAddDay,    label: "Add Day",    icon: Plus,   style: "jade" },
            { onClick: onAddPhoto,  label: "Add Photo",  icon: Camera, style: "gold" },
            { onClick: onAddTicket, label: "Add Ticket", icon: Ticket, style: "jade" },
          ].map(({ onClick, label, icon: Icon, style }) => (
            <button key={label} onClick={onClick}
              className={`flex items-center gap-2 px-4 py-2.5 shadow-temple transition-all hover:-translate-y-0.5 text-[11px] font-display tracking-widest uppercase ${style === "gold" ? "btn-gold" : "btn-jade"} rounded-sm`}>
              <Icon size={13} /> {label}
            </button>
          ))}
          <button onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-display tracking-widest uppercase text-temple/50 hover:text-temple/80 transition-colors"
            style={{ background: "rgba(253,246,232,0.9)", border: "1px solid rgba(184,134,11,0.2)" }}>
            <RotateCcw size={11} /> Reset
          </button>
        </div>
      )}

      {/* Toggle button — lotus shape */}
      <button onClick={() => setOpen(!open)}
        className="w-12 h-12 flex items-center justify-center shadow-temple transition-all hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(160deg, #B8860B, #D4A017)",
          clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
        }}>
        {open
          ? <ChevronUp size={16} className="text-temple" />
          : <Plus size={18} className="text-temple" />}
      </button>
    </div>
  );
}
