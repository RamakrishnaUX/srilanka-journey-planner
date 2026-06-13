import { Volume2, VolumeX, Music2 } from "lucide-react";
import { useAmbientMusic } from "../hooks/useAmbientMusic";
import { MandalaBg } from "./Ornaments";

export function AmbientPlayer() {
  const { playing, start, stop, volume, setVolume } = useAmbientMusic();

  return (
    <div className={`fixed bottom-6 left-6 z-40 transition-all duration-500`}>
      <div className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl shadow-temple border transition-all duration-300
        ${playing
          ? "bg-jade-700 border-gold-500/40 shadow-gold"
          : "bg-ivory border-gold-300/30"}`}>

        {/* Spinning mandala when playing */}
        {playing && (
          <div className="absolute -top-6 -right-6 opacity-40 animate-spin-slow pointer-events-none">
            <MandalaBg size={48} opacity={1} />
          </div>
        )}

        <button
          onClick={playing ? stop : start}
          title={playing ? "Pause ambient music" : "Play ambient music"}
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300
            ${playing
              ? "bg-gold-500 text-temple animate-pulse-gold"
              : "bg-jade-500/10 text-jade-500 hover:bg-jade-500/20"}`}>
          <Music2 size={16} />
        </button>

        <div className="flex flex-col gap-0.5">
          <span className={`text-xs font-display tracking-wider uppercase ${playing ? "text-ivory" : "text-temple/60"}`}>
            {playing ? "Ambient · Playing" : "Ambient Sounds"}
          </span>
          {playing && (
            <div className="flex items-center gap-1.5">
              <VolumeX size={10} className="text-gold-300" />
              <input
                type="range" min="0" max="1" step="0.05"
                value={volume}
                onChange={e => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 accent-gold-500 cursor-pointer"
              />
              <Volume2 size={10} className="text-gold-300" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
