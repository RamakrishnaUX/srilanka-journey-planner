import type { Day, Ticket } from "../../types";
import { ModalBase } from "./ModalBase";
import { ExternalLink, Ticket as TicketIcon } from "lucide-react";

interface DayTicketsViewModalProps {
  open: boolean;
  onClose: () => void;
  day: Day | null;
  onViewTicket: (ticket: Ticket) => void;
}

export function DayTicketsViewModal({ open, onClose, day, onViewTicket }: DayTicketsViewModalProps) {
  if (!day) return null;
  return (
    <ModalBase open={open} onClose={onClose} title={`Tickets — ${day.title}`}>
      {day.tickets.length === 0
        ? <p className="text-gray-400 text-center py-8">No tickets for this day</p>
        : <div className="space-y-3">
            {day.tickets.map(ticket => (
              <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <TicketIcon size={16} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{ticket.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{ticket.type}{ticket.date ? ` · ${ticket.date}` : ""}</p>
                  </div>
                </div>
                {ticket.fileData && (
                  <button onClick={() => onViewTicket(ticket)} className="text-primary hover:underline text-xs flex items-center gap-1">
                    <ExternalLink size={12} /> View
                  </button>
                )}
              </div>
            ))}
          </div>
      }
    </ModalBase>
  );
}
