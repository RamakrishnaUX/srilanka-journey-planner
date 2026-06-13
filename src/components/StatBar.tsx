import { Camera, Ticket, Map, Sun } from "lucide-react";

interface StatBarProps {
  days: number;
  photos: number;
  tickets: number;
  locations: number;
}

export function StatBar({ days, photos, tickets, locations }: StatBarProps) {
  return (
    <div className="bg-primary text-white py-4">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Sun, label: "Days Planned", value: days },
          { icon: Map, label: "Locations", value: locations },
          { icon: Camera, label: "Photos", value: photos },
          { icon: Ticket, label: "Tickets", value: tickets },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <Icon size={20} className="text-gold" />
            </div>
            <div>
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-xs text-white/70">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
