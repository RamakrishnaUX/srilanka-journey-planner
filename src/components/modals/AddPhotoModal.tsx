import { useState } from "react";
import { ModalBase } from "./ModalBase";
import { fileToDataUrl } from "../../lib/utils";
import type { Day } from "../../types";
import { Upload, Link } from "lucide-react";

interface AddPhotoModalProps {
  open: boolean;
  onClose: () => void;
  days: Day[];
  defaultDayId?: string;
  onAdd: (photo: { url: string; caption: string; dayId?: string }) => void;
}

export function AddPhotoModal({ open, onClose, days, defaultDayId, onAdd }: AddPhotoModalProps) {
  const [mode, setMode] = useState<"url" | "file">("url");
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [dayId, setDayId] = useState(defaultDayId || "");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const data = await fileToDataUrl(file);
    setPreview(data);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = mode === "file" ? preview : url;
    if (!finalUrl) return;
    onAdd({ url: finalUrl, caption, dayId: dayId || undefined });
    setUrl(""); setCaption(""); setPreview(""); setDayId(defaultDayId || "");
    onClose();
  };

  return (
    <ModalBase open={open} onClose={onClose} title="Add Photo">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          {(["url", "file"] as const).map(m => (
            <button key={m} type="button" onClick={() => setMode(m)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${mode === m ? "bg-white text-primary shadow-sm" : "text-gray-500"}`}>
              {m === "url" ? <Link size={14} /> : <Upload size={14} />}
              {m === "url" ? "URL" : "Upload"}
            </button>
          ))}
        </div>

        {mode === "url" ? (
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Image URL *</label>
            <input type="url" required placeholder="https://..." value={url} onChange={e => setUrl(e.target.value)}
              style={{ border: "1px solid rgba(184,134,11,0.25)", background: "#FEFAF2", padding: "8px 12px", fontSize: "0.875rem", outline: "none", fontFamily: "Crimson Text, Georgia, serif", color: "#2C1810", width: "100%" }} />
            {url && <img src={url} alt="" className="mt-2 w-full h-36 object-cover rounded-xl" onError={e => (e.currentTarget.style.display = "none")} />}
          </div>
        ) : (
          <div>
            <label className="block w-full border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
              <Upload size={24} className="mx-auto mb-2 text-gray-400" />
              <span className="text-sm text-gray-500">Click to upload image</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>
            {loading && <p className="text-xs text-gray-400 text-center mt-2">Processing...</p>}
            {preview && <img src={preview} alt="" className="mt-2 w-full h-36 object-cover rounded-xl" />}
          </div>
        )}

        <div>
          <label className="text-xs font-medium text-gray-500 block mb-1">Caption</label>
          <input type="text" placeholder="Describe this memory..." value={caption} onChange={e => setCaption(e.target.value)}
            style={{ border: "1px solid rgba(184,134,11,0.25)", background: "#FEFAF2", padding: "8px 12px", fontSize: "0.875rem", outline: "none", fontFamily: "Crimson Text, Georgia, serif", color: "#2C1810", width: "100%" }} />
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

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="submit" className="flex-1 bg-gold text-white py-2.5 rounded-xl font-medium text-sm hover:bg-gold/90 transition-colors">Add Photo</button>
        </div>
      </form>
    </ModalBase>
  );
}
