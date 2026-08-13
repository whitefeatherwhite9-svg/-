import React, { useState } from 'react';
import { CaveNode } from '../types';
import { X, BookOpen, Award, CheckCircle2, Sparkles, Printer, Shield, Home, RotateCcw } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface PassportModalProps {
  caves: CaveNode[];
  playerTitle: string;
  score: number;
  onClose: () => void;
  onResetGame?: () => void;
}

export const PassportModal: React.FC<PassportModalProps> = ({
  caves,
  playerTitle,
  score,
  onClose,
  onResetGame,
}) => {
  const [playerName, setPlayerName] = useState<string>('敦煌守望者');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  const restoredCount = caves.filter((c) => c.restored).length;

  const handlePrint = () => {
    audioSynth.playChime(1046.5);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3a352a]/60 backdrop-blur-sm animate-fade-in print:bg-white print:p-0 font-serif">
      <div className="relative w-full max-w-3xl bg-[#f4ece1] border-2 border-[#d9a047] rounded-sm shadow-2xl text-[#3a352a] overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#d9a047]/50 bg-[#e8dfd1] flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-sm bg-[#b84c3a] border border-[#d9a047] text-white font-serif font-bold text-lg">
              文牒
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#b84c3a] uppercase tracking-widest">
                敦煌研究院 · 数字修复通关文牒
              </h3>
              <p className="text-xs text-[#6e6454]">千载莫高窟壁画数字保护结缘凭证</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] border border-[#d9a047] text-xs transition flex items-center space-x-1 font-serif"
            >
              <Printer className="w-3.5 h-3.5 text-[#b84c3a]" />
              <span>打印文牒</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] border border-[#d9a047] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Passport Scroll Certificate Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Certificate Main Board */}
          <div className="relative p-6 sm:p-8 rounded-sm bg-[#e8dfd1]/60 border-2 border-[#d9a047] shadow-sm space-y-6 text-center">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#b84c3a]" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#b84c3a]" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#b84c3a]" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#b84c3a]" />

            <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-sm bg-[#f4ece1] border border-[#d9a047] text-[#b84c3a] font-serif text-xs">
              <Award className="w-4 h-4 text-[#d9a047]" />
              <span>大唐莫高窟与丝绸之路守护认证</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#b84c3a] tracking-widest uppercase">
              【数字壁画修宝官功德榜】
            </h2>

            {/* User Name & Title Box */}
            <div className="max-w-md mx-auto p-4 rounded-sm bg-[#f4ece1] border border-[#d9a047] flex items-center justify-between">
              <div className="text-left space-y-1">
                <div className="text-xs text-[#6e6454] font-serif">修宝官尊姓大名:</div>
                {isEditingName ? (
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    autoFocus
                    className="bg-[#f4ece1] border border-[#b84c3a] rounded-sm px-2 py-0.5 text-sm font-bold text-[#3a352a] focus:outline-none"
                  />
                ) : (
                  <div
                    onClick={() => setIsEditingName(true)}
                    className="font-serif font-bold text-base sm:text-lg text-[#3a352a] cursor-pointer hover:underline flex items-center gap-2"
                  >
                    <span>{playerName}</span>
                    <span className="text-xs font-normal text-[#b84c3a]">✏️ 编辑</span>
                  </div>
                )}
              </div>

              <div className="text-right">
                <div className="text-xs text-[#6e6454] font-serif">御赐尊号:</div>
                <div className="font-serif font-bold text-sm text-[#2c5f78]">{playerTitle}</div>
              </div>
            </div>

            {/* Cave Clearance Red Stamps Grid */}
            <div className="space-y-3 pt-2 font-serif">
              <p className="font-serif text-[#b84c3a] text-xs text-left font-bold border-b border-[#d9a047]/50 pb-1 uppercase tracking-wider">
                📍 莫高窟洞窟结缘印记 (已完成 {restoredCount} / {caves.length} 窟):
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {caves.map((cave) => (
                  <div
                    key={cave.id}
                    className={`p-3 rounded-sm border flex flex-col items-center justify-center text-center space-y-1 relative ${
                      cave.restored
                        ? 'bg-[#f4ece1] border-[#d9a047] text-[#3a352a] shadow-sm'
                        : 'bg-[#e8dfd1]/40 border-[#d9a047]/40 text-[#6e6454] opacity-60'
                    }`}
                  >
                    <div className="text-xs font-serif font-bold text-[#b84c3a]">{cave.number}</div>
                    <div className="text-[11px] truncate max-w-full font-serif">{cave.name}</div>

                    {/* Red Stamp Badge */}
                    {cave.restored ? (
                      <div className="w-10 h-10 rounded-full bg-[#b84c3a] border-2 border-[#d9a047] flex items-center justify-center text-white font-serif font-bold text-xs rotate-[-12deg] shadow-sm my-1">
                        修宝完印
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full border border-dashed border-[#6e6454] flex items-center justify-center text-[10px] text-[#6e6454] my-1">
                        待印
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Summary Stats */}
            <div className="p-4 rounded-sm bg-[#f4ece1] border border-[#d9a047] flex justify-around text-xs font-serif">
              <div>
                <span className="text-[#6e6454]">已集齐碎块:</span>{' '}
                <strong className="text-[#b84c3a] font-bold">
                  {caves.reduce((acc, c) => acc + c.collectedFragments, 0)} 块
                </strong>
              </div>
              <div>
                <span className="text-[#6e6454]">莫高窟灵韵值:</span>{' '}
                <strong className="text-[#2c5f78] font-bold">{score} 分</strong>
              </div>
            </div>

            {/* Game Completion Reset Action Banner */}
            {restoredCount === caves.length && (
              <div className="p-4 rounded-sm bg-[#f4ece1] border-2 border-[#b84c3a] text-center space-y-2 shadow-md">
                <div className="flex items-center justify-center space-x-1.5 text-[#b84c3a] font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-[#d9a047]" />
                  <span>恭喜全窟完美修宝通关！功德圆满！</span>
                </div>
                <p className="text-xs text-[#6e6454]">
                  感谢汝为敦煌壁画数字化保护作出的卓越贡献。若想开启全新修宝之旅，可点击下方重置并返回首页。
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#e8dfd1] border-t border-[#d9a047]/50 flex items-center justify-between font-serif print:hidden">
          <span className="text-xs text-[#6e6454] italic hidden sm:inline">
            “千年敦煌，因汝守望；丝路华彩，万古长青。”
          </span>

          <div className="flex items-center space-x-3 ml-auto">
            {onResetGame && (
              <button
                onClick={() => {
                  audioSynth.playChime(523.25);
                  onResetGame();
                }}
                className="px-4 py-2 rounded-sm bg-[#b84c3a] hover:bg-[#a83b2a] text-white font-serif text-xs font-bold border border-[#d9a047] shadow-sm transition flex items-center space-x-1.5 uppercase tracking-wider"
              >
                <Home className="w-3.5 h-3.5 text-[#d9a047]" />
                <RotateCcw className="w-3.5 h-3.5" />
                <span>返回首页 (重置数据)</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] border border-[#d9a047] text-xs font-serif transition"
            >
              关闭文牒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
