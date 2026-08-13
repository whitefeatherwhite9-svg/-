import React, { useState, useEffect } from 'react';
import { CaveNode } from './types';
import { CAVES_DATA, QUIZ_QUESTIONS } from './data/dunhuangData';
import { HeaderNavbar } from './components/HeaderNavbar';
import { LandingHero } from './components/LandingHero';
import { CaveMap } from './components/CaveMap';
import { QuizModal } from './components/QuizModal';
import { RestorationWorkshop } from './components/RestorationWorkshop';
import { StoryModal } from './components/StoryModal';
import { AIGuardianDrawer } from './components/AIGuardianDrawer';
import { InstrumentMiniGame } from './components/InstrumentMiniGame';
import { PigmentLabModal } from './components/PigmentLabModal';
import { PassportModal } from './components/PassportModal';
import { MatchMiniGameModal } from './components/MatchMiniGameModal';
import { KnowledgeDetailModal } from './components/KnowledgeDetailModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'landing' | 'map' | 'workshop'>('landing');

  const [caves, setCaves] = useState<CaveNode[]>(() => {
    const saved = localStorage.getItem('dunhuang_caves_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return CAVES_DATA;
  });

  const [selectedCaveId, setSelectedCaveId] = useState<string>('cave_257');
  const [score, setScore] = useState<number>(() => {
    const saved = localStorage.getItem('dunhuang_score');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Modal Controls
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);
  const [isInstrumentsOpen, setIsInstrumentsOpen] = useState<boolean>(false);
  const [isPigmentLabOpen, setIsPigmentLabOpen] = useState<boolean>(false);
  const [isPassportOpen, setIsPassportOpen] = useState<boolean>(false);
  const [isMatchGameOpen, setIsMatchGameOpen] = useState<boolean>(false);
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState<boolean>(false);

  // Save progress
  useEffect(() => {
    localStorage.setItem('dunhuang_caves_state', JSON.stringify(caves));
  }, [caves]);

  useEffect(() => {
    localStorage.setItem('dunhuang_score', score.toString());
  }, [score]);

  // Derived active cave
  const activeCave = caves.find((c) => c.id === selectedCaveId) || caves[0];

  // Dynamic Title Calculation
  const totalRestored = caves.filter((c) => c.restored).length;
  let playerTitle = '初级壁画修复师';
  if (totalRestored === 1) playerTitle = '二级修宝名家';
  if (totalRestored === 2) playerTitle = '三级数字典籍者';
  if (totalRestored === 3) playerTitle = '高级莫高窟御灵使';
  if (totalRestored >= 4) playerTitle = '千古莫高窟护宝天师';

  // Handlers
  const handleSelectCave = (cave: CaveNode) => {
    setSelectedCaveId(cave.id);
    if (cave.collectedFragments >= cave.totalFragments) {
      setCurrentTab('workshop');
    } else {
      setIsQuizModalOpen(true);
    }
  };

  const handleOpenWorkshop = (cave: CaveNode) => {
    setSelectedCaveId(cave.id);
    setCurrentTab('workshop');
  };

  const handleOpenStory = (cave: CaveNode) => {
    setSelectedCaveId(cave.id);
    setIsStoryModalOpen(true);
  };

  const handleQuestionCorrect = (questionId: string) => {
    setScore((prev) => prev + 50);

    setCaves((prev) =>
      prev.map((cave) => {
        if (cave.id === selectedCaveId) {
          const newCollected = Math.min(cave.totalFragments, cave.collectedFragments + 1);
          return { ...cave, collectedFragments: newCollected };
        }
        return cave;
      })
    );
  };

  const handleSkipQuiz = () => {
    setCaves((prev) =>
      prev.map((cave) => {
        if (cave.id === selectedCaveId) {
          const missing = cave.totalFragments - cave.collectedFragments;
          if (missing > 0) {
            setScore((s) => s + missing * 50);
          }
          return { ...cave, collectedFragments: cave.totalFragments };
        }
        return cave;
      })
    );
  };

  const handleCompleteRestoration = (caveId: string) => {
    setScore((prev) => prev + 200);

    setCaves((prevCaves) => {
      const updated = prevCaves.map((c) => {
        if (c.id === caveId) {
          return { ...c, restored: true };
        }
        return c;
      });

      // Unlock next cave in sequence
      const restoredIndex = updated.findIndex((c) => c.id === caveId);
      if (restoredIndex >= 0 && restoredIndex < updated.length - 1) {
        updated[restoredIndex + 1].locked = false;
      }

      // Check if all caves are now restored!
      const allRestoredNow = updated.every((c) => c.restored);
      if (allRestoredNow) {
        setTimeout(() => {
          setIsMatchGameOpen(true);
        }, 1500);
      }

      return updated;
    });
  };

  const handleResetGame = () => {
    localStorage.removeItem('dunhuang_caves_state');
    localStorage.removeItem('dunhuang_score');
    setCaves(JSON.parse(JSON.stringify(CAVES_DATA)));
    setScore(0);
    setSelectedCaveId('cave_257');
    setCurrentTab('landing');
    setIsQuizModalOpen(false);
    setIsStoryModalOpen(false);
    setIsAIChatOpen(false);
    setIsInstrumentsOpen(false);
    setIsPigmentLabOpen(false);
    setIsMatchGameOpen(false);
    setIsKnowledgeModalOpen(false);
    setIsPassportOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-amber-50 selection:bg-amber-600 selection:text-stone-950">
      {/* Navbar */}
      <HeaderNavbar
        playerTitle={playerTitle}
        score={score}
        totalRestored={totalRestored}
        totalCaves={caves.length}
        isAllCavesRestored={caves.every((c) => c.restored)}
        onOpenAIChat={() => setIsAIChatOpen(true)}
        onOpenInstruments={() => setIsInstrumentsOpen(true)}
        onOpenPigmentLab={() => setIsPigmentLabOpen(true)}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenMatchGame={() => setIsMatchGameOpen(true)}
        onResetGame={handleResetGame}
        currentTab={currentTab}
        onGoToMap={() => setCurrentTab('map')}
      />

      {/* Main Content Router */}
      <main>
        {currentTab === 'landing' && (
          <LandingHero
            onStartExplore={() => setCurrentTab('map')}
            onOpenAIChat={() => setIsAIChatOpen(true)}
          />
        )}

        {currentTab === 'map' && (
          <CaveMap
            caves={caves}
            onSelectCave={handleSelectCave}
            onOpenStory={handleOpenStory}
            onOpenWorkshop={handleOpenWorkshop}
          />
        )}

        {currentTab === 'workshop' && (
          <RestorationWorkshop
            cave={activeCave}
            isAllCavesRestored={caves.every((c) => c.restored)}
            onCompleteRestoration={handleCompleteRestoration}
            onBackToMap={() => setCurrentTab('map')}
            onStartMatchGame={() => setIsMatchGameOpen(true)}
            onOpenStory={(cave) => {
              setSelectedCaveId(cave.id);
              setIsStoryModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Quiz Scroll Modal */}
      {isQuizModalOpen && (
        <QuizModal
          cave={activeCave}
          questions={QUIZ_QUESTIONS[activeCave.id] || []}
          collectedCount={activeCave.collectedFragments}
          onClose={() => setIsQuizModalOpen(false)}
          onQuestionCorrect={handleQuestionCorrect}
          onSkipQuiz={handleSkipQuiz}
          onGoToWorkshop={() => {
            setIsQuizModalOpen(false);
            setCurrentTab('workshop');
          }}
        />
      )}

      {/* Restored Story & Full Image Modal */}
      {isStoryModalOpen && (
        <StoryModal
          cave={activeCave}
          onClose={() => setIsStoryModalOpen(false)}
          onOpenPassport={() => setIsPassportOpen(true)}
        />
      )}

      {/* AI Guardian NPC Chat Drawer */}
      <AIGuardianDrawer
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        caveName={activeCave.name}
        playerTitle={playerTitle}
      />

      {/* Silk Road Ancient Instrument Mini-Game */}
      {isInstrumentsOpen && (
        <InstrumentMiniGame onClose={() => setIsInstrumentsOpen(false)} />
      )}

      {/* Mineral Pigment Laboratory Modal */}
      {isPigmentLabOpen && (
        <PigmentLabModal onClose={() => setIsPigmentLabOpen(false)} />
      )}

      {/* Dunhuang Knowledge Match-2 Mini Game Modal */}
      {isMatchGameOpen && (
        <MatchMiniGameModal
          onClose={() => setIsMatchGameOpen(false)}
          onComplete={() => {
            setIsMatchGameOpen(false);
            setIsKnowledgeModalOpen(true);
          }}
        />
      )}

      {/* Educational Knowledge Details Modal */}
      {isKnowledgeModalOpen && (
        <KnowledgeDetailModal
          onClose={() => setIsKnowledgeModalOpen(false)}
          onOpenPassport={() => setIsPassportOpen(true)}
        />
      )}

      {/* Digital Passport & Clearance Seals Modal */}
      {isPassportOpen && (
        <PassportModal
          caves={caves}
          playerTitle={playerTitle}
          score={score}
          onClose={() => setIsPassportOpen(false)}
          onResetGame={handleResetGame}
        />
      )}
    </div>
  );
}
