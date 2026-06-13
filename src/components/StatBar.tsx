import { Camera, Ticket, Map, Sun } from "lucide-react";

interface StatBarProps {
  days: number;
  photos: number;
  tickets: number;
  locations: number;
}

export function StatBar({ days, photos, tickets, locations }: StatBarProps) {
  const stats = [
    { icon: Sun, label: "Days Planned", value: days, glyph: "☀" },
    { icon: Map, label: "Locations", value: locations, glyph: "◈" },
    { icon: Camera, label: "Memories", value: photos, glyph: "◉" },
    { icon: Ticket, label: "Documents", value: tickets, glyph: "❖" },
  ];
  return (
    <div className="relative overflow-hidden" style={{
      background: "linear-gradient(135deg, #0f2d16 0%, #1A5C2A 50%, #154a22 100%)",
    }}>
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #B8860B 30%, #C8550A 50%, #B8860B 70%, transparent)" }} />

      {/* Subtle mandala */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 200" width="160" height="160" fill="none">
          {[80,60,40,20].map(r => <circle key={r} cx="100" cy="100" r={r} stroke="#B8860B" strokeWidth="1"/>)}
          {Array.from({length:8}).map((_,i)=>{
            const a=(i*45)*Math.PI/180;
            return <line key={i} x1={100+20*Math.cos(a)} y1={100+20*Math.sin(a)} x2={100+80*Math.cos(a)} y2={100+80*Math.sin(a)} stroke="#B8860B" strokeWidth="0.8"/>
          })}
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-5 grid grid-cols-2 md:grid-cols-4">
        {stats.map(({ icon: Icon, label, value, glyph }, i) => (
          <div key={label} className={`flex items-center gap-4 py-3 px-4 ${i < 3 ? "md:border-r border-gold-500/15" : ""}`}>
            {/* Temple-column styled icon */}
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 flex items-center justify-center"
                style={{ border: "1px solid rgba(184,134,11,0.4)", background: "rgba(184,134,11,0.08)", clipPath: "polygon(15% 0,85% 0,100% 15%,100% 85%,85% 100%,15% 100%,0 85%,0 15%)" }}>
                <Icon size={18} className="text-gold-300" />
              </div>
              <span className="absolute -top-1 -right-1 text-[8px] text-gold-300/60">{glyph}</span>
            </div>
            <div>
              <div className="text-2xl font-display text-ivory" style={{ letterSpacing: "0.04em" }}>{value}</div>
              <div className="text-[10px] text-ivory/50 uppercase tracking-widest font-display">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #B8860B 30%, #C8550A 50%, #B8860B 70%, transparent)" }} />
    </div>
  );
}
