import React, { useState } from 'react';
import { X, Music, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface InstrumentMiniGameProps {
  onClose: () => void;
}

interface SoundNote {
  name: string;
  pinyin: string;
  freq: number;
  key: string;
}

export const InstrumentMiniGame: React.FC<InstrumentMiniGameProps> = ({ onClose }) => {
  const [activeInst, setActiveInst] = useState<'pipa' | 'konghou' | 'paixiao' | 'jiegu'>('pipa');
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; note: string }[]>([]);

  const notes: SoundNote[] = [
    { name: '宫', pinyin: 'Gōng (C4)', freq: 261.63, key: '1' },
    { name: '商', pinyin: 'Shāng (D4)', freq: 293.66, key: '2' },
    { name: '角', pinyin: 'Jiǎo (E4)', freq: 329.63, key: '3' },
    { name: '徵', pinyin: 'Zhǐ (G4)', freq: 392.0, key: '4' },
    { name: '羽', pinyin: 'Yǔ (A4)', freq: 440.0, key: '5' },
    { name: '高宫', pinyin: 'Gōng (C5)', freq: 523.25, key: '6' },
    { name: '高商', pinyin: 'Shāng (D5)', freq: 587.33, key: '7' },
  ];

  const handlePlayNote = (e: React.MouseEvent<HTMLButtonElement>, note: SoundNote) => {
    if (activeInst === 'jiegu') {
      audioSynth.playPluck(120, 0.15); // Drum tone
    } else if (activeInst === 'paixiao') {
      audioSynth.playChime(note.freq); // Flute tone
    } else {
      audioSynth.playPluck(note.freq, 1.2); // Plucked string
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y, note: note.name };
    setRipples((prev) => [...prev.slice(-6), newRipple]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3a352a]/60 backdrop-blur-sm animate-fade-in font-serif">
      <div className="relative w-full max-w-3xl bg-[#f4ece1] border-2 border-[#d9a047] rounded-sm shadow-2xl text-[#3a352a] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#d9a047]/50 bg-[#e8dfd1] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-sm bg-[#f4ece1] border border-[#d9a047] text-[#b84c3a]">
              <Music className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#b84c3a] uppercase tracking-widest">
                飞天乐舞 · 丝路五音古乐弹奏
              </h3>
              <p className="text-xs text-[#6e6454]">莫高窟第220窟复原管弦：宫、商、角、徵、羽</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] border border-[#d9a047] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Instrument Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'pipa', name: '五弦反弹琵琶', icon: '🪕' },
              { id: 'konghou', name: '西域竖箜篌', icon: '🎵' },
              { id: 'paixiao', name: '九管排箫', icon: '🪈' },
              { id: 'jiegu', name: '龟兹羯鼓', icon: '🥁' },
            ].map((inst) => (
              <button
                key={inst.id}
                onClick={() => setActiveInst(inst.id as any)}
                className={`p-3 rounded-sm border font-serif text-xs sm:text-sm font-bold transition flex items-center justify-center space-x-2 ${
                  activeInst === inst.id
                    ? 'bg-[#b84c3a] text-white border-[#d9a047] shadow-sm'
                    : 'bg-[#f4ece1] border-[#d9a047]/60 text-[#3a352a] hover:border-[#b84c3a]'
                }`}
              >
                <span>{inst.icon}</span>
                <span>{inst.name}</span>
              </button>
            ))}
          </div>

          {/* Musical Strings Pad */}
          <div className="relative p-8 rounded-sm bg-[#e8dfd1]/80 border border-[#d9a047] shadow-inner flex flex-col items-center justify-center min-h-[220px] overflow-hidden">
            {/* Visual String Lines */}
            <div className="absolute inset-0 flex justify-around pointer-events-none opacity-20">
              {notes.map((_, i) => (
                <div key={i} className="w-0.5 h-full bg-[#b84c3a]" />
              ))}
            </div>

            <p className="text-xs font-serif text-[#b84c3a] mb-6 flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#d9a047] animate-pulse" />
              点击下方五声阶键，弹奏唐代《霓裳羽衣》与西域胡旋余音：
            </p>

            {/* Note Keys */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 z-10">
              {notes.map((note) => (
                <button
                  key={note.name}
                  onClick={(e) => handlePlayNote(e, note)}
                  className="relative group px-4 py-6 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] border-2 border-[#d9a047] text-[#3a352a] shadow-sm transition-all duration-150 transform hover:-translate-y-1 active:translate-y-0.5 flex flex-col items-center min-w-[65px] sm:min-w-[80px]"
                >
                  <span className="text-xl font-serif font-black text-[#b84c3a] group-hover:scale-110 transition">
                    {note.name}
                  </span>
                  <span className="text-[10px] text-[#6e6454] font-mono mt-1">{note.pinyin}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#e8dfd1] border-t border-[#d9a047]/50 text-center text-xs text-[#6e6454] font-serif italic">
          唐白居易诗云：“大珠小珠落玉盘” · 西域遗韵今犹在
        </div>
      </div>
    </div>
  );
};
