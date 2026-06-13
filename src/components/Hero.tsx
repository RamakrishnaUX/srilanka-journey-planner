import { ChevronDown, Calendar, MapPin, Clock } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  totalDays: number;
  onScrollDown: () => void;
}

export function Hero({ title, subtitle, totalDays, onScrollDown }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary to-ocean">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url("https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=80")`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-5xl">🇱🇰</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 leading-tight drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto">{subtitle}</p>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          {[
            { icon: Calendar, label: "Days", value: totalDays },
            { icon: MapPin, label: "Destinations", value: "7+" },
            { icon: Clock, label: "Memories", value: "∞" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center glass px-6 py-3 rounded-2xl border border-white/20">
              <Icon size={18} className="text-gold mb-1" />
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-xs text-white/70">{label}</span>
            </div>
          ))}
        </div>

        <button onClick={onScrollDown}
          className="bg-gold hover:bg-gold/90 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
          Explore the Journey
        </button>
      </div>

      {/* Scroll indicator */}
      <button onClick={onScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce">
        <ChevronDown size={32} />
      </button>
    </section>
  );
}
