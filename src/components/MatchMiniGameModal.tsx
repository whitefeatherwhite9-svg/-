import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, RotateCcw, Brain, BookOpen } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface TileCard {
  id: string;
  pairId: string;
  title: string;
  subtitle: string;
  icon: string;
  category: string;
}

const TILE_PAIRS_DATA = [
  {
    pairId: 'cinnabar',
    a: { title: '朱砂颜料', subtitle: '莫高窟红色壁画源泉', icon: '🎨', category: '矿物色彩' },
    b: { title: '辰砂天然矿石', subtitle: '硫化汞成分千载不褪', icon: '⛏️', category: '矿物起源' },
  },
  {
    pairId: 'lapis',
    a: { title: '青金石颜料', subtitle: '佛像宝蓝袈裟主色', icon: '💎', category: '矿物色彩' },
    b: { title: '西域天然深矿', subtitle: '经古丝绸之路传入', icon: '🐪', category: '丝路贸易' },
  },
  {
    pairId: 'cave257',
    a: { title: '九色鹿本生图', subtitle: '劝善惩恶舍己救人', icon: '🦌', category: '典故故事' },
    b: { title: '莫高窟第257窟', subtitle: '北魏壁画代表巨作', icon: '📜', category: '洞窟坐标' },
  },
  {
    pairId: 'pipa',
    a: { title: '反弹琵琶图', subtitle: '飞天姿态绝世乐舞', icon: '🪕', category: '丝路乐舞' },
    b: { title: '莫高窟第112窟', subtitle: '中唐盛世乐舞壁画', icon: '🏛️', category: '洞窟坐标' },
  },
  {
    pairId: 'turquoise',
    a: { title: '绿松石颜料', subtitle: '壁画青绿山水基调', icon: '🌿', category: '矿物色彩' },
    b: { title: '天然含铜铜矿', subtitle: '经研磨调胶成颜料', icon: '🪨', category: '古法工艺' },
  },
  {
    pairId: 'bili',
    a: { title: '筚篥管乐', subtitle: '古丝绸之路管乐器', icon: '🎺', category: '古乐复原' },
    b: { title: '龟兹西域遗韵', subtitle: '隋唐宫廷燕乐之源', icon: '🎶', category: '音律文化' },
  },
];

interface MatchMiniGameModalProps {
  onClose: () => void;
  onComplete: () => void;
}

