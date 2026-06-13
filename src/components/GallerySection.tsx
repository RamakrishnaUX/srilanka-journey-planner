import { useState } from "react";
import { Plus, X, ZoomIn } from "lucide-react";
import type { Photo } from "../types";

interface GallerySectionProps {
  photos: Photo[];
  onAddPhoto: () => void;
  onRemovePhoto: (id: string) => void;
}

export function GallerySection({ photos, onAddPhoto, onRemovePhoto }: GallerySectionProps) {
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Gallery</h2>
            <p className="text-gray-500 mt-1">{photos.length} memories captured</p>
          </div>
          <button onClick={onAddPhoto}
            className="flex items-center gap-2 bg-gold text-white px-4 py-2 rounded-xl font-medium hover:bg-gold/90 transition-colors shadow-sm">
            <Plus size={18} /> Add Photo
          </button>
        </div>

        {photos.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-5xl mb-4">📷</div>
            <p className="text-lg font-medium mb-1">No photos yet</p>
            <p className="text-sm">Add your first memory</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {photos.map(photo => (
              <div key={photo.id} className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm">
                <img src={photo.url} alt={photo.caption} className="w-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => setLightbox(photo)}
                    className="bg-white/90 p-2 rounded-lg hover:bg-white transition-colors">
                    <ZoomIn size={16} className="text-gray-700" />
                  </button>
                  <button onClick={() => onRemovePhoto(photo.id)}
                    className="bg-red-500/90 p-2 rounded-lg hover:bg-red-500 transition-colors">
                    <X size={16} className="text-white" />
                  </button>
                </div>
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {photo.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white" onClick={() => setLightbox(null)}>
            <X size={28} />
          </button>
          <div onClick={e => e.stopPropagation()} className="max-w-4xl max-h-[85vh]">
            <img src={lightbox.url} alt={lightbox.caption} className="max-h-[80vh] max-w-full rounded-xl object-contain" />
            {lightbox.caption && <p className="text-white/70 text-sm text-center mt-3">{lightbox.caption}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
