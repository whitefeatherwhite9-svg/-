import React from 'react';
import { Compass, Sparkles, Scroll, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { heroMuralImg, apsarasAvatarImg } from '../data/dunhuangData';
import { audioSynth } from '../utils/audioSynth';

interface LandingHeroProps {
  onStartExplore: () => void;
  onOpenAIChat: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStartExplore, onOpenAIChat }) => {
  const handleStart = () => {
    audioSynth.playSuccessArpeggio();
    onStartExplore();
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex items-center justify-center overflow-hidden bg-[#f4ece1] text-[#3a352a]">
      {/* Background Hero Image with Blend Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroMuralImg}
          alt="Dunhuang Hero Mural"
          className="w-full h-full object-cover opacity-15 filter saturate-125 contrast-110 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4ece1] via-[#f4ece1]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(#d9a047_1px,transparent_1px)] [background-size:40px_40px] opacity-25" />
      </div>

      {/* Floating Sparkle Particles Simulation */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-[#d9a047] blur-sm animate-ping" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-[#2c5f78] blur-sm animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-[#b84c3a] blur-sm animate-ping" />
      </div>

      {/* Hero Central Content Card */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center">
        {/* Subtitle Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-sm bg-[#e8dfd1] border border-[#d9a047] text-[#b84c3a] text-xs sm:text-sm font-serif mb-6 shadow-sm uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-[#d9a047]" />
          <span>DUNHUANG HERITAGE PROJECT · 数字遗产与沉浸互动体验</span>
          <Sparkles className="w-4 h-4 text-[#d9a047]" />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-widest text-[#b84c3a] drop-shadow-sm mb-2 leading-tight uppercase">
          敦煌遗境
        </h1>
        <p className="text-lg sm:text-2xl font-serif text-[#3a352a] font-normal tracking-[0.3em] mb-8">
          守 望 千 年 的 碎 片
        </p>

        {/* Story Prelude Card */}
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-sm bg-[#f4ece1]/90 border border-[#d9a047] shadow-xl text-[#3a352a] text-sm sm:text-base leading-relaxed mb-10 text-left relative group">
          <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-[#b84c3a]" />
          <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-[#b84c3a]" />
          
          <div className="flex items-start space-x-4">
            <img
              src={apsarasAvatarImg}
              alt="NPC Avatar"
              className="w-14 h-14 rounded-full border border-[#d9a047] object-cover shadow-sm shrink-0 hidden sm:block"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="font-serif text-[#b84c3a] text-base font-bold mb-2 flex items-center gap-2 uppercase tracking-widest">
                <Scroll className="w-4 h-4 text-[#d9a047]" />
                【前瞻序曲·时空风暴】
              </p>
              <p className="text-[#3a352a]/90 text-xs sm:text-sm leading-relaxed font-serif">
                “数字化敦煌档案馆发生数据风暴，第257窟《九色鹿图》、第220窟《反弹琵琶图》等莫高窟核心壁画灵韵化为碎片散射于洞窟深处。九色鹿神兽沉睡，飞天彩带黯淡……
              </p>
              <p className="mt-2 text-[#b84c3a] text-xs sm:text-sm italic font-serif">
                尊贵的数字壁画修复师，请穿梭于北魏与盛唐洞窟之间，答对文化考问，收集壁画碎片，用数字笔触抹去岁月斑驳，唤醒神兽，还原千古传奇！”
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-[#b84c3a] hover:bg-[#a83b2a] text-white font-serif text-lg font-bold shadow-md border border-[#d9a047] transform hover:-translate-y-0.5 transition duration-200 flex items-center justify-center space-x-3 group uppercase tracking-widest"
          >
            <Compass className="w-5 h-5 text-[#d9a047] group-hover:rotate-45 transition duration-300" />
            <span>开启探索 · 进入莫高窟</span>
            <ArrowRight className="w-5 h-5 text-[#d9a047] group-hover:translate-x-1 transition duration-200" />
          </button>

          <button
            onClick={onOpenAIChat}
            className="w-full sm:w-auto px-6 py-4 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] font-serif text-sm border border-[#d9a047] transition flex items-center justify-center space-x-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#b84c3a]" />
            <span>对话AI九色鹿灵 (NPC指导)</span>
          </button>
        </div>

        {/* Highlights Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-[#6e6454] font-serif">
          <div className="p-3 rounded-sm bg-[#e8dfd1]/60 border border-[#d9a047]/40 flex items-center justify-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#2c5f78]" />
            <span>四座莫高窟经典洞窟</span>
          </div>
          <div className="p-3 rounded-sm bg-[#e8dfd1]/60 border border-[#d9a047]/40 flex items-center justify-center space-x-2">
            <Scroll className="w-4 h-4 text-[#d9a047]" />
            <span>沉浸问答与碎片采集</span>
          </div>
          <div className="p-3 rounded-sm bg-[#e8dfd1]/60 border border-[#d9a047]/40 flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#2c5f78]" />
            <span>数字画笔擦除斑驳</span>
          </div>
          <div className="p-3 rounded-sm bg-[#e8dfd1]/60 border border-[#d9a047]/40 flex items-center justify-center space-x-2">
            <Heart className="w-4 h-4 text-[#b84c3a]" />
            <span>生成专属通关印记文牒</span>
          </div>
        </div>
      </div>
    </div>
  );
};
