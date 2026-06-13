import { useState } from "react";
import "./index.css";
import { useAppData } from "./hooks/useAppData";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StatBar } from "./components/StatBar";
import { ItinerarySection } from "./components/ItinerarySection";
import { GallerySection } from "./components/GallerySection";
import { TicketsSection } from "./components/TicketsSection";
import { QuickActions } from "./components/QuickActions";
import { AddDayModal } from "./components/modals/AddDayModal";
import { AddPhotoModal } from "./components/modals/AddPhotoModal";
import { AddTicketModal } from "./components/modals/AddTicketModal";
import { DayMemoriesViewModal } from "./components/modals/DayMemoriesViewModal";
import { DayTicketsViewModal } from "./components/modals/DayTicketsViewModal";
import { GlobalTicketViewModal } from "./components/modals/GlobalTicketViewModal";
import { MusicModal } from "./components/modals/MusicModal";
import type { Day, Ticket } from "./types";

export default function App() {
  const { data, addDay, removeDay, addPhoto, removePhoto, addTicket, removeTicket, resetData } = useAppData();

  const [modal, setModal] = useState<{
    type: "addDay" | "addPhoto" | "addTicket" | "memories" | "dayTickets" | "viewTicket" | "music" | null;
    dayId?: string;
    day?: Day;
    ticket?: Ticket;
  }>({ type: null });

  const close = () => setModal({ type: null });

  const uniqueLocations = [...new Set(data.days.map(d => d.location))].length;

  return (
    <div className="min-h-screen">
      <Navbar
        onTicketsClick={() => document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" })}
        onMusicClick={() => setModal({ type: "music" })}
      />

      <Hero
        title={data.tripTitle}
        subtitle={data.tripSubtitle}
        totalDays={data.days.length}
        onScrollDown={() => document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" })}
      />

      <StatBar
        days={data.days.length}
        photos={data.photos.length}
        tickets={data.tickets.length}
        locations={uniqueLocations}
      />

      <ItinerarySection
        days={data.days}
        onAddDay={() => setModal({ type: "addDay" })}
        onRemoveDay={removeDay}
        onAddPhoto={id => setModal({ type: "addPhoto", dayId: id })}
        onAddTicket={id => setModal({ type: "addTicket", dayId: id })}
        onViewMemories={day => setModal({ type: "memories", day })}
        onViewTickets={day => setModal({ type: "dayTickets", day })}
      />

      <GallerySection
        photos={data.photos}
        onAddPhoto={() => setModal({ type: "addPhoto" })}
        onRemovePhoto={removePhoto}
      />

      <TicketsSection
        tickets={data.tickets}
        onAddTicket={() => setModal({ type: "addTicket" })}
        onViewTicket={ticket => setModal({ type: "viewTicket", ticket })}
        onRemoveTicket={removeTicket}
      />

      {/* Footer */}
      <footer className="bg-primary-700 text-white/70 text-center py-8 text-sm">
        <p className="text-2xl mb-2">🇱🇰</p>
        <p className="font-display text-white font-semibold text-lg mb-1">Sri Lanka Journey Planner</p>
        <p>Your memories, beautifully organised</p>
      </footer>

      <QuickActions
        onAddDay={() => setModal({ type: "addDay" })}
        onAddPhoto={() => setModal({ type: "addPhoto" })}
        onAddTicket={() => setModal({ type: "addTicket" })}
        onReset={() => { if (confirm("Reset to sample itinerary?")) resetData(); }}
      />

      {/* Modals */}
      <AddDayModal open={modal.type === "addDay"} onClose={close} onAdd={addDay} />
      <AddPhotoModal open={modal.type === "addPhoto"} onClose={close} days={data.days} defaultDayId={modal.dayId} onAdd={addPhoto} />
      <AddTicketModal open={modal.type === "addTicket"} onClose={close} days={data.days} defaultDayId={modal.dayId} onAdd={addTicket} />
      <DayMemoriesViewModal open={modal.type === "memories"} onClose={close} day={modal.day ?? null} />
      <DayTicketsViewModal open={modal.type === "dayTickets"} onClose={close} day={modal.day ?? null}
        onViewTicket={ticket => setModal({ type: "viewTicket", ticket })} />
      <GlobalTicketViewModal open={modal.type === "viewTicket"} onClose={close} ticket={modal.ticket ?? null} />
      <MusicModal open={modal.type === "music"} onClose={close} />
    </div>
  );
}
