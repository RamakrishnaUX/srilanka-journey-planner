/* Reusable ornamental SVG decorations */

export function LotosDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-300/60" />
      <svg viewBox="0 0 80 32" width="80" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 4 C30 4 20 12 20 20 C20 28 30 30 40 30 C50 30 60 28 60 20 C60 12 50 4 40 4Z" fill="rgba(184,134,11,0.15)" stroke="#B8860B" strokeWidth="0.8"/>
        <path d="M40 8 C33 8 26 14 26 20 C26 26 33 27 40 27 C47 27 54 26 54 20 C54 14 47 8 40 8Z" fill="rgba(184,134,11,0.1)" stroke="#B8860B" strokeWidth="0.6"/>
        <circle cx="40" cy="20" r="3" fill="#B8860B" opacity="0.7"/>
        <path d="M10 20 Q20 10 40 20 Q20 30 10 20Z" fill="rgba(184,134,11,0.2)" stroke="#B8860B" strokeWidth="0.6"/>
        <path d="M70 20 Q60 10 40 20 Q60 30 70 20Z" fill="rgba(184,134,11,0.2)" stroke="#B8860B" strokeWidth="0.6"/>
        <circle cx="6" cy="20" r="2" fill="#B8860B" opacity="0.5"/>
        <circle cx="74" cy="20" r="2" fill="#B8860B" opacity="0.5"/>
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-300/60" />
    </div>
  );
}

export function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2 2 L2 18 Q2 2 18 2Z" stroke="#B8860B" strokeWidth="1" opacity="0.5" fill="rgba(184,134,11,0.05)"/>
      <path d="M2 2 L10 2 Q2 2 2 10Z" stroke="#B8860B" strokeWidth="1" opacity="0.8" fill="rgba(184,134,11,0.1)"/>
      <circle cx="2" cy="2" r="2" fill="#B8860B" opacity="0.6"/>
      <path d="M8 2 Q5 5 2 8" stroke="#B8860B" strokeWidth="0.8" opacity="0.5"/>
      <path d="M14 2 Q8 8 2 14" stroke="#B8860B" strokeWidth="0.6" opacity="0.3"/>
    </svg>
  );
}

export function MandalaBg({ size = 400, opacity = 0.06 }: { size?: number; opacity?: number }) {
  return (
    <svg viewBox="0 0 400 400" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}>
      {[180, 160, 140, 120, 100, 80, 60, 40].map((r, i) => (
        <circle key={r} cx="200" cy="200" r={r} stroke="#B8860B" strokeWidth={i % 2 === 0 ? "0.8" : "0.4"} strokeDasharray={i % 3 === 0 ? "4 4" : ""}/>
      ))}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const x1 = 200 + 40 * Math.cos(rad), y1 = 200 + 40 * Math.sin(rad);
        const x2 = 200 + 180 * Math.cos(rad), y2 = 200 + 180 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B8860B" strokeWidth="0.4" />;
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        const rad = (angle * Math.PI) / 180;
        const cx = 200 + 110 * Math.cos(rad), cy = 200 + 110 * Math.sin(rad);
        return <circle key={i} cx={cx} cy={cy} r="8" stroke="#B8860B" strokeWidth="0.6" fill="rgba(184,134,11,0.05)"/>;
      })}
      <circle cx="200" cy="200" r="12" stroke="#B8860B" strokeWidth="1" fill="rgba(184,134,11,0.15)"/>
      <circle cx="200" cy="200" r="4" fill="rgba(184,134,11,0.4)"/>
    </svg>
  );
}

export function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/50" />
        <svg viewBox="0 0 24 12" width="24" height="12" fill="none">
          <path d="M12 1 L20 6 L12 11 L4 6 Z" stroke="#B8860B" strokeWidth="0.8" fill="rgba(184,134,11,0.15)"/>
        </svg>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/50" />
      </div>
      <h2 className="text-3xl md:text-4xl font-display text-temple">{children}</h2>
      {sub && <p className="text-saffron-600/80 mt-2 font-body italic text-base">{sub}</p>}
      <LotosDivider className="mt-4" />
    </div>
  );
}
