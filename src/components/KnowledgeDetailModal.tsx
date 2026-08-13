import React from 'react';
import { X, BookOpen, Sparkles, Award, Palette, Music, Landmark, ArrowRight } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface KnowledgeDetailModalProps {
  onClose: () => void;
  onOpenPassport: () => void;
}

export const KnowledgeDetailModal: React.FC<KnowledgeDetailModalProps> = ({
  onClose,
  onOpenPassport,
}) => {
  const handleProceedToPassport = () => {
    audioSynth.playSuccessArpeggio();
    onClose();
    onOpenPassport();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3a352a]/70 backdrop-blur-md animate-fade-in font-serif">
      <div className="relative w-full max-w-3xl bg-[#f4ece1] border-2 border-[#d9a047] rounded-sm shadow-2xl text-[#3a352a] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#d9a047]/50 bg-[#e8dfd1] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-sm bg-[#b84c3a] border border-[#d9a047] text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#b84c3a] uppercase tracking-widest flex items-center gap-2">
                <span>📚</span> 莫高窟千载灵韵 · 敦煌科学与艺术科普大典
              </h3>
              <p className="text-xs text-[#6e6454]">连连看研习成果归纳 · 矿物色彩与壁画保护科学</p>
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
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm leading-relaxed">
          {/* Section 1: Mineral Pigments */}
          <div className="p-4 rounded-sm bg-[#e8dfd1]/80 border border-[#d9a047] space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 text-[#b84c3a] font-bold text-sm uppercase tracking-wider border-b border-[#d9a047]/50 pb-1.5">
              <Palette className="w-4 h-4 text-[#d9a047]" />
              <span>一、 莫高窟天然矿物颜料科学与千载色彩奥秘</span>
            </div>
            <p className="text-[#3a352a]">
              敦煌莫高窟壁画之所以能历经千百年依然光彩夺目，关键在于画师使用了天然矿物颜料。如红色取自<strong>朱砂（辰砂矿）</strong>，蓝色取自<strong>青金石（阿富汗西域矿）</strong>，绿色取自<strong>孔雀石与绿松石</strong>。
            </p>
            <div className="p-2.5 rounded-sm bg-[#f4ece1] border border-[#d9a047]/60 text-[11px] text-[#6e6454]">
              💡 <strong>科学氧化之谜：</strong> 部分铅丹与铅白颜料因长年吸收空气中的湿度与微量硫化物，发生了氧化反应变黑，形成了我们今天看到的玄黑脸庞与古朴沉稳的视觉质感。
            </div>
          </div>

          {/* Section 2: Restoration Science */}
          <div className="p-4 rounded-sm bg-[#e8dfd1]/80 border border-[#d9a047] space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 text-[#2c5f78] font-bold text-sm uppercase tracking-wider border-b border-[#d9a047]/50 pb-1.5">
              <Landmark className="w-4 h-4 text-[#2c5f78]" />
              <span>二、 莫高窟壁画病害修复与数字存档保护</span>
            </div>
            <p className="text-[#3a352a]">
              壁画病害主要包括起甲、酥碱、脱落与烟熏烟尘。近代修复专家采用高分子胶结剂回巩固化，并利用现代<strong>数字高精度扫描与光谱分析</strong>，原汁原味还原北魏、隋唐等洞窟的原貌。
            </p>
          </div>

          {/* Section 3: Music & Silk Road Heritage */}
          <div className="p-4 rounded-sm bg-[#e8dfd1]/80 border border-[#d9a047] space-y-2 shadow-sm">
            <div className="flex items-center space-x-2 text-[#b84c3a] font-bold text-sm uppercase tracking-wider border-b border-[#d9a047]/50 pb-1.5">
              <Music className="w-4 h-4 text-[#d9a047]" />
              <span>三、 飞天乐舞与东西方文明交融</span>
            </div>
            <p className="text-[#3a352a]">
              第112窟反弹琵琶与第220窟初唐飞天乐舞图，展示了西域筚篥、羯鼓与中原古琴的交融，反映了丝绸之路作为东西方文化对话枢纽的繁华气象。
            </p>
          </div>

          {/* Special Achievement Seal Box */}
          <div className="p-4 rounded-sm bg-[#f4ece1] border-2 border-[#b84c3a] text-center space-y-2">
            <div className="text-xs font-bold text-[#b84c3a] flex items-center justify-center gap-1.5 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#d9a047]" />
              <span>通关考核合格 · 颁发莫高窟御赐通关文牒</span>
            </div>
            <p className="text-[11px] text-[#6e6454]">
              汝已完整通关壁画修复、知识答题与连连看考验！点击下方按钮领取修宝官功德证书。
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#e8dfd1] border-t border-[#d9a047]/50 flex items-center justify-between font-serif">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] border border-[#d9a047] text-xs transition font-serif"
          >
            返回洞窟地图
          </button>

          <button
            onClick={handleProceedToPassport}
            className="px-6 py-2.5 rounded-sm bg-[#b84c3a] hover:bg-[#a83b2a] text-white font-serif text-xs sm:text-sm font-bold border border-[#d9a047] shadow-md transition flex items-center space-x-2 uppercase tracking-widest animate-pulse"
          >
            <Award className="w-4 h-4 text-[#d9a047]" />
            <span>弹出领受 · 莫高窟通关文牒</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
