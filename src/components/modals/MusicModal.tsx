import { Music, ExternalLink } from "lucide-react";
import { ModalBase } from "./ModalBase";

interface MusicModalProps {
  open: boolean;
  onClose: () => void;
}

const PLAYLISTS = [
  { name: "Sri Lanka Beats", artist: "Curated vibes for the journey", url: "https://open.spotify.com/search/sri%20lanka", icon: "🎵" },
  { name: "Island Sunrise", artist: "Ambient & chillout", url: "https://open.spotify.com/search/island%20sunrise%20ambient", icon: "🌅" },
  { name: "Tropical Vibes", artist: "Feel the warmth", url: "https://open.spotify.com/search/tropical%20vibes", icon: "🌴" },
  { name: "Ceylon Sounds", artist: "Traditional Sri Lankan music", url: "https://open.spotify.com/search/ceylon%20traditional", icon: "🎶" },
];

export function MusicModal({ open, onClose }: MusicModalProps) {
  return (
    <ModalBase open={open} onClose={onClose} title="Trip Playlist">
      <div className="space-y-3">
        <p className="text-sm text-gray-500 mb-4">Open these playlists on Spotify to set the mood for your Sri Lanka adventure.</p>
        {PLAYLISTS.map(track => (
          <a key={track.name} href={track.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-all group">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-xl">{track.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">{track.name}</p>
              <p className="text-xs text-gray-400 truncate">{track.artist}</p>
            </div>
            <ExternalLink size={14} className="text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
          </a>
        ))}
        <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100 flex items-center gap-3">
          <Music size={20} className="text-green-600" />
          <div>
            <p className="text-sm font-medium text-green-800">Spotify Integration</p>
            <p className="text-xs text-green-600">Links open Spotify search for the best results</p>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
