import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalBaseProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-2xl" };

export function ModalBase({ open, onClose, title, children, size = "md" }: ModalBaseProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(10,20,8,0.7)" }} onClick={onClose} />
      <div className={`relative w-full ${sizeMap[size]} max-h-[90vh] flex flex-col animate-slide-up`}
        style={{ background: "#FDF6E8", border: "1px solid rgba(184,134,11,0.3)", boxShadow: "0 20px 60px rgba(44,24,16,0.3)" }}>

        {/* Top ornamental bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(to right, transparent, #B8860B 30%, #C8550A 50%, #B8860B 70%, transparent)" }} />

        {/* Corner marks */}
        {[["top-0 left-0",""], ["top-0 right-0","scaleX(-1)"], ["bottom-0 left-0","scaleY(-1)"], ["bottom-0 right-0","scale(-1,-1)"]].map(([pos, t]) => (
          <div key={pos} className={`absolute ${pos} w-5 h-5 pointer-events-none`}
            style={{ transform: t, borderTop: "1.5px solid rgba(184,134,11,0.5)", borderLeft: "1.5px solid rgba(184,134,11,0.5)" }} />
        ))}

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(184,134,11,0.12)" }}>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-3 h-px bg-gold-500/60" />
              <svg viewBox="0 0 8 8" width="8" height="8" fill="none">
                <path d="M4 1 L7 4 L4 7 L1 4 Z" stroke="#B8860B" strokeWidth="0.8" fill="rgba(184,134,11,0.2)"/>
              </svg>
              <div className="w-3 h-px bg-gold-500/60" />
            </div>
            <h2 className="font-display text-temple" style={{ fontSize: "1rem", letterSpacing: "0.04em" }}>{title}</h2>
          </div>
          <button onClick={onClose}
            className="text-temple/30 hover:text-temple/70 p-1 transition-colors"
            style={{ border: "1px solid rgba(184,134,11,0.2)" }}>
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
