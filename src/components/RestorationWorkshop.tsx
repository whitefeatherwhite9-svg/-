import React, { useState, useRef, useEffect } from 'react';
import { CaveNode, FragmentItem } from '../types';
import { CAVE_FRAGMENTS } from '../data/dunhuangData';
import { Sparkles, CheckCircle2, RefreshCw, Eye, Wand2, Award, ArrowLeft } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface RestorationWorkshopProps {
  cave: CaveNode;
  onCompleteRestoration: (caveId: string) => void;
  onBackToMap: () => void;
  onOpenStory: (cave: CaveNode) => void;
  isAllCavesRestored?: boolean;
  onStartMatchGame?: () => void;
}

export const RestorationWorkshop: React.FC<RestorationWorkshopProps> = ({
  cave,
  onCompleteRestoration,
  onBackToMap,
  onOpenStory,
  isAllCavesRestored,
  onStartMatchGame,
}) => {
  const initialFragments = CAVE_FRAGMENTS[cave.id] || [];
  const [fragments, setFragments] = useState<FragmentItem[]>(initialFragments);
  const [selectedFrag, setSelectedFrag] = useState<FragmentItem | null>(null);
  
  // Brush Cleaning Progress (0 to 100)
  const [cleanedPercent, setCleanedPercent] = useState<number>(cave.restored ? 100 : 0);
  const [isBrushActive, setIsBrushActive] = useState<boolean>(false);
  const [isRestoredDone, setIsRestoredDone] = useState<boolean>(cave.restored);
  const [showBrushUnlockedNotice, setShowBrushUnlockedNotice] = useState<boolean>(false);
  const [showLockWarning, setShowLockWarning] = useState<boolean>(false);

  // Comparison Slider Value (0 to 100)
  const [sliderPos, setSliderPos] = useState<number>(50);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const allPlaced = fragments.every((f) => f.isPlaced);

  // Auto unlock brush when all fragments placed
  useEffect(() => {
    if (allPlaced && !isRestoredDone) {
      setIsBrushActive(true);
      setShowBrushUnlockedNotice(true);
      audioSynth.playSuccessArpeggio();
      const timer = setTimeout(() => setShowBrushUnlockedNotice(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [allPlaced]);

  // Initialize Scratch Canvas for Dust Layer Cleaning
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 400;

    if (!isRestoredDone) {
      // Draw dusty oxidized brown/black smoke layer
      ctx.fillStyle = '#292524';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add sand texture spots
      ctx.fillStyle = '#44403c';
      for (let i = 0; i < 400; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 4 + 1;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setCleanedPercent(100);
    }
  }, [cave.id, isRestoredDone]);

  // Handle Scratch Brush Move
  const handleCanvasScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isBrushActive || isRestoredDone) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    // Erase dusty layer
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2);
    ctx.fill();

    audioSynth.playPluck(200 + Math.random() * 100, 0.2);

    // Calculate Cleaned Ratio
    if (Math.random() < 0.2) {
      checkCleanProgress(ctx, canvas);
    }
  };

  const checkCleanProgress = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparentPixels = 0;
      for (let i = 3; i < imgData.data.length; i += 16) {
        if (imgData.data[i] === 0) {
          transparentPixels++;
        }
      }
      const totalSampled = imgData.data.length / 16;
      const ratio = Math.min(100, Math.round((transparentPixels / totalSampled) * 100));
      setCleanedPercent(ratio);

      if (ratio >= 80 && !isRestoredDone) {
        setIsRestoredDone(true);
        audioSynth.playSuccessArpeggio();
        onCompleteRestoration(cave.id);
      }
    } catch (err) {
      // Fallback
    }
  };

  // Click target slot or fragment
  const handlePlaceFragment = (frag: FragmentItem) => {
    audioSynth.playPluck(600, 0.4);
    setFragments((prev) =>
      prev.map((f) => (f.id === frag.id ? { ...f, isPlaced: true } : f))
    );
    setSelectedFrag(null);
  };

  const handleAutoClean = () => {
    audioSynth.playSuccessArpeggio();
    setCleanedPercent(100);
    setIsRestoredDone(true);
    onCompleteRestoration(cave.id);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#f4ece1] text-[#3a352a] p-4 sm:p-6 flex flex-col justify-between">
      {/* Workshop Header */}
      <div className="max-w-6xl mx-auto w-full mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f4ece1] p-4 rounded-sm border border-[#d9a047] shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToMap}
              className="p-2 rounded-sm bg-[#e8dfd1] hover:bg-[#d6ccbc] text-[#3a352a] border border-[#d9a047] text-xs transition flex items-center space-x-1 font-serif"
            >
              <ArrowLeft className="w-4 h-4 text-[#b84c3a]" />
              <span>返回地图</span>
            </button>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#b84c3a] flex items-center gap-2 uppercase tracking-widest">
                <span>🎨</span> 【{cave.number}】壁画数字修复工坊
              </h2>
              <p className="text-xs text-[#6e6454] font-serif">
                步骤 1: 将碎块精准置入轮廓；步骤 2: 切换数字画笔擦去千载氧化烟尘！
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-serif">
            <div className="bg-[#e8dfd1] px-3 py-1.5 rounded-sm border border-[#d9a047]/60 flex items-center space-x-2">
              <span className="text-[#6e6454]">拼图进度:</span>
              <strong className={allPlaced ? 'text-[#2c5f78]' : 'text-[#b84c3a]'}>
                {fragments.filter((f) => f.isPlaced).length} / {fragments.length}
              </strong>
            </div>

            <div className="bg-[#e8dfd1] px-3 py-1.5 rounded-sm border border-[#d9a047]/60 flex items-center space-x-2">
              <span className="text-[#6e6454]">斑驳清洗率:</span>
              <strong className={cleanedPercent >= 80 ? 'text-[#2c5f78] font-bold' : 'text-[#b84c3a]'}>
                {cleanedPercent}%
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workshop Interactive Canvas Container */}
      <div className="max-w-6xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Toolbar / Fragments Inventory */}
        <div className="lg:col-span-1 space-y-4 bg-[#f4ece1] p-4 rounded-sm border border-[#d9a047] shadow-sm">
          <h3 className="font-serif font-bold text-[#b84c3a] text-sm flex items-center gap-1.5 border-b border-[#d9a047]/50 pb-2 uppercase tracking-widest">
            <span>🧩</span> 获得的灵韵碎片
          </h3>

          <div className="space-y-2.5">
            {fragments.map((frag) => (
              <div
                key={frag.id}
                onClick={() => !frag.isPlaced && setSelectedFrag(frag)}
                className={`p-3 rounded-sm border transition cursor-pointer flex items-center justify-between text-xs ${
                  frag.isPlaced
                    ? 'bg-[#e8dfd1] border-[#3a352a]/20 text-[#6e6454] opacity-60 cursor-default'
                    : selectedFrag?.id === frag.id
                    ? 'bg-[#e8dfd1] border-[#b84c3a] text-[#b84c3a] shadow-sm ring-1 ring-[#b84c3a]'
                    : 'bg-[#f4ece1] border-[#d9a047]/60 hover:border-[#b84c3a] text-[#3a352a]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl p-1 bg-[#e8dfd1] rounded-sm">{frag.imagePiece}</span>
                  <div>
                    <div className="font-serif font-semibold">{frag.name}</div>
                    <div className="text-[10px] text-[#6e6454] line-clamp-1">{frag.description}</div>
                  </div>
                </div>
                {frag.isPlaced && <CheckCircle2 className="w-4 h-4 text-[#2c5f78] shrink-0" />}
              </div>
            ))}
          </div>

          {/* Mode Controls */}
          <div className="pt-3 border-t border-[#d9a047]/50 space-y-2">
            {!allPlaced ? (
              <div className="p-2.5 rounded-sm bg-[#e8dfd1] border border-[#b84c3a]/40 text-[11px] text-[#b84c3a] font-serif flex items-start space-x-1.5">
                <span className="shrink-0">🔒</span>
                <span>请先点击或将左侧所有碎块拼接归位，即可自动解锁数字拭除画笔！</span>
              </div>
            ) : (
              <div className="p-2 rounded-sm bg-[#2c5f78]/10 border border-[#2c5f78]/50 text-[11px] text-[#2c5f78] font-serif font-bold flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-[#2c5f78]" />
                <span>✨ 碎片拼接完整！画笔擦拭功能已解锁！</span>
              </div>
            )}

            <button
              onClick={() => setIsBrushActive(!isBrushActive)}
              disabled={!allPlaced}
              className={`w-full py-2.5 px-3 rounded-sm font-serif text-xs font-bold transition flex items-center justify-center space-x-2 uppercase tracking-wider ${
                !allPlaced
                  ? 'bg-[#e8dfd1] text-[#6e6454] cursor-not-allowed border border-[#d9a047]/40'
                  : isBrushActive
                  ? 'bg-[#2c5f78] text-white shadow-md'
                  : 'bg-[#b84c3a] hover:bg-[#a83b2a] text-white border border-[#d9a047]'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span>{isBrushActive ? '画笔模式激活中' : '切换拭除画笔'}</span>
            </button>

            {allPlaced && !isRestoredDone && (
              <button
                onClick={handleAutoClean}
                className="w-full py-2 px-3 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] text-xs border border-[#d9a047] transition flex items-center justify-center space-x-1 font-serif"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#b84c3a]" />
                <span>一键灵光拭除</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Central Restoration Stage */}
        <div className="lg:col-span-3 bg-[#f4ece1] p-4 sm:p-6 rounded-sm border border-[#d9a047] shadow-md relative flex flex-col items-center justify-center min-h-[420px]">
          {/* Mural Work Bench Frame */}
          <div className="relative w-full max-w-[600px] h-[360px] sm:h-[400px] rounded-none overflow-hidden border-2 border-[#d9a047] shadow-xl bg-[#3a352a] group">
            {/* Restored Layer Image */}
            <img
              src={cave.restoredImage}
              alt="Restored Mural"
              className="absolute inset-0 w-full h-full object-cover saturate-125"
              referrerPolicy="no-referrer"
            />

            {/* Dusty Scratch Canvas Overlay */}
            {!isRestoredDone && (
              <canvas
                ref={canvasRef}
                onMouseDown={() => setIsBrushActive(true)}
                onMouseUp={() => setIsBrushActive(true)}
                onMouseMove={handleCanvasScratch}
                onTouchMove={handleCanvasScratch}
                className={`absolute inset-0 w-full h-full z-20 transition-opacity ${
                  isBrushActive ? 'cursor-crosshair' : 'cursor-default'
                }`}
              />
            )}

            {/* Target Placement Slots */}
            {!allPlaced &&
              fragments.map((frag) => (
                <div
                  key={frag.id}
                  onClick={() => selectedFrag && selectedFrag.id === frag.id && handlePlaceFragment(frag)}
                  style={{
                    left: `${frag.targetX}%`,
                    top: `${frag.targetY}%`,
                  }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-dashed transition-all duration-300 flex items-center justify-center text-xl z-30 ${
                    frag.isPlaced
                      ? 'bg-[#2c5f78] border-white shadow-md text-white opacity-90'
                      : selectedFrag?.id === frag.id
                      ? 'bg-[#b84c3a]/80 border-[#d9a047] animate-pulse cursor-pointer scale-125 ring-2 ring-[#d9a047]'
                      : 'bg-[#3a352a]/70 border-[#d9a047]'
                  }`}
                >
                  {frag.isPlaced ? frag.imagePiece : '❓'}
                </div>
              ))}

            {/* Before / After Slider view when fully restored */}
            {isRestoredDone && (
              <div className="absolute bottom-3 left-3 right-3 bg-[#f4ece1]/90 p-2.5 rounded-sm border border-[#d9a047] shadow-md z-30 flex items-center space-x-3 text-xs">
                <Eye className="w-4 h-4 text-[#b84c3a] shrink-0" />
                <span className="text-[#3a352a] font-serif shrink-0">修前/修后对比:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-full accent-[#b84c3a] cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Completion Banner */}
          {isRestoredDone && (
            <div className="mt-4 p-4 rounded-sm bg-[#e8dfd1] border border-[#d9a047] text-center w-full max-w-[600px] shadow-md font-serif space-y-3">
              <div className="flex items-center justify-center space-x-2 text-[#b84c3a] font-bold text-base mb-1">
                <Award className="w-5 h-5 text-[#b84c3a]" />
                <span>恭喜！【{cave.name}】完美重现千载华彩！</span>
              </div>
              <p className="text-xs text-[#6e6454]">
                千载烟尘已被扫去，矿物宝光复苏。快去解锁全景历史高清画卷与文化细节吧！
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onOpenStory(cave)}
                  className="px-5 py-2 rounded-sm bg-[#2c5f78] hover:bg-[#1e4a60] text-white font-serif font-bold text-xs shadow-sm transition uppercase tracking-widest"
                >
                  解锁洞窟全景细节 & 故事
                </button>

                {isAllCavesRestored ? (
                  onStartMatchGame && (
                    <button
                      onClick={onStartMatchGame}
                      className="px-5 py-2 rounded-sm bg-[#b84c3a] hover:bg-[#a83b2a] text-white font-serif font-bold text-xs shadow-sm transition uppercase tracking-widest flex items-center space-x-1.5 animate-pulse"
                    >
                      <Sparkles className="w-4 h-4 text-[#d9a047]" />
                      <span>全窟通关！进入下一玩法：敦煌知识连连看 🎮</span>
                    </button>
                  )
                ) : (
                  <button
                    onClick={onBackToMap}
                    className="px-5 py-2 rounded-sm bg-[#b84c3a] hover:bg-[#a83b2a] text-white font-serif font-bold text-xs shadow-sm transition uppercase tracking-widest flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-4 h-4 text-[#d9a047]" />
                    <span>前往地图，修复下一个洞窟 🗺️</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
