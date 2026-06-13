import { useCallback, useEffect, useRef, useState } from "react";

/* Generates a calming oriental ambient soundscape using Web Audio API:
   - Low drone root note (temple-bell-tuned)
   - Soft harmonics / overtone pads
   - Periodic singing-bowl bell tones
   - Simple reverb convolution via delay network */

export function useAmbientMusic() {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.35);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const oscRefs = useRef<OscillatorNode[]>([]);

  const buildReverb = (ctx: AudioContext) => {
    const convolver = ctx.createConvolver();
    const len = ctx.sampleRate * 2.5;
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const ch = buf.getChannelData(c);
      for (let i = 0; i < len; i++) {
        ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.2);
      }
    }
    convolver.buffer = buf;
    return convolver;
  };

  const buildDrone = (ctx: AudioContext, masterGain: GainNode, reverb: ConvolverNode) => {
    // Root frequencies: A2(110Hz), E3(165Hz), A3(220Hz) — temple-bell tuning
    const notes = [110, 165, 220, 275, 330];
    const oscs: OscillatorNode[] = [];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = i < 2 ? "sine" : "triangle";
      osc.frequency.value = freq + (Math.random() - 0.5) * 0.3; // slight detune
      filter.type = "lowpass";
      filter.frequency.value = 600;
      filter.Q.value = 0.5;

      g.gain.value = i === 0 ? 0.28 : i === 1 ? 0.12 : 0.06 / (i);

      osc.connect(filter);
      filter.connect(g);
      g.connect(reverb);
      g.connect(masterGain);
      osc.start();
      oscs.push(osc);
    });

    // Slow LFO on root note amplitude for breathing effect
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.07; // ~7 second cycle
    lfoGain.gain.value = 0.06;
    lfo.connect(lfoGain);
    lfoGain.connect(oscs[0].frequency);
    lfo.start();
    oscs.push(lfo as unknown as OscillatorNode);

    return oscs;
  };

  const playBell = useCallback((ctx: AudioContext, masterGain: GainNode, reverb: ConvolverNode) => {
    // Singing bowl / temple bell tone
    const bellFreqs = [528, 639, 741, 852, 432, 396]; // solfeggio / harmonic
    const freq = bellFreqs[Math.floor(Math.random() * bellFreqs.length)];

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.998, ctx.currentTime + 4);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5);

    osc.connect(gainNode);
    gainNode.connect(reverb);
    gainNode.connect(masterGain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 5);
  }, []);

  const start = useCallback(() => {
    if (playing) return;
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = volume;
    gainRef.current = master;
    master.connect(ctx.destination);

    const reverb = buildReverb(ctx);
    reverb.connect(master);

    oscRefs.current = buildDrone(ctx, master, reverb);

    // First bell immediately, then every 8–18 seconds
    playBell(ctx, master, reverb);
    intervalRef.current = setInterval(() => {
      if (ctxRef.current?.state === "running") {
        playBell(ctx, master, reverb);
      }
    }, 8000 + Math.random() * 10000);

    setPlaying(true);
  }, [playing, volume, playBell]);

  const stop = useCallback(() => {
    oscRefs.current.forEach(o => { try { o.stop(); } catch {} });
    oscRefs.current = [];
    if (intervalRef.current) clearInterval(intervalRef.current);
    ctxRef.current?.close();
    ctxRef.current = null;
    setPlaying(false);
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (gainRef.current) gainRef.current.gain.value = v;
  }, []);

  useEffect(() => () => { stop(); }, [stop]);

  return { playing, start, stop, volume, setVolume };
}
