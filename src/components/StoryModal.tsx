import React, { useState } from 'react';
import { CaveNode, HotspotPin } from '../types';
import { CAVE_HOTSPOTS } from '../data/dunhuangData';
import { X, BookOpen, Info, Award, Sparkles, CheckCircle } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface StoryModalProps {
  cave: CaveNode;
  onClose: () => void;
  onOpenPassport: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ cave, onClose, onOpenPassport }) => {
  const hotspots: HotspotPin[] = CAVE_HOTSPOTS[cave.id] || [];
  const [activePin, setActivePin] = useState<HotspotPin | null>(hotspots[0] || null);

  const handlePinClick = (pin: HotspotPin) => {
    audioSynth.playPluck(650, 0.3);
    setActivePin(pin);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3a352a]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#f4ece1] border-2 border-[#d9a047] rounded-sm shadow-2xl text-[#3a352a] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#d9a047]/50 bg-[#e8dfd1] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📜</span>
            <div>
              <span className="text-xs font-serif px-2 py-0.5 rounded-sm bg-[#f4ece1] text-[#b84c3a] border border-[#d9a047]">
                {cave.number} · {cave.era}
              </span>
              <h3 className="text-xl font-serif font-bold text-[#b84c3a] mt-0.5 uppercase tracking-widest">
                【{cave.name}】全景深度故事 & 艺术细节
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] border border-[#d9a047] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 font-serif">
          {/* Mural Canvas Viewer with Interactive Hotspots */}
          <div className="lg:col-span-2 space-y-3">
            <div className="relative w-full h-[320px] sm:h-[380px] rounded-none overflow-hidden border-2 border-[#d9a047] shadow-lg bg-[#3a352a] group">
              <img
                src={cave.restoredImage}
                alt={cave.name}
                className="w-full h-full object-cover saturate-125"
                referrerPolicy="no-referrer"
              />

              {/* Hotspot Pins Overlay */}
              {hotspots.map((pin) => (
                <button
                  key={pin.id}
                  onClick={() => handlePinClick(pin)}
                  style={{
                    left: `${pin.x}%`,
                    top: `${pin.y}%`,
                  }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border transition-all duration-300 shadow-md flex items-center justify-center ${
                    activePin?.id === pin.id
                      ? 'bg-[#b84c3a] border-white text-white scale-125 ring-2 ring-[#d9a047] z-30'
                      : 'bg-[#f4ece1] border-[#d9a047] text-[#b84c3a] hover:scale-110 z-20'
                  }`}
                  title={pin.title}
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </button>
              ))}

              <div className="absolute top-3 left-3 px-3 py-1 rounded-sm bg-[#f4ece1]/90 border border-[#d9a047] text-[11px] font-serif text-[#b84c3a]">
                点击壁画上的光芒标注探索隐秘故事 🔍
              </div>
            </div>

            {/* Cave Overview Text */}
            <div className="p-4 rounded-sm bg-[#e8dfd1]/60 border border-[#d9a047]/60 text-xs sm:text-sm text-[#3a352a] leading-relaxed font-serif">
              <p className="font-serif text-[#b84c3a] font-bold mb-1 uppercase tracking-wider">【艺术与历史价值】</p>
              <p>{cave.description}</p>
            </div>
          </div>

          {/* Right Column Details */}
          <div className="space-y-4 bg-[#e8dfd1]/50 p-5 rounded-sm border border-[#d9a047]/60 flex flex-col justify-between">
            {activePin ? (
              <div className="space-y-3 font-serif">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-sm bg-[#f4ece1] border border-[#d9a047] text-[#2c5f78] text-xs font-serif">
                  <Info className="w-3.5 h-3.5" />
                  <span>特写考证细节</span>
                </div>
                <h4 className="font-serif font-bold text-lg text-[#b84c3a] border-b border-[#d9a047]/50 pb-2">
                  {activePin.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#3a352a] leading-relaxed">
                  {activePin.content}
                </p>
              </div>
            ) : (
              <div className="text-[#6e6454] text-xs text-center py-8 font-serif">
                点击左侧壁画上的高亮粒子以解读故事细节。
              </div>
            )}

            {/* Achievement Seal Stamp */}
            <div className="pt-4 border-t border-[#d9a047]/50 space-y-3 font-serif">
              <div className="p-3 rounded-sm bg-[#f4ece1] border border-[#d9a047] flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#b84c3a] border-2 border-[#d9a047] flex items-center justify-center text-white font-serif font-bold text-lg shrink-0 shadow-sm">
                  印
                </div>
                <div className="text-xs">
                  <div className="font-serif font-bold text-[#b84c3a]">修宝印记已考印</div>
                  <div className="text-[#6e6454]">通关文牒已自动登载此窟成效</div>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenPassport();
                }}
                className="w-full py-2.5 rounded-sm bg-[#b84c3a] hover:bg-[#a83b2a] text-white font-serif font-bold text-xs shadow-sm transition flex items-center justify-center space-x-1.5 uppercase tracking-widest"
              >
                <BookOpen className="w-4 h-4 text-[#d9a047]" />
                <span>查看通关文牒印记</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
