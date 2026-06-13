export interface Day {
  id: string;
  date: string;
  title: string;
  location: string;
  description: string;
  activities: string[];
  photos: Photo[];
  tickets: Ticket[];
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  dayId?: string;
}

export interface Ticket {
  id: string;
  name: string;
  type: "flight" | "hotel" | "activity" | "transport" | "other";
  fileUrl?: string;
  fileData?: string;
  fileName?: string;
  dayId?: string;
  date?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
}

export interface AppData {
  days: Day[];
  photos: Photo[];
  tickets: Ticket[];
  playlist: MusicTrack[];
  tripTitle: string;
  tripSubtitle: string;
}
