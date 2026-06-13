import { useState } from "react";
import { ModalBase } from "./ModalBase";

interface AddDayModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (day: { date: string; title: string; location: string; description: string; activities: string[] }) => void;
}

export function AddDayModal({ open, onClose, onAdd }: AddDayModalProps) {
  const [form, setForm] = useState({ date: "", title: "", location: "", description: "", activities: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...form, activities: form.activities.split("\n").filter(Boolean) });
    setForm({ date: "", title: "", location: "", description: "", activities: "" });
    onClose();
  };

  return (
    <ModalBase open={open} onClose={onClose} title="Add New Day">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Date *</label>
            <input type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Location *</label>
            <input type="text" required placeholder="e.g. Kandy" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 block mb-1">Title *</label>
          <input type="text" required placeholder="e.g. Sacred City of Kandy" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 block mb-1">Description</label>
          <textarea rows={3} placeholder="What will you do this day?" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 block mb-1">Activities (one per line)</label>
          <textarea rows={4} placeholder={"Visit temple\nTry local food\nSunset hike"} value={form.activities} onChange={e => setForm(f => ({ ...f, activities: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="submit" className="flex-1 bg-primary text-white py-2.5 rounded-xl font-medium text-sm hover:bg-primary-600 transition-colors">Add Day</button>
        </div>
      </form>
    </ModalBase>
  );
}
