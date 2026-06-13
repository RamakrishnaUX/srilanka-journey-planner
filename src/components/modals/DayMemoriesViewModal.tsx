import { X, ZoomIn } from "lucide-react";
import { useState } from "react";
import type { Day, Photo } from "../../types";
import { ModalBase } from "./ModalBase";

interface DayMemoriesViewModalProps {
  open: boolean;
  onClose: () => void;
  day: Day | null;
}

export function DayMemoriesViewModal({ open, onClose, day }: DayMemoriesViewModalProps) {
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  if (!day) return null;
  return (
    <>
      <ModalBase open={open} onClose={onClose} title={`Memories — ${day.title}`} size="lg">
        {day.photos.length === 0
          ? <p className="text-gray-400 text-center py-8">No photos for this day yet</p>
          : <div className="grid grid-cols-2 gap-3">
              {day.photos.map(photo => (
                <div key={photo.id} className="relative group rounded-xl overflow-hidden">
                  <img src={photo.url} alt={photo.caption} className="w-full h-36 object-cover" />
                  <button onClick={() => setLightbox(photo)}
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ZoomIn size={22} className="text-white" />
                  </button>
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 text-white text-xs p-2">{photo.caption}</div>
                  )}
                </div>
              ))}
            </div>
        }
      </ModalBase>

      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white"><X size={28} /></button>
          <img src={lightbox.url} alt={lightbox.caption} className="max-h-[85vh] max-w-full rounded-xl object-contain" />
        </div>
      )}
    </>
  );
}
