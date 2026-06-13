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
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-md" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 group">
          <span className="text-2xl">🇱🇰</span>
          <span className={`font-display font-semibold text-lg transition-colors ${scrolled ? "text-primary" : "text-white"}`}>
            Lanka Journey
          </span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { label: "Itinerary", id: "itinerary", icon: MapPin },
            { label: "Gallery", id: "gallery", icon: Image },
          ].map(({ label, id, icon: Icon }) => (
            <button key={id} onClick={() => scrollTo(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${scrolled ? "text-gray-700 hover:bg-primary/10 hover:text-primary" : "text-white/90 hover:text-white hover:bg-white/10"}`}>
              <Icon size={15} /> {label}
            </button>
          ))}
          <button onClick={onTicketsClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
              ${scrolled ? "text-gray-700 hover:bg-primary/10 hover:text-primary" : "text-white/90 hover:text-white hover:bg-white/10"}`}>
            <Ticket size={15} /> Tickets
          </button>
          <button onClick={onMusicClick}
            className="ml-2 flex items-center gap-1.5 bg-gold text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gold-500/90 transition-colors">
            <Music size={15} /> Music
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen
            ? <X size={22} className={scrolled ? "text-gray-800" : "text-white"} />
            : <Menu size={22} className={scrolled ? "text-gray-800" : "text-white"} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-white/20 px-4 py-3 flex flex-col gap-2">
          {["itinerary", "gallery"].map(id => (
            <button key={id} onClick={() => scrollTo(id)}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary capitalize">
              {id}
            </button>
          ))}
          <button onClick={() => { onTicketsClick(); setMenuOpen(false); }}
            className="text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary">
            Tickets
          </button>
          <button onClick={() => { onMusicClick(); setMenuOpen(false); }}
            className="text-left px-3 py-2 rounded-lg text-sm font-medium bg-gold text-white hover:bg-gold/90">
            Music
          </button>
        </div>
      )}
    </nav>
  );
}
