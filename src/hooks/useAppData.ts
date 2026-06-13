import { useState, useCallback } from "react";
import type { AppData, Day, Photo, Ticket } from "../types";
import { presetItinerary } from "../data/presetItinerary";

const STORAGE_KEY = "srilanka-journey-planner";

function loadData(): AppData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return presetItinerary;
}

function saveData(data: AppData) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export function useAppData() {
  const [data, setData] = useState<AppData>(loadData);

  const update = useCallback((updater: (prev: AppData) => AppData) => {
    setData(prev => {
      const next = updater(prev);
      saveData(next);
      return next;
    });
  }, []);

  const addDay = useCallback((day: Omit<Day, "id" | "photos" | "tickets">) => {
    update(prev => ({
      ...prev,
      days: [...prev.days, { ...day, id: `day-${Date.now()}`, photos: [], tickets: [] }]
        .sort((a, b) => a.date.localeCompare(b.date)),
    }));
  }, [update]);

  const removeDay = useCallback((id: string) => {
    update(prev => ({ ...prev, days: prev.days.filter(d => d.id !== id) }));
  }, [update]);

  const addPhoto = useCallback((photo: Omit<Photo, "id">) => {
    const newPhoto: Photo = { ...photo, id: `photo-${Date.now()}` };
    update(prev => ({
      ...prev,
      photos: [...prev.photos, newPhoto],
      days: prev.days.map(d =>
        d.id === photo.dayId ? { ...d, photos: [...d.photos, newPhoto] } : d
      ),
    }));
  }, [update]);

  const removePhoto = useCallback((id: string) => {
    update(prev => ({
      ...prev,
      photos: prev.photos.filter(p => p.id !== id),
      days: prev.days.map(d => ({ ...d, photos: d.photos.filter(p => p.id !== id) })),
    }));
  }, [update]);

  const addTicket = useCallback((ticket: Omit<Ticket, "id">) => {
    const newTicket: Ticket = { ...ticket, id: `ticket-${Date.now()}` };
    update(prev => ({
      ...prev,
      tickets: [...prev.tickets, newTicket],
      days: prev.days.map(d =>
        d.id === ticket.dayId ? { ...d, tickets: [...d.tickets, newTicket] } : d
      ),
    }));
  }, [update]);

  const removeTicket = useCallback((id: string) => {
    update(prev => ({
      ...prev,
      tickets: prev.tickets.filter(t => t.id !== id),
      days: prev.days.map(d => ({ ...d, tickets: d.tickets.filter(t => t.id !== id) })),
    }));
  }, [update]);

  const resetData = useCallback(() => {
    saveData(presetItinerary);
    setData(presetItinerary);
  }, []);

  return { data, addDay, removeDay, addPhoto, removePhoto, addTicket, removeTicket, resetData };
}
