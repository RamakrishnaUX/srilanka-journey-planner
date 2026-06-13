import { MapPin, Clock, Camera, Ticket, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import type { Day } from "../types";
import { formatDate } from "../lib/utils";

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
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div
        className="flex items-center justify-between p-5 cursor-pointer group"
        onClick={onToggle}>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex flex-col items-center justify-center">
            <span className="text-xs text-primary font-medium">Day</span>
            <span className="text-lg font-bold text-primary leading-none">{index + 1}</span>
          </div>
          <div>
            <h3 className="font-display font-semibold text-gray-900 text-lg">{day.title}</h3>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
              <span className="flex items-center gap-1"><MapPin size={13} />{day.location}</span>
              <span className="flex items-center gap-1"><Clock size={13} />{formatDate(day.date)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {day.photos.length > 0 && (
            <span className="flex items-center gap-1 text-xs bg-gold/10 text-gold-500 px-2 py-0.5 rounded-full font-medium">
              <Camera size={12} />{day.photos.length}
            </span>
          )}
          {day.tickets.length > 0 && (
            <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              <Ticket size={12} />{day.tickets.length}
            </span>
          )}
          {expanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-50">
          <p className="text-gray-600 text-sm mt-4 mb-4">{day.description}</p>

          {day.activities.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Activities</h4>
              <ul className="space-y-1.5">
                {day.activities.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Photo thumbnails */}
          {day.photos.length > 0 && (
            <div className="mb-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {day.photos.slice(0, 4).map(photo => (
                  <img key={photo.id} src={photo.url} alt={photo.caption}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            <button onClick={onAddPhoto}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gold/10 text-gold-500 hover:bg-gold/20 font-medium transition-colors">
              <Camera size={13} /> Add Photo
            </button>
            <button onClick={onAddTicket}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-medium transition-colors">
              <Ticket size={13} /> Add Ticket
            </button>
            {day.photos.length > 0 && (
              <button onClick={onViewMemories}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium transition-colors">
                <Camera size={13} /> View Memories
              </button>
            )}
            {day.tickets.length > 0 && (
              <button onClick={onViewTickets}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium transition-colors">
                <Ticket size={13} /> View Tickets
              </button>
            )}
            <button onClick={onRemove}
              className="ml-auto flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-red-400 hover:bg-red-50 font-medium transition-colors">
              <Trash2 size={13} /> Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
