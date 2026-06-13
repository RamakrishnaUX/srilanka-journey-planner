import { Plus, Ticket, FileText, ExternalLink, Trash2, Plane, Hotel, Activity, Car } from "lucide-react";
import type { Ticket as TicketType } from "../types";

const typeIcon: Record<string, React.ReactNode> = {
  flight: <Plane size={16} />, hotel: <Hotel size={16} />,
  activity: <Activity size={16} />, transport: <Car size={16} />, other: <FileText size={16} />,
};

const typeBg: Record<string, string> = {
  flight: "bg-blue-50 text-blue-600", hotel: "bg-purple-50 text-purple-600",
  activity: "bg-green-50 text-green-600", transport: "bg-orange-50 text-orange-600", other: "bg-gray-50 text-gray-600",
};

interface TicketsSectionProps {
  tickets: TicketType[];
  onAddTicket: () => void;
  onViewTicket: (ticket: TicketType) => void;
  onRemoveTicket: (id: string) => void;
}

export function TicketsSection({ tickets, onAddTicket, onViewTicket, onRemoveTicket }: TicketsSectionProps) {
  return (
    <section id="tickets" className="py-16 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Travel Documents</h2>
            <p className="text-gray-500 mt-1">{tickets.length} documents saved</p>
          </div>
          <button onClick={onAddTicket}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-600 transition-colors shadow-sm">
            <Plus size={18} /> Add Document
          </button>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <Ticket size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-1">No documents yet</p>
            <p className="text-sm">Add flights, hotels, and activity bookings</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tickets.map(ticket => (
              <div key={ticket.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${typeBg[ticket.type] || typeBg.other}`}>
                    {typeIcon[ticket.type]} {ticket.type}
                  </span>
                  <button onClick={() => onRemoveTicket(ticket.id)} className="text-gray-300 hover:text-red-400 transition-colors p-1">
                    <Trash2 size={14} />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{ticket.name}</h3>
                {ticket.date && <p className="text-xs text-gray-400 mb-3">{ticket.date}</p>}
                {ticket.fileData && (
                  <button onClick={() => onViewTicket(ticket)}
                    className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline">
                    <ExternalLink size={13} /> View Document
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