export const MatchMiniGameModal: React.FC<MatchMiniGameModalProps> = ({ onClose, onComplete }) => {
  const [cards, setCards] = useState<TileCard[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Initialize and shuffle cards
  const initGame = () => {
    const list: TileCard[] = [];
    TILE_PAIRS_DATA.forEach((pair) => {
      list.push({ id: `${pair.pairId}-a`, pairId: pair.pairId, ...pair.a });
      list.push({ id: `${pair.pairId}-b`, pairId: pair.pairId, ...pair.b });
    });

    // Fisher-Yates shuffle
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }

    setCards(list);
    setSelectedIndices([]);
    setMatchedPairIds([]);
    setIsFinished(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (idx: number) => {
    if (isChecking || selectedIndices.includes(idx)) return;
    const clickedCard = cards[idx];
    if (matchedPairIds.includes(clickedCard.pairId)) return;

    audioSynth.playPluck(300 + idx * 20, 0.2);

    const newSelected = [...selectedIndices, idx];
    setSelectedIndices(newSelected);

    if (newSelected.length === 2) {
      setIsChecking(true);
      const [firstIdx, secondIdx] = newSelected;
      const card1 = cards[firstIdx];
      const card2 = cards[secondIdx];

      if (card1.pairId === card2.pairId) {
        // Matched!
        audioSynth.playSuccessArpeggio();
        const updatedMatched = [...matchedPairIds, card1.pairId];
        setMatchedPairIds(updatedMatched);
        setSelectedIndices([]);
        setIsChecking(false);

        if (updatedMatched.length === TILE_PAIRS_DATA.length) {
          setIsFinished(true);
          setTimeout(() => {
            onComplete();
          }, 1500);
        }
      } else {
        // Mismatch - flip back
        setTimeout(() => {
          setSelectedIndices([]);
          setIsChecking(false);
        }, 800);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3a352a]/70 backdrop-blur-md animate-fade-in font-serif">
      <div className="relative w-full max-w-3xl bg-[#f4ece1] border-2 border-[#d9a047] rounded-sm shadow-2xl text-[#3a352a] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#d9a047]/50 bg-[#e8dfd1] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-sm bg-[#f4ece1] border border-[#d9a047] text-[#b84c3a]">
              <Brain className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#b84c3a] uppercase tracking-widest flex items-center gap-2">
                <span>🧩</span> 敦煌文化连连看 · 研习考验
              </h3>
              <p className="text-xs text-[#6e6454]">配对相同主题的颜料、矿物与洞窟艺术知识</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={initGame}
              className="p-1.5 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] border border-[#d9a047] transition text-xs flex items-center space-x-1"
              title="重新洗牌"
            >
              <RotateCcw className="w-4 h-4 text-[#b84c3a]" />
              <span className="hidden sm:inline">洗牌</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] border border-[#d9a047] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="p-3 bg-[#e8dfd1]/80 border-b border-[#d9a047]/40 flex items-center justify-between text-xs font-serif px-6">
          <span className="text-[#3a352a]">
            知识配对进度:{' '}
            <strong className="text-[#b84c3a]">
              {matchedPairIds.length} / {TILE_PAIRS_DATA.length} 对
            </strong>
          </span>
          <div className="flex items-center space-x-1 text-[#2c5f78] font-bold">
            <Sparkles className="w-4 h-4 text-[#d9a047]" />
            <span>千载灵韵相扣</span>
          </div>
        </div>

        {/* Game Tiles Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {cards.map((card, idx) => {
              const isSelected = selectedIndices.includes(idx);
              const isMatched = matchedPairIds.includes(card.pairId);

              let cardStyle =
                'bg-[#f4ece1] border-[#d9a047]/80 text-[#3a352a] hover:border-[#b84c3a] hover:bg-[#e8dfd1] shadow-sm';
              if (isMatched) {
                cardStyle = 'bg-[#2c5f78] border-[#2c5f78] text-white opacity-85 shadow-inner cursor-default';
              } else if (isSelected) {
                cardStyle =
                  'bg-[#e8dfd1] border-2 border-[#b84c3a] text-[#b84c3a] font-bold shadow-md scale-105 ring-2 ring-[#d9a047]/50';
              }

              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  disabled={isMatched || isChecking}
                  className={`p-3 sm:p-4 rounded-sm border transition-all duration-200 flex flex-col items-center justify-between min-h-[110px] text-center relative group ${cardStyle}`}
                >
                  <span className="text-xs px-2 py-0.5 rounded-sm bg-[#e8dfd1]/60 text-[#b84c3a] border border-[#d9a047]/40 mb-1 self-start font-mono text-[10px]">
                    {card.category}
                  </span>

                  <div className="text-2xl my-1 group-hover:scale-110 transition">{card.icon}</div>

                  <div>
                    <div className="text-xs sm:text-sm font-bold font-serif">{card.title}</div>
                    <div className="text-[10px] opacity-80 mt-0.5 line-clamp-1">{card.subtitle}</div>
                  </div>

                  {isMatched && (
                    <CheckCircle2 className="w-4 h-4 text-white absolute top-2 right-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Completion Celebration Notification */}
          {isFinished && (
            <div className="mt-6 p-4 rounded-sm bg-[#e8dfd1] border-2 border-[#b84c3a] text-center space-y-3 animate-bounce shadow-lg">
              <div className="text-lg font-serif font-bold text-[#b84c3a] flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d9a047]" />
                <span>🎉 连连看考验大获全胜！自动开启科普知识大典...</span>
              </div>
              <p className="text-xs text-[#3a352a]">
                汝已贯通莫高窟颜料、洞窟与西域艺术脉络！即刻呈现敦煌科学与文化知识卡！
              </p>
              <button
                onClick={onComplete}
                className="px-6 py-2 rounded-sm bg-[#b84c3a] hover:bg-[#a83b2a] text-white font-serif font-bold text-xs shadow-md transition uppercase tracking-widest flex items-center space-x-1.5 mx-auto"
              >
                <BookOpen className="w-4 h-4" />
                <span>阅读科普详解 & 领取通关文牒</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#e8dfd1] border-t border-[#d9a047]/50 text-center text-xs text-[#6e6454] font-serif italic">
          “万物相连，千载同心 · 敦煌艺术与自然的奇妙交融”
        </div>
      </div>
    </div>
  );
};
