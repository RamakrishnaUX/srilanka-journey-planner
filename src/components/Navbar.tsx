import { useState, useEffect } from "react";
import { MapPin, Ticket, Image, Music, Menu, X } from "lucide-react";

interface NavbarProps {
  onTicketsClick: () => void;
  onMusicClick: () => void;
}

export function Navbar({ onTicketsClick, onMusicClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLink = (scrolled: boolean) =>
    `flex items-center gap-1.5 px-3 py-1.5 text-xs font-display tracking-widest uppercase transition-all duration-200
    ${scrolled ? "text-temple/70 hover:text-jade-600 hover:bg-jade-50/60" : "text-ivory/80 hover:text-ivory hover:bg-white/8"}`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "glass-ivory shadow-temple" : "bg-transparent"}`}>
      {/* Top accent line */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, #B8860B 30%, #C8550A 50%, #B8860B 70%, transparent)" }} />
      )}

      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 group">
          <span className="text-xl">🇱🇰</span>
          <span className={`font-display text-base tracking-widest uppercase transition-colors
            ${scrolled ? "text-jade-600" : "text-ivory"}`}>
            Lanka Journey
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {[
            { label: "Itinerary", id: "itinerary", icon: MapPin },
            { label: "Gallery", id: "gallery", icon: Image },
          ].map(({ label, id, icon: Icon }) => (
            <button key={id} onClick={() => scrollTo(id)} className={navLink(scrolled)}>
              <Icon size={13} /> {label}
            </button>
          ))}
          <button onClick={onTicketsClick} className={navLink(scrolled)}>
            <Ticket size={13} /> Documents
          </button>

          {/* Gold separator */}
          <div className={`mx-2 h-4 w-px ${scrolled ? "bg-gold-300/50" : "bg-white/20"}`} />

          <button onClick={onMusicClick}
            className="flex items-center gap-1.5 btn-gold rounded-sm px-4 py-2 text-[10px]">
            <Music size={12} /> Music
          </button>
        </div>

        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen
            ? <X size={20} className={scrolled ? "text-temple" : "text-ivory"} />
            : <Menu size={20} className={scrolled ? "text-temple" : "text-ivory"} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass-ivory border-t border-gold-300/20 px-4 py-3 flex flex-col gap-1">
          {[
            { label: "Itinerary", id: "itinerary" },
            { label: "Gallery", id: "gallery" },
          ].map(({ label, id }) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="text-left px-3 py-2 text-xs font-display tracking-widest uppercase text-temple/70 hover:text-jade-600 hover:bg-jade-50/40 transition-colors">
              {label}
            </button>
          ))}
          <button onClick={() => { onTicketsClick(); setMenuOpen(false); }}
            className="text-left px-3 py-2 text-xs font-display tracking-widest uppercase text-temple/70 hover:text-jade-600 hover:bg-jade-50/40 transition-colors">
            Documents
          </button>
          <button onClick={() => { onMusicClick(); setMenuOpen(false); }}
            className="mt-1 btn-gold rounded-sm text-center">
            Music
          </button>
        </div>
      )}
    </nav>
  );
}
