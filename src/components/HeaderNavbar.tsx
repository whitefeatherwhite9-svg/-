import React from 'react';
import { Volume2, VolumeX, Music, Sparkles, BookOpen, Compass, Award, Palette, RotateCcw } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface HeaderNavbarProps {
  playerTitle: string;
  score: number;
  totalRestored: number;
  totalCaves: number;
  isAllCavesRestored: boolean;
  onOpenAIChat: () => void;
  onOpenInstruments: () => void;
  onOpenPigmentLab: () => void;
  onOpenPassport: () => void;
  onOpenMatchGame: () => void;
  onResetGame: () => void;
  currentTab: 'landing' | 'map' | 'workshop';
  onGoToMap: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  playerTitle,
  score,
  totalRestored,
  totalCaves,
  isAllCavesRestored,
  onOpenAIChat,
  onOpenInstruments,
  onOpenPigmentLab,
  onOpenPassport,
  onOpenMatchGame,
  onResetGame,
  currentTab,
  onGoToMap,
}) => {
  const [isMuted, setIsMuted] = React.useState(audioSynth.getMutedState());
  const [isAmbientOn, setIsAmbientOn] = React.useState(false);

  const handleMuteToggle = () => {
    const muted = audioSynth.toggleMute();
    setIsMuted(muted);
  };

  const handleAmbientToggle = () => {
    const active = audioSynth.toggleAmbientMusic();
    setIsAmbientOn(active);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#f4ece1]/90 backdrop-blur-md border-b border-[#d9a047] text-[#3a352a] shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Title */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onGoToMap}>
          <div className="w-10 h-10 rounded-full bg-[#f4ece1] border border-[#d9a047] flex items-center justify-center text-[#b84c3a] shadow-sm">
            <span className="text-xl">🪷</span>
          </div>
          <div>
            <h1 className="font-serif text-lg md:text-xl font-bold tracking-widest text-[#b84c3a] uppercase flex items-center gap-2">
              敦煌遗境 <span className="text-[10px] font-normal tracking-widest px-2 py-0.5 rounded-sm bg-[#e8dfd1] border border-[#d9a047]/60 text-[#3a352a]">HERITAGE PROJECT</span>
            </h1>
            <p className="text-xs text-[#6e6454] hidden sm:block italic font-serif">莫高窟壁画数字修复 & 互动文化沉浸</p>
          </div>
        </div>

        {/* Center Game Stats & Badges */}
        <div className="hidden md:flex items-center space-x-4 bg-[#e8dfd1]/80 px-4 py-1.5 rounded-sm border border-[#d9a047]/50 text-xs text-[#3a352a]">
          <div className="flex items-center space-x-1.5 font-medium">
            <Award className="w-4 h-4 text-[#b84c3a]" />
            <span>称号: <strong className="text-[#b84c3a] font-serif">{playerTitle}</strong></span>
          </div>
          <div className="w-px h-3 bg-[#d9a047]/40" />
          <div className="text-[#6e6454]">
            修复洞窟: <strong className="text-[#2c5f78] font-serif">{totalRestored}</strong> / {totalCaves}
          </div>
          <div className="w-px h-3 bg-[#d9a047]/40" />
          <div className="text-[#6e6454]">
            灵韵积分: <strong className="text-[#d9a047] font-serif font-bold">{score}</strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Go To Map Button if in Workshop */}
          {currentTab === 'workshop' && (
            <button
              onClick={onGoToMap}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-sm bg-[#2c5f78] text-white text-xs transition uppercase tracking-wider hover:bg-[#1e4a60]"
              title="返回虚拟洞窟地图"
            >
              <Compass className="w-4 h-4 text-[#d9a047]" />
              <span className="hidden sm:inline">洞窟大地图</span>
            </button>
          )}

          {/* Instrument Mini-game */}
          <button
            onClick={onOpenInstruments}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] border border-[#d9a047] text-xs transition font-serif"
            title="飞天奏乐·弹奏反弹琵琶与箜篌"
          >
            <Music className="w-3.5 h-3.5 text-[#b84c3a]" />
            <span className="hidden sm:inline">飞天奏乐</span>
          </button>

          {/* Pigment Lab */}
          <button
            onClick={onOpenPigmentLab}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#2c5f78] border border-[#2c5f78]/60 text-xs transition font-serif"
            title="采撷局·古法矿物颜料"
          >
            <Palette className="w-3.5 h-3.5 text-[#2c5f78]" />
            <span className="hidden sm:inline">颜料坊</span>
          </button>

          {/* Match Mini Game */}
          <button
            onClick={() => {
              if (isAllCavesRestored) {
                onOpenMatchGame();
              } else {
                audioSynth.playErrorTone();
                alert(`🔒 暂未解锁【敦煌知识连连看】\n\n需将所有洞窟壁画（当前 ${totalRestored}/${totalCaves}）全部修复完成，方可开启此研习玩法！`);
              }
            }}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-sm border text-xs transition font-serif ${
              isAllCavesRestored
                ? 'bg-[#b84c3a] text-white border-[#d9a047] shadow-sm animate-pulse'
                : 'bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#6e6454] border-[#d9a047]/40 opacity-80'
            }`}
            title={isAllCavesRestored ? '科普连连看·测试研习成果' : `需修复完所有壁画后解锁 (${totalRestored}/${totalCaves})`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isAllCavesRestored ? 'text-[#d9a047]' : 'text-[#6e6454]'}`} />
            <span className="hidden sm:inline">
              {isAllCavesRestored ? '知识连连看 🎮' : '知识连连看 🔒'}
            </span>
          </button>

          {/* Passport / Seals */}
          <button
            onClick={onOpenPassport}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#b84c3a] border border-[#b84c3a]/50 text-xs transition font-serif"
            title="查看通关文牒与修宝印记"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#b84c3a]" />
            <span className="hidden sm:inline">通关文牒</span>
          </button>

          {/* AI Guardian NPC Chat */}
          <button
            onClick={onOpenAIChat}
            className="relative flex items-center space-x-1.5 px-3 py-1.5 rounded-sm bg-[#b84c3a] hover:bg-[#a83b2a] text-white text-xs font-serif shadow-sm transition group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d9a047] animate-pulse" />
            <span>九色鹿灵 AI</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#d9a047] rounded-full animate-ping" />
          </button>

          {/* Ambient Music */}
          <button
            onClick={handleAmbientToggle}
            className={`p-2 rounded-sm border text-xs transition ${
              isAmbientOn
                ? 'bg-[#d9a047]/20 border-[#d9a047] text-[#b84c3a]'
                : 'bg-[#f4ece1] border-[#d9a047]/40 text-[#6e6454] hover:text-[#3a352a]'
            }`}
            title={isAmbientOn ? '关闭背景古风古韵' : '播放背景古风古韵'}
          >
            <Music className={`w-4 h-4 ${isAmbientOn ? 'animate-spin-slow text-[#b84c3a]' : ''}`} />
          </button>

          {/* Audio Mute */}
          <button
            onClick={handleMuteToggle}
            className="p-2 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] border border-[#d9a047]/40 text-[#3a352a] text-xs transition"
            title={isMuted ? '开启音效' : '静音'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#b84c3a]" /> : <Volume2 className="w-4 h-4 text-[#2c5f78]" />}
          </button>

          {/* Reset */}
          <button
            onClick={onResetGame}
            className="p-2 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] border border-[#d9a047]/40 text-[#6e6454] hover:text-[#b84c3a] text-xs transition"
            title="重置修复进度"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
