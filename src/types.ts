export interface CaveNode {
  id: string;
  number: string; // e.g. "第257窟"
  name: string;   // e.g. "九色鹿本生图"
  era: string;    // e.g. "北魏"
  title: string;
  description: string;
  image: string;
  restoredImage: string;
  locked: boolean;
  restored: boolean;
  totalFragments: number;
  collectedFragments: number;
  coordinates: { x: number; y: number }; // Percentage position on map
}

export interface QuizQuestion {
  id: string;
  caveId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  pigmentName?: string;
}

export interface FragmentItem {
  id: string;
  caveId: string;
  name: string;
  description: string;
  imagePiece: string; // Visual graphic or color key
  targetX: number;    // % position in workshop canvas
  targetY: number;    // % position in workshop canvas
  isPlaced: boolean;
}

export interface HotspotPin {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  content: string;
}

export interface NPCMessage {
  id: string;
  sender: 'user' | 'npc';
  content: string;
  timestamp: string;
}

export interface PlayerProgress {
  currentCaveId: string;
  restoredCaveIds: string[];
  collectedFragmentIds: string[];
  quizAnswers: Record<string, number>; // questionId -> selectedIndex
  culturalSeals: string[]; // Earned titles
  playerTitle: string;
  score: number;
}
