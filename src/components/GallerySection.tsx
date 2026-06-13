import { useState } from "react";
import { Plus, X, ZoomIn } from "lucide-react";
import type { Photo } from "../types";
import { SectionHeading, LotosDivider, MandalaBg } from "./Ornaments";

interface GallerySectionProps {
  photos: Photo[];
  onAddPhoto: () => void;
  onRemovePhoto: (id: string) => void;
}

export function GallerySection({ photos, onAddPhoto, onRemovePhoto }: GallerySectionProps) {
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  return (
    <section id="gallery" className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #EDE0C4 0%, #FDF6E8 100%)" }}>

      {/* Mandala BG right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-[0.05]">
        <MandalaBg size={500} opacity={1} />
      </div>

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <SectionHeading sub={`${photos.length} memories captured`}>Gallery of Memories</SectionHeading>

        <div className="flex justify-center mb-10">
          <button onClick={onAddPhoto} className="btn-gold flex items-center gap-2 rounded-sm">
            <Plus size={14} /> Add Photo
          </button>
        </div>

        {photos.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4 opacity-30">🪷</div>
            <p className="text-temple/40 font-display text-lg uppercase tracking-widest">No memories yet</p>
            <p className="text-temple/30 font-body italic text-sm mt-1">Begin adding photos to your journey</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {photos.map(photo => (
              <div key={photo.id} className="break-inside-avoid relative group overflow-hidden"
                style={{ border: "1px solid rgba(184,134,11,0.2)" }}>
                {/* Ornamental corner overlays */}
                <div className="absolute top-0 left-0 w-4 h-4 pointer-events-none z-10 opacity-70"
                  style={{ borderTop: "1.5px solid rgba(184,134,11,0.7)", borderLeft: "1.5px solid rgba(184,134,11,0.7)" }} />
                <div className="absolute top-0 right-0 w-4 h-4 pointer-events-none z-10 opacity-70"
                  style={{ borderTop: "1.5px solid rgba(184,134,11,0.7)", borderRight: "1.5px solid rgba(184,134,11,0.7)" }} />
                <div className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none z-10 opacity-70"
                  style={{ borderBottom: "1.5px solid rgba(184,134,11,0.7)", borderLeft: "1.5px solid rgba(184,134,11,0.7)" }} />
                <div className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none z-10 opacity-70"
                  style={{ borderBottom: "1.5px solid rgba(184,134,11,0.7)", borderRight: "1.5px solid rgba(184,134,11,0.7)" }} />

                <img src={photo.url} alt={photo.caption} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ background: "rgba(44,24,16,0.55)" }}>
                  <button onClick={() => setLightbox(photo)}
                    className="p-2 transition-colors"
                    style={{ background: "rgba(253,246,232,0.9)", border: "1px solid rgba(184,134,11,0.4)" }}>
                    <ZoomIn size={15} className="text-temple" />
                  </button>
                  <button onClick={() => onRemovePhoto(photo.id)}
                    className="p-2 transition-colors"
                    style={{ background: "rgba(123,28,28,0.85)", border: "1px solid rgba(123,28,28,0.6)" }}>
                    <X size={15} className="text-ivory" />
                  </button>
                </div>
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 py-2 px-3 text-ivory text-xs font-body italic opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "linear-gradient(to top, rgba(44,24,16,0.8), transparent)" }}>
                    {photo.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <LotosDivider className="mt-16" />
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,20,8,0.92)" }}
          onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 text-ivory/50 hover:text-ivory transition-colors p-2"
            onClick={() => setLightbox(null)}>
            <X size={24} />
          </button>
          <div onClick={e => e.stopPropagation()} className="max-w-4xl max-h-[85vh] relative">
            <div className="absolute inset-0 pointer-events-none"
              style={{ border: "1px solid rgba(184,134,11,0.35)", outline: "1px solid rgba(184,134,11,0.1)", outlineOffset: "6px" }} />
            <img src={lightbox.url} alt={lightbox.caption} className="max-h-[80vh] max-w-full object-contain" />
            {lightbox.caption && (
              <p className="text-ivory/60 text-sm text-center mt-3 font-body italic">{lightbox.caption}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
