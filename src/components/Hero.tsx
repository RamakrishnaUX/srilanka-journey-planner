import { ChevronDown, Calendar, MapPin, Sparkles } from "lucide-react";
import { MandalaBg } from "./Ornaments";

interface HeroProps {
  title: string;
  subtitle: string;
  totalDays: number;
  onScrollDown: () => void;
}

export function Hero({ title, subtitle, totalDays, onScrollDown }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Deep background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(160deg, #0f2d16 0%, #1A5C2A 40%, #2C1810 75%, #0a1a0d 100%)",
      }} />

      {/* Photo layer */}
      <div className="absolute inset-0 opacity-25" style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=80")`,
        backgroundSize: "cover", backgroundPosition: "center",
        mixBlendMode: "luminosity",
      }} />

      {/* Saffron gradient veil */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 60%, rgba(200,85,10,0.18) 0%, transparent 70%)",
      }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Mandala overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow pointer-events-none">
        <MandalaBg size={700} opacity={0.12} />
      </div>
      <div className="absolute top-10 right-10 pointer-events-none animate-float">
        <MandalaBg size={220} opacity={0.18} />
      </div>
      <div className="absolute bottom-20 left-10 pointer-events-none">
        <MandalaBg size={160} opacity={0.12} />
      </div>

      {/* Ornamental top border */}
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(to right, #0f2d16, #B8860B, #C8550A, #B8860B, #0f2d16)" }} />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl animate-fade-in">

        {/* Crown ornament */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-300/60" />
          <svg viewBox="0 0 60 24" width="60" height="24" fill="none">
            <path d="M30 2 L10 22 L20 14 L30 22 L40 14 L50 22 Z" stroke="#B8860B" strokeWidth="1" fill="rgba(184,134,11,0.2)"/>
            <circle cx="30" cy="14" r="3" fill="#B8860B" opacity="0.8"/>
            <circle cx="10" cy="22" r="2" fill="#B8860B" opacity="0.6"/>
            <circle cx="50" cy="22" r="2" fill="#B8860B" opacity="0.6"/>
          </svg>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-300/60" />
        </div>

        {/* Flag */}
        <div className="text-5xl mb-5 drop-shadow-lg">🇱🇰</div>

        <h1 className="font-display text-5xl md:text-7xl font-bold mb-2 leading-tight"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)", letterSpacing: "0.05em" }}>
          {title}
        </h1>

        {/* Gold ornamental underline */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gold-300/60" />
          <svg viewBox="0 0 32 8" width="32" height="8" fill="none">
            <path d="M2 4 Q8 0 16 4 Q24 8 30 4" stroke="#B8860B" strokeWidth="1.2" fill="none" />
          </svg>
          <div className="h-px w-12 bg-gold-300/60" />
        </div>

        <p className="text-lg md:text-xl text-ivory/80 mb-10 max-w-xl mx-auto font-body italic"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>{subtitle}</p>

        {/* Stat pillars — styled like temple columns */}
        <div className="flex flex-wrap items-center justify-center gap-5 mb-12">
          {[
            { icon: Calendar, label: "Days", value: totalDays },
            { icon: MapPin, label: "Destinations", value: "7+" },
            { icon: Sparkles, label: "Memories", value: "∞" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center px-6 py-4 relative"
              style={{
                background: "rgba(253,246,232,0.08)",
                border: "1px solid rgba(184,134,11,0.35)",
                backdropFilter: "blur(10px)",
                clipPath: "polygon(0 0, 100% 0, 100% 85%, 92% 100%, 8% 100%, 0 85%)",
              }}>
              {/* Temple column cap */}
              <div className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(to right, transparent, #B8860B, transparent)" }} />
              <Icon size={16} className="text-gold-300 mb-2 opacity-80" />
              <span className="text-2xl font-display font-bold text-ivory">{value}</span>
              <span className="text-[10px] text-ivory/60 uppercase tracking-widest mt-0.5 font-display">{label}</span>
            </div>
          ))}
        </div>

        <button onClick={onScrollDown}
          className="btn-gold inline-flex items-center gap-2.5 rounded-sm"
          style={{ clipPath: "polygon(0 0, 100% 0, 96% 100%, 4% 100%)" }}>
          <span>Explore the Journey</span>
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Ornamental bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: "linear-gradient(to right, transparent, #B8860B 30%, #C8550A 50%, #B8860B 70%, transparent)" }} />

      <button onClick={onScrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold-300/60 hover:text-gold-300 transition-colors animate-bounce">
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
