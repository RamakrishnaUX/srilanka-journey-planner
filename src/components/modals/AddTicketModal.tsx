import { useState } from "react";
import { ModalBase } from "./ModalBase";
import { fileToDataUrl } from "../../lib/utils";
import type { Day, Ticket } from "../../types";
import { Upload } from "lucide-react";

interface AddTicketModalProps {
  open: boolean;
  onClose: () => void;
  days: Day[];
  defaultDayId?: string;
  onAdd: (ticket: Omit<Ticket, "id">) => void;
}

export function AddTicketModal({ open, onClose, days, defaultDayId, onAdd }: AddTicketModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<Ticket["type"]>("flight");
  const [date, setDate] = useState("");
  const [dayId, setDayId] = useState(defaultDayId || "");
  const [fileData, setFileData] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setFileName(file.name);
    const data = await fileToDataUrl(file);
    setFileData(data);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, type, date, dayId: dayId || undefined, fileData: fileData || undefined, fileName: fileName || undefined });
    setName(""); setType("flight"); setDate(""); setDayId(defaultDayId || ""); setFileData(""); setFileName("");
    onClose();
  };

  return (
    <ModalBase open={open} onClose={onClose} title="Add Travel Document">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-gray-500 block mb-1">Document Name *</label>
          <input type="text" required placeholder="e.g. Colombo → Ella Flight" value={name} onChange={e => setName(e.target.value)}
            style={{ border: "1px solid rgba(184,134,11,0.25)", background: "#FEFAF2", padding: "8px 12px", fontSize: "0.875rem", outline: "none", fontFamily: "Crimson Text, Georgia, serif", color: "#2C1810", width: "100%" }} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Type</label>
            <select value={type} onChange={e => setType(e.target.value as Ticket["type"])}
              style={{ border: "1px solid rgba(184,134,11,0.25)", background: "#FEFAF2", padding: "8px 12px", fontSize: "0.875rem", outline: "none", fontFamily: "Crimson Text, Georgia, serif", color: "#2C1810", width: "100%" }}>
              {["flight", "hotel", "activity", "transport", "other"].map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              style={{ border: "1px solid rgba(184,134,11,0.25)", background: "#FEFAF2", padding: "8px 12px", fontSize: "0.875rem", outline: "none", fontFamily: "Crimson Text, Georgia, serif", color: "#2C1810", width: "100%" }} />
          </div>
        </div>
        {days.length > 0 && (
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Link to day (optional)</label>
            <select value={dayId} onChange={e => setDayId(e.target.value)}
              style={{ border: "1px solid rgba(184,134,11,0.25)", background: "#FEFAF2", padding: "8px 12px", fontSize: "0.875rem", outline: "none", fontFamily: "Crimson Text, Georgia, serif", color: "#2C1810", width: "100%" }}>
              <option value="">No specific day</option>
              {days.map((d, i) => <option key={d.id} value={d.id}>Day {i + 1} — {d.title}</option>)}
            </select>
          </div>
        )}
        <div>
          <label className="block w-full border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-primary/50 transition-colors">
            <Upload size={20} className="mx-auto mb-1.5 text-gray-400" />
            <span className="text-sm text-gray-500 block">Upload PDF or image (optional)</span>
            {fileName && <span className="text-xs text-primary mt-1 block">{fileName}</span>}
            {loading && <span className="text-xs text-gray-400 mt-1 block">Loading...</span>}
            <input type="file" accept=".pdf,image/*" className="hidden" onChange={handleFile} />
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="submit" className="flex-1 bg-primary text-white py-2.5 rounded-xl font-medium text-sm hover:bg-primary-600 transition-colors">Save Document</button>
        </div>
      </form>
    </ModalBase>
  );
}
