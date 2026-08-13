import React, { useState, useRef, useEffect } from 'react';
import { NPCMessage } from '../types';
import { apsarasAvatarImg } from '../data/dunhuangData';
import { X, Send, Sparkles, MessageCircle, RefreshCw, Feather, Scroll } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface AIGuardianDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  caveName?: string;
  playerTitle?: string;
}

export const AIGuardianDrawer: React.FC<AIGuardianDrawerProps> = ({
  isOpen,
  onClose,
  caveName = '莫高窟',
  playerTitle = '数字壁画修复师',
}) => {
  const [messages, setMessages] = useState<NPCMessage[]>([
    {
      id: 'm_init',
      sender: 'npc',
      content: `【九色鹿灵·飞天指导】\n善哉！吾乃敦煌千古壁画之灵韵所化——九色鹿灵。感念汝（${playerTitle}）于${caveName}中辛勤修复斑驳古画。\n\n关于敦煌石窟千载历史、矿物颜料秘辛、丝路乐舞或是任何修宝之困，皆可向吾垂询。`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const msgText = textToSend || inputMsg;
    if (!msgText.trim() || isLoading) return;

    audioSynth.playPluck(480, 0.2);

    const userMsg: NPCMessage = {
      id: `m_u_${Date.now()}`,
      sender: 'user',
      content: msgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msgText,
          context: { caveName, playerTitle },
          history: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      audioSynth.playChime(784);

      const npcReply: NPCMessage = {
        id: `m_n_${Date.now()}`,
        sender: 'npc',
        content: data.reply || '吾之思绪翻涌于丝路千载间……请修复师再次垂问。',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, npcReply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `m_err_${Date.now()}`,
          sender: 'npc',
          content: '【鹿灵感应】吾受壁画灵光微扰，然汝之虔诚吾已感知。请修复师稍候再次与吾对谈。',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const presetChips = [
    '九色鹿的故事有什么寓意？',
    '壁画中的朱砂和青金石颜料从何而来？',
    '飞天为何没有翅膀也能凭空飘逸？',
    '请为我撰写一首敦煌修宝古风结缘诗！',
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-[#f4ece1] border-l-2 border-[#d9a047] shadow-2xl flex flex-col text-[#3a352a] animate-slide-in">
      {/* Drawer Header */}
      <div className="p-4 bg-[#e8dfd1] border-b border-[#d9a047]/60 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={apsarasAvatarImg}
              alt="NPC 九色鹿灵"
              className="w-10 h-10 rounded-full border border-[#d9a047] object-cover shadow-sm"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#2c5f78] rounded-full ring-2 ring-[#f4ece1]" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-[#b84c3a] text-sm flex items-center gap-1.5 uppercase tracking-widest">
              <span>九色鹿灵</span>
              <span className="text-[10px] px-2 py-0.2 rounded-sm bg-[#f4ece1] text-[#2c5f78] border border-[#d9a047]">
                AI 守护导师
              </span>
            </h3>
            <p className="text-[11px] text-[#6e6454] font-serif">数字莫高窟 · 敦煌千载灵韵对话</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] text-[#3a352a] border border-[#d9a047] transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 font-serif">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="text-[10px] text-[#6e6454] mb-1 px-1 font-serif">
              {m.sender === 'user' ? '修复师' : '九色鹿灵'} · {m.timestamp}
            </div>

            <div
              className={`max-w-[85%] p-3.5 rounded-sm text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-serif ${
                m.sender === 'user'
                  ? 'bg-[#2c5f78] text-white shadow-sm border border-[#2c5f78]'
                  : 'bg-[#e8dfd1]/80 text-[#3a352a] border border-[#d9a047]/60 shadow-sm'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 p-3 rounded-sm bg-[#e8dfd1] border border-[#d9a047]/60 text-xs text-[#b84c3a] animate-pulse font-serif">
            <Sparkles className="w-4 h-4 text-[#d9a047] animate-spin" />
            <span>九色鹿灵思索于光影之中……</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Chips */}
      <div className="p-3 bg-[#e8dfd1] border-t border-[#d9a047]/60 font-serif">
        <div className="text-[11px] text-[#b84c3a] mb-2 font-serif flex items-center gap-1 font-bold">
          <Feather className="w-3 h-3" />
          <span>常问灵韵选题:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {presetChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              disabled={isLoading}
              className="text-[11px] px-2.5 py-1 rounded-sm bg-[#f4ece1] hover:bg-[#e8dfd1] border border-[#d9a047] text-[#3a352a] transition text-left truncate max-w-full font-serif"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Drawer Input Bar */}
      <div className="p-3 bg-[#e8dfd1] border-t border-[#d9a047] flex items-center space-x-2 font-serif">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="向鹿灵问话 (如: 解释第257窟色彩...)"
          className="flex-1 bg-[#f4ece1] border border-[#d9a047] rounded-sm px-3 py-2 text-xs text-[#3a352a] placeholder-[#6e6454] focus:outline-none focus:border-[#b84c3a]"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputMsg.trim() || isLoading}
          className={`p-2 rounded-sm transition ${
            !inputMsg.trim() || isLoading
              ? 'bg-[#d6ccbc] text-[#6e6454]'
              : 'bg-[#b84c3a] hover:bg-[#a83b2a] text-white shadow-sm'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
