import type { Ticket } from "../../types";
import { ModalBase } from "./ModalBase";

interface GlobalTicketViewModalProps {
  open: boolean;
  onClose: () => void;
  ticket: Ticket | null;
}

export function GlobalTicketViewModal({ open, onClose, ticket }: GlobalTicketViewModalProps) {
  if (!ticket) return null;

  const isPdf = ticket.fileData?.startsWith("data:application/pdf");
  const isImage = ticket.fileData?.startsWith("data:image");

  return (
    <ModalBase open={open} onClose={onClose} title={ticket.name} size="xl">
      {ticket.fileData ? (
        isPdf ? (
          <iframe
            src={ticket.fileData}
            className="w-full rounded-xl border border-gray-100"
            style={{ height: "60vh" }}
            title={ticket.name}
          />
        ) : isImage ? (
          <img src={ticket.fileData} alt={ticket.name} className="w-full max-h-[60vh] object-contain rounded-xl" />
        ) : (
          <p className="text-gray-400 text-center py-8">Unsupported file type</p>
        )
      ) : (
        <p className="text-gray-400 text-center py-8">No document attached</p>
      )}
      {ticket.fileData && (
        <div className="mt-4 flex justify-end">
          <a href={ticket.fileData} download={ticket.fileName || ticket.name}
            className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            Download
          </a>
        </div>
      )}
    </ModalBase>
  );
}
