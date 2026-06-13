import { Plus, Camera, Ticket, RotateCcw } from "lucide-react";

interface QuickActionsProps {
  onAddDay: () => void;
  onAddPhoto: () => void;
  onAddTicket: () => void;
  onReset: () => void;
}

export function QuickActions({ onAddDay, onAddPhoto, onAddTicket, onReset }: QuickActionsProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 items-end">
      <div className="flex flex-col gap-2 items-end">
        <button onClick={onAddDay}
          className="group flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-sm font-medium">
          <Plus size={16} /> Add Day
        </button>
        <button onClick={onAddPhoto}
          className="group flex items-center gap-2 bg-gold text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-sm font-medium">
          <Camera size={16} /> Add Photo
        </button>
        <button onClick={onAddTicket}
          className="group flex items-center gap-2 bg-ocean text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-sm font-medium">
          <Ticket size={16} /> Add Ticket
        </button>
        <button onClick={onReset}
          className="group flex items-center gap-2 bg-white text-gray-600 border border-gray-200 px-3 py-2 rounded-full shadow hover:shadow-md transition-all text-xs">
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
}
