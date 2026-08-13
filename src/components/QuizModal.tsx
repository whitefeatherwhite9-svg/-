import React, { useState } from 'react';
import { CaveNode, QuizQuestion } from '../types';
import { X, HelpCircle, CheckCircle, AlertCircle, Sparkles, ArrowRight, BookOpen, Lightbulb, FastForward } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface QuizModalProps {
  cave: CaveNode;
  questions: QuizQuestion[];
  collectedCount: number;
  onClose: () => void;
  onQuestionCorrect: (questionId: string) => void;
  onGoToWorkshop: () => void;
  onSkipQuiz?: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  cave,
  questions,
  collectedCount,
  onClose,
  onQuestionCorrect,
  onGoToWorkshop,
  onSkipQuiz,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(collectedCount);

  const currentQ = questions[currentIdx];
  const isFinished = currentIdx >= questions.length;

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOpt === null || isSubmitted) return;

    setIsSubmitted(true);
    if (selectedOpt === currentQ.correctIndex) {
      audioSynth.playSuccessArpeggio();
      setCorrectCount((prev) => Math.min(cave.totalFragments, prev + 1));
      onQuestionCorrect(currentQ.id);
    } else {
      audioSynth.playErrorTone();
    }
  };

  const handleNextQuestion = () => {
    setSelectedOpt(null);
    setIsSubmitted(false);
    setShowHint(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(questions.length); // Finished state
    }
  };

  const handleSkip = () => {
    audioSynth.playSuccessArpeggio();
    setCorrectCount(cave.totalFragments);
    setCurrentIdx(questions.length);
    if (onSkipQuiz) {
      onSkipQuiz();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3a352a]/60 backdrop-blur-sm animate-fade-in">
      {/* Scroll Styled Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#f4ece1] border-2 border-[#d9a047] rounded-sm shadow-2xl text-[#3a352a] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Scroll End Handles Texture Effect */}
        <div className="h-2 bg-[#d9a047] border-b border-[#b84c3a]/40" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#d9a047]/50 bg-[#e8dfd1] flex items-center justify-between">
          <div>
            <span className="text-xs font-serif px-2.5 py-0.5 rounded-sm bg-[#f4ece1] text-[#b84c3a] border border-[#d9a047]">
              {cave.number} · {cave.era}
            </span>
            <h3 className="text-xl font-serif font-bold text-[#b84c3a] mt-1 flex items-center gap-2 uppercase tracking-widest">
              <span>📜</span> {cave.name} · 洞窟问答卷轴
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            {!isFinished && correctCount < cave.totalFragments && (
              <button
                onClick={handleSkip}
                className="px-3 py-1.5 rounded-sm bg-[#b84c3a] hover:bg-[#a83b2a] text-white text-xs font-serif font-bold border border-[#d9a047] transition flex items-center space-x-1 shadow-sm"
                title="跳过答题并自动集齐碎片"
              >
                <FastForward className="w-3.5 h-3.5 text-[#d9a047]" />
                <span>跳过答题</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] border border-[#d9a047] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Progress & Fragment Counters */}
          <div className="flex items-center justify-between p-3 rounded-sm bg-[#e8dfd1]/80 border border-[#d9a047]/60 text-xs font-serif">
            <span className="text-[#3a352a]">
              题目进度: <strong className="text-[#b84c3a]">{Math.min(currentIdx + 1, questions.length)} / {questions.length}</strong>
            </span>
            <div className="flex items-center space-x-1.5 font-bold text-[#b84c3a]">
              <Sparkles className="w-4 h-4 text-[#d9a047] animate-pulse" />
              <span>已获取碎片: {correctCount} / {cave.totalFragments}</span>
            </div>
          </div>

          {!isFinished && currentQ ? (
            <div className="space-y-5">
              {/* Question Text */}
              <div className="p-4 rounded-sm bg-[#e8dfd1]/50 border border-[#d9a047]/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-serif text-[#b84c3a] flex items-center gap-1 uppercase tracking-widest">
                    <BookOpen className="w-3.5 h-3.5" /> 考问第 {currentIdx + 1} 题
                  </span>
                  {currentQ.pigmentName && (
                    <span className="text-[11px] px-2 py-0.5 rounded-sm bg-[#2c5f78] text-white">
                      🎨 矿物知识: {currentQ.pigmentName}
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-base sm:text-lg font-semibold text-[#3a352a] leading-relaxed">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5 font-serif">
                {currentQ.options.map((opt, idx) => {
                  let optStyle = 'bg-[#f4ece1] border-[#d9a047]/60 text-[#3a352a] hover:border-[#b84c3a] hover:bg-[#e8dfd1]';

                  if (isSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      optStyle = 'bg-[#2c5f78] border-[#2c5f78] text-white font-bold';
                    } else if (idx === selectedOpt) {
                      optStyle = 'bg-[#b84c3a] border-[#b84c3a] text-white';
                    } else {
                      optStyle = 'bg-[#e8dfd1] border-[#d9a047]/40 text-[#6e6454] opacity-60';
                    }
                  } else if (selectedOpt === idx) {
                    optStyle = 'bg-[#e8dfd1] border-[#b84c3a] text-[#b84c3a] font-bold shadow-sm';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isSubmitted}
                      className={`w-full p-3.5 rounded-sm border text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between ${optStyle}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-serif shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSubmitted && idx === currentQ.correctIndex && (
                        <CheckCircle className="w-5 h-5 text-white shrink-0" />
                      )}
                      {isSubmitted && selectedOpt === idx && idx !== currentQ.correctIndex && (
                        <AlertCircle className="w-5 h-5 text-white shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Hint Toggle */}
              {!isSubmitted && (
                <div className="text-right">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs text-[#b84c3a] hover:underline flex items-center space-x-1 ml-auto font-serif"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{showHint ? '隐藏灵感提示' : '获取鹿灵提示'}</span>
                  </button>
                  {showHint && (
                    <p className="mt-2 text-xs text-[#3a352a] italic bg-[#e8dfd1] p-2.5 rounded-sm border border-[#d9a047] text-left font-serif">
                      💡 鹿灵指引：{currentQ.hint}
                    </p>
                  )}
                </div>
              )}

              {/* Explanation Post-submit */}
              {isSubmitted && (
                <div className={`p-4 rounded-sm border text-xs sm:text-sm leading-relaxed space-y-2 animate-fade-in font-serif ${
                  selectedOpt === currentQ.correctIndex
                    ? 'bg-[#e8dfd1] border-[#2c5f78] text-[#2c5f78]'
                    : 'bg-[#e8dfd1] border-[#b84c3a] text-[#b84c3a]'
                }`}>
                  <div className="font-serif font-bold flex items-center gap-1.5 text-[#3a352a]">
                    {selectedOpt === currentQ.correctIndex ? (
                      <>✨ 诚至金开！获得 1 块壁画灵韵碎片！</>
                    ) : (
                      <>❌ 未竟其意，历史真相如下：</>
                    )}
                  </div>
                  <p className="text-[#3a352a]">{currentQ.explanation}</p>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completion Summary */
            <div className="py-8 text-center space-y-5 font-serif">
              <div className="w-16 h-16 rounded-full bg-[#e8dfd1] border border-[#d9a047] mx-auto flex items-center justify-center text-3xl shadow-sm">
                ✨
              </div>
              <h4 className="text-2xl font-serif font-bold text-[#b84c3a]">
                【{cave.name}】问答集结完成！
              </h4>
              <p className="text-[#3a352a] text-sm max-w-md mx-auto">
                汝已成功通过敦煌历史文化考验，已获得{' '}
                <strong className="text-[#b84c3a] font-bold">{correctCount}</strong> / {cave.totalFragments} 块壁画碎片！
              </p>

              {correctCount >= cave.totalFragments ? (
                <div className="p-4 rounded-sm bg-[#e8dfd1] border border-[#d9a047] text-[#2c5f78] text-xs sm:text-sm font-bold">
                  🎉 碎片已齐聚！随时可开启数字工坊，使用灵韵画笔修复壁画！
                </div>
              ) : (
                <div className="p-4 rounded-sm bg-[#e8dfd1] border border-[#d9a047]/60 text-[#6e6454] text-xs">
                  碎片尚未完全集齐，可以重答或继续探索其他洞窟。
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-[#e8dfd1] border-t border-[#d9a047]/50 flex items-center justify-between font-serif">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] border border-[#d9a047] text-xs font-medium transition"
          >
            返回洞窟地图
          </button>

          {!isFinished ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSkip}
                className="px-3.5 py-2 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#b84c3a] border border-[#d9a047] text-xs font-serif font-bold transition flex items-center space-x-1 shadow-sm"
                title="跳过答题，自动集齐碎片"
              >
                <FastForward className="w-3.5 h-3.5 text-[#b84c3a]" />
                <span>跳过答题</span>
              </button>

              {!isSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOpt === null}
                  className={`px-6 py-2 rounded-sm font-serif text-xs sm:text-sm font-bold transition uppercase tracking-wider ${
                    selectedOpt === null
                      ? 'bg-[#d6ccbc] text-[#6e6454] cursor-not-allowed border border-[#d9a047]/40'
                      : 'bg-[#b84c3a] hover:bg-[#a83b2a] text-white border border-[#d9a047] shadow-sm'
                  }`}
                >
                  确认回答
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2 rounded-sm bg-[#2c5f78] hover:bg-[#1e4a60] text-white font-serif text-xs sm:text-sm font-bold transition flex items-center space-x-1"
                >
                  <span>{currentIdx < questions.length - 1 ? '下一题' : '查看结算'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            correctCount >= cave.totalFragments && (
              <button
                onClick={onGoToWorkshop}
                className="px-6 py-2.5 rounded-sm bg-[#b84c3a] hover:bg-[#a83b2a] text-white font-serif text-sm font-bold border border-[#d9a047] shadow-md transition flex items-center space-x-2 uppercase tracking-widest"
              >
                <Sparkles className="w-4 h-4 text-[#d9a047]" />
                <span>进入壁画修复工坊</span>
              </button>
            )
          )}
        </div>

        <div className="h-2 bg-[#d9a047] border-t border-[#b84c3a]/40" />
      </div>
    </div>
  );
};
