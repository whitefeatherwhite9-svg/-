import React, { useState } from 'react';
import { X, Palette, Sparkles, Droplet, Hammer } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface PigmentLabModalProps {
  onClose: () => void;
}

interface PigmentInfo {
  name: string;
  chemical: string;
  origin: string;
  colorHex: string;
  bgColor: string;
  desc: string;
  application: string;
}

export const PigmentLabModal: React.FC<PigmentLabModalProps> = ({ onClose }) => {
  const [selectedPigment, setSelectedPigment] = useState<number>(0);
  const [isMixing, setIsMixing] = useState<boolean>(false);

  const pigments: PigmentInfo[] = [
    {
      name: '石青 (Lapis Lazuli / Azurite)',
      chemical: '碱式碳酸铜 / 青金石',
      origin: '西域阿富汗、新疆及中国西南矿山',
      colorHex: '#1e3a8a',
      bgColor: 'bg-blue-900',
      desc: '莫高窟壁画中最尊贵的千古蓝色，如深邃夜空。其化学性质极为稳定，虽历经千百年岁月的风沙侵蚀，依然蓝如洗水。',
      application: '用于绘制九色鹿背景、飞天飘带、佛陀螺发与宫殿琉璃瓦。',
    },
    {
      name: '朱砂 (Cinnabar)',
      chemical: '硫化汞 (HgS)',
      origin: '湖南辰州、贵州古矿',
      colorHex: '#991b1b',
      bgColor: 'bg-red-900',
      desc: '古代东方最为庄重纯正的红色颜料，具有避邪与吉祥寓意。古代画工将其研磨成极细粉末后，加入桃胶或动物胶调和。',
      application: '用于绘制佛像袈裟、天王甲胄、供养人华服与飞天唇彩。',
    },
    {
      name: '石绿 (Malachite)',
      chemical: '碱式碳酸铜 (孔雀石)',
      origin: '铜矿次生氧化带',
      colorHex: '#065f46',
      bgColor: 'bg-emerald-900',
      desc: '源自孔雀石的天然碧绿与石绿颜料，分为头绿、二绿、三绿等不同粗细色阶，呈极其明亮清丽的东方天然矿物绿色。',
      application: '用于绘制菩提树木、山水丘壑、菩萨佩饰与花卉锦纹。',
    },
    {
      name: '赭石 (Ochre)',
      chemical: '天然赤铁矿 (Fe2O3)',
      origin: '黄土高原与天然铁矿土',
      colorHex: '#78350f',
      bgColor: 'bg-amber-950',
      desc: '最古老的东方大地颜料，呈沉稳温暖的黄褐色与红褐色，是莫高窟北魏及早期壁画最重要的底色基调。',
      application: '用于壁画底层打底、人物肌肤打底与土木建筑线条。',
    },
    {
      name: '沥粉金箔 (Gold Leaf)',
      chemical: '高纯度黄金 (Au)',
      origin: '古代宫廷金箔锻造局',
      colorHex: '#eab308',
      bgColor: 'bg-yellow-800',
      desc: '将金条捶打至微米级极薄金箔，搭配沥粉立体工艺贴于壁画宝冠与璎珞处，使壁画在昏暗洞窟烛光下散发出摄人心魄的辉煌金光。',
      application: '用于佛像宝冠、璎珞项圈、经变宝塔与神将兵刃。',
    },
  ];

  const currentP = pigments[selectedPigment];

  const handleMixGlue = () => {
    audioSynth.playPluck(350, 0.4);
    setIsMixing(true);
    setTimeout(() => {
      setIsMixing(false);
      audioSynth.playChime(880);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3a352a]/60 backdrop-blur-sm animate-fade-in font-serif">
      <div className="relative w-full max-w-3xl bg-[#f4ece1] border-2 border-[#d9a047] rounded-sm shadow-2xl text-[#3a352a] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#d9a047]/50 bg-[#e8dfd1] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-sm bg-[#f4ece1] border border-[#d9a047] text-[#2c5f78]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#b84c3a] uppercase tracking-widest">
                采撷局 · 莫高窟矿物颜料秘辛
              </h3>
              <p className="text-xs text-[#6e6454]">千载壁画色泽鲜艳的化学与天然艺术奥秘</p>
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
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Pigment Selection Badges */}
          <div className="flex flex-wrap gap-2">
            {pigments.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPigment(idx)}
                className={`px-3 py-2 rounded-sm text-xs font-serif font-bold transition flex items-center space-x-2 border ${
                  selectedPigment === idx
                    ? 'bg-[#b84c3a] text-white border-[#d9a047] shadow-sm'
                    : 'bg-[#f4ece1] text-[#3a352a] border-[#d9a047]/60 hover:border-[#b84c3a]'
                }`}
              >
                <span className="w-3 h-3 rounded-full border border-stone-400" style={{ backgroundColor: p.colorHex }} />
                <span>{p.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Details Display Card */}
          <div className="p-6 rounded-sm bg-[#e8dfd1]/80 border border-[#d9a047] space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#d9a047]/50 pb-4">
              <div>
                <h4 className="text-lg font-serif font-bold text-[#b84c3a] flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-[#d9a047]" style={{ backgroundColor: currentP.colorHex }} />
                  {currentP.name}
                </h4>
                <p className="text-xs text-[#2c5f78] mt-0.5 font-bold">化学成分: {currentP.chemical}</p>
              </div>

              <span className="text-xs px-3 py-1 rounded-sm bg-[#f4ece1] border border-[#d9a047] text-[#3a352a]">
                📍 产地来源: {currentP.origin}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-[#3a352a] leading-relaxed space-y-3 font-serif">
              <p>{currentP.desc}</p>
              <div className="p-3 rounded-sm bg-[#f4ece1] border border-[#d9a047]/60 text-[#b84c3a]">
                <strong className="font-bold">🖌️ 莫高窟壁画应用示例：</strong>
                <span className="ml-1 text-[#3a352a]">{currentP.application}</span>
              </div>
            </div>

            {/* Interactive Mixing Glue Simulation */}
            <div className="pt-3 border-t border-[#d9a047]/50 flex items-center justify-between">
              <div className="text-xs text-[#6e6454] flex items-center gap-1.5 font-serif">
                <Hammer className="w-4 h-4 text-[#b84c3a]" />
                <span>研磨矿物 + 注入动物水胶调和成画用颜料</span>
              </div>

              <button
                onClick={handleMixGlue}
                disabled={isMixing}
                className="px-4 py-2 rounded-sm bg-[#2c5f78] hover:bg-[#1e4a60] text-white font-serif font-bold text-xs shadow-sm transition flex items-center space-x-1.5 uppercase tracking-wider"
              >
                <Droplet className={`w-3.5 h-3.5 ${isMixing ? 'animate-bounce' : ''}`} />
                <span>{isMixing ? '擂捣调和胶液中...' : '古法研粉调胶'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#e8dfd1] border-t border-[#d9a047]/50 text-center text-xs text-[#6e6454] font-serif italic">
          天然矿物颜料沉稳厚重 · 东方壁画千载不褪色的科学之美
        </div>
      </div>
    </div>
  );
};
