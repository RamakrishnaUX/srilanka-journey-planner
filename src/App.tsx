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
import { AmbientPlayer } from "./components/AmbientPlayer";
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
      <footer className="relative overflow-hidden text-center py-14"
        style={{ background: "linear-gradient(160deg, #0f2d16 0%, #1A5C2A 40%, #2C1810 100%)" }}>
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, #B8860B 30%, #C8550A 50%, #B8860B 70%, transparent)" }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <svg viewBox="0 0 400 400" width="300" height="300" fill="none">
            {[160,130,100,70,40].map(r=><circle key={r} cx="200" cy="200" r={r} stroke="#B8860B" strokeWidth="0.8"/>)}
            {Array.from({length:12}).map((_,i)=>{const a=i*30*Math.PI/180;return<line key={i} x1={200+40*Math.cos(a)} y1={200+40*Math.sin(a)} x2={200+160*Math.cos(a)} y2={200+160*Math.sin(a)} stroke="#B8860B" strokeWidth="0.5"/>})}
          </svg>
        </div>
        <div className="relative z-10">
          <p className="text-4xl mb-3">🇱🇰</p>
          <h2 className="font-display text-ivory text-xl mb-1 tracking-widest uppercase">Sri Lanka Journey Planner</h2>
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="h-px w-12" style={{ background: "linear-gradient(to right, transparent, rgba(184,134,11,0.6))" }} />
            <svg viewBox="0 0 20 8" width="20" height="8" fill="none">
              <path d="M10 1 L18 4 L10 7 L2 4 Z" stroke="#B8860B" strokeWidth="0.8" fill="rgba(184,134,11,0.2)"/>
            </svg>
            <div className="h-px w-12" style={{ background: "linear-gradient(to left, transparent, rgba(184,134,11,0.6))" }} />
          </div>
          <p className="text-ivory/40 font-body italic text-sm">Your memories, beautifully preserved</p>
        </div>
      </footer>

      <AmbientPlayer />
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
