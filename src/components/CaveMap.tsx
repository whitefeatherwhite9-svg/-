import React from 'react';
import { CaveNode } from '../types';
import { Lock, CheckCircle2, Sparkles, BookOpen, Wrench, Shield, Info } from 'lucide-react';
import { heroMuralImg } from '../data/dunhuangData';
import { audioSynth } from '../utils/audioSynth';

interface CaveMapProps {
  caves: CaveNode[];
  onSelectCave: (cave: CaveNode) => void;
  onOpenStory: (cave: CaveNode) => void;
  onOpenWorkshop: (cave: CaveNode) => void;
}

export const CaveMap: React.FC<CaveMapProps> = ({
  caves,
  onSelectCave,
  onOpenStory,
  onOpenWorkshop,
}) => {
  const totalRestored = caves.filter((c) => c.restored).length;
  const progressPercent = Math.round((totalRestored / caves.length) * 100);

  const handleNodeClick = (cave: CaveNode) => {
    audioSynth.playPluck(523.25);
    if (cave.locked) {
      audioSynth.playErrorTone();
      return;
    }
    onSelectCave(cave);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-[#f4ece1] text-[#3a352a] p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
      {/* Background Cliff Aesthetics */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <img
          src={heroMuralImg}
          alt="Cliff Cave Visual"
          className="w-full h-full object-cover filter blur-sm scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4ece1] via-[#f4ece1]/80 to-transparent" />
      </div>

      {/* Top Section Header */}
      <div className="relative z-10 max-w-6xl mx-auto w-full mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#f4ece1]/90 p-4 sm:p-5 rounded-sm border border-[#d9a047] shadow-md">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#b84c3a] uppercase tracking-widest flex items-center gap-2">
              <span className="text-2xl">🏜️</span> 莫高窟·虚拟数字洞窟群全景地图
            </h2>
            <p className="text-xs sm:text-sm text-[#6e6454] mt-1 font-serif">
              点击高亮洞窟，回答敦煌历史文化考问，集齐散落的壁画碎片，进入工坊修复！
            </p>
          </div>

          {/* Restoration Progress Bar */}
          <div className="w-full md:w-72 bg-[#e8dfd1]/80 p-3 rounded-sm border border-[#d9a047]/60">
            <div className="flex justify-between text-xs text-[#3a352a] mb-1 font-serif">
              <span>鸣沙山洞窟修复度</span>
              <span className="font-bold text-[#b84c3a]">{progressPercent}% ({totalRestored}/{caves.length})</span>
            </div>
            <div className="w-full h-2 bg-[#d6ccbc] rounded-none overflow-hidden p-0.5 border border-[#d9a047]/40">
              <div
                className="h-full bg-[#b84c3a] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Cave Cliff Map Interactive Canvas Area */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 min-h-[420px] rounded-sm bg-[#e8dfd1]/50 border border-[#d9a047] shadow-xl p-4 sm:p-8 flex flex-col justify-between overflow-hidden group">
        {/* Decorative Rock Wall Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#d9a047_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

        {/* Cave Nodes Map Grid */}
        <div className="relative w-full h-full min-h-[360px] flex items-center justify-center">
          {/* Desert Dune Curve Line SVG connecting caves */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#d9a047]/50 stroke-2 stroke-dasharray-4">
            <path d="M 120 220 Q 350 120, 550 240 T 950 180" fill="none" />
          </svg>

          {caves.map((cave) => {
            const hasAllFragments = cave.collectedFragments >= cave.totalFragments;

            return (
              <div
                key={cave.id}
                style={{
                  left: `${cave.coordinates.x}%`,
                  top: `${cave.coordinates.y}%`,
                }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 ${
                  cave.locked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:scale-105'
                }`}
              >
                {/* Node Entrance Marker Pulse */}
                <div
                  onClick={() => handleNodeClick(cave)}
                  className={`relative p-3 sm:p-4 rounded-sm border shadow-lg transition backdrop-blur-sm flex flex-col items-center justify-center text-center min-w-[130px] sm:min-w-[170px] ${
                    cave.restored
                      ? 'bg-[#2c5f78] border-[#2c5f78] text-white'
                      : cave.locked
                      ? 'bg-[#d6ccbc]/80 border-[#3a352a]/20 text-[#6e6454]'
                      : 'bg-[#f4ece1] border-[#d9a047] text-[#3a352a] hover:border-[#b84c3a]'
                  }`}
                >
                  {/* Status Indicator Top Icon */}
                  <div className="absolute -top-3 px-2 py-0.5 rounded-sm text-[10px] font-bold border shadow-sm flex items-center gap-1 bg-[#f4ece1]">
                    {cave.restored ? (
                      <span className="text-[#2c5f78] border-[#2c5f78] px-1.5 py-0.2 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#2c5f78]" /> 已完工
                      </span>
                    ) : cave.locked ? (
                      <span className="text-[#6e6454] border-[#6e6454]/40 px-1.5 py-0.2 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> 待解锁
                      </span>
                    ) : (
                      <span className="text-[#b84c3a] border-[#b84c3a]/40 px-1.5 py-0.2 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#b84c3a] animate-pulse" /> 待修复 ({cave.collectedFragments}/{cave.totalFragments}碎片)
                      </span>
                    )}
                  </div>

                  {/* Cave Image Thumbnail */}
                  <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-none overflow-hidden my-1 border border-[#d9a047] shadow-inner relative">
                    <img
                      src={cave.image}
                      alt={cave.name}
                      className={`w-full h-full object-cover ${cave.restored ? 'saturate-125' : 'saturate-75 contrast-110'}`}
                      referrerPolicy="no-referrer"
                    />
                    {!cave.restored && !cave.locked && (
                      <div className="absolute inset-0 bg-[#3a352a]/20 flex items-center justify-center">
                        <span className="text-xs">📜</span>
                      </div>
                    )}
                  </div>

                  {/* Cave Info */}
                  <h3 className="font-serif font-bold text-xs sm:text-sm text-[#3a352a] mt-1">
                    {cave.number}
                  </h3>
                  <p className="text-[11px] font-serif font-semibold text-[#b84c3a] truncate max-w-[130px]">
                    {cave.name}
                  </p>
                  <span className="text-[10px] text-[#6e6454] mt-0.5">{cave.era}</span>

                  {/* Quick Action Buttons for unlocked caves */}
                  {!cave.locked && (
                    <div className="mt-2 flex items-center space-x-1.5 w-full pt-1.5 border-t border-[#d9a047]/40 text-[10px] font-serif">
                      {cave.restored ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenStory(cave);
                          }}
                          className="flex-1 py-1 px-1 rounded-sm bg-[#2c5f78] text-white flex items-center justify-center space-x-1 transition hover:bg-[#1e4a60]"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>全景故事</span>
                        </button>
                      ) : hasAllFragments ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenWorkshop(cave);
                          }}
                          className="flex-1 py-1 px-1 rounded-sm bg-[#b84c3a] text-white font-bold flex items-center justify-center space-x-1 transition shadow-sm hover:bg-[#a83b2a]"
                        >
                          <Wrench className="w-3 h-3" />
                          <span>修复工坊</span>
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCave(cave);
                          }}
                          className="flex-1 py-1 px-1 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] border border-[#d9a047] flex items-center justify-center space-x-1 transition"
                        >
                          <Sparkles className="w-3 h-3 text-[#b84c3a]" />
                          <span>解谜寻宝</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cave Map Legend Footer */}
        <div className="relative z-10 pt-4 border-t border-[#d9a047]/40 flex flex-wrap items-center justify-between text-xs text-[#6e6454] gap-2 font-serif">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-[#b84c3a]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#b84c3a] inline-block" />
              <span>当前可探索/答题洞窟</span>
            </span>
            <span className="flex items-center space-x-1 text-[#2c5f78]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2c5f78] inline-block" />
              <span>壁画修复完成洞窟</span>
            </span>
            <span className="flex items-center space-x-1 text-[#6e6454]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6e6454] inline-block" />
              <span>需修复上一关后解锁</span>
            </span>
          </div>

          <p className="text-[11px] text-[#6e6454] italic">
            提示: 解答洞窟卷轴问答集齐3个碎片，即可开启该窟数字修复工坊！
          </p>
        </div>
      </div>
    </div>
  );
};
