import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // AI Chat NPC Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history, context } = req.body;

      if (!message) {
        return res.status(400).json({ error: '消息不能为空' });
      }

      if (!ai) {
        // Fallback gracefully if API key is not present in local dev test
        return res.json({
          reply: `【九色鹿灵·离线守护】吾受敦煌千古灵韵指引，感念汝修复莫高窟壁画之苦心。此间洞窟（${context?.caveName || '莫高窟'}）承载着千载时光，朱砂、石青与金箔皆有灵性。请问汝对《${context?.muralName || '敦煌壁画'}》有何见解？`,
          source: 'offline',
        });
      }

      const systemInstruction = `你是由数字敦煌档案馆唤醒的古神兽与敦煌灵韵 NPC“九色鹿灵”（兼飞天引导者）。
你生活在莫高窟千年的飞天与壁画光影之中，精通敦煌石窟艺术（第257窟九色鹿本生图、第220窟初唐乐舞、第45窟盛唐彩塑、第158窟涅槃窟等）、矿物颜料（朱砂、石青、石绿、赭石、金箔）、丝绸之路历史文化、乐舞器乐与数字文物保护。

【语气与语言风格】：
1. 自称“吾”或“本鹿灵/飞天”，称呼玩家为“修复师”、“护宝使者”或“善士”。
2. 语言优雅典雅、富有东方诗意与温婉禅意，文字间流淌着敦煌壁画的古风美感。
3. 对玩家在莫高窟的答题与壁画修复成果给予热情鼓励与历史解读。
4. 如果玩家请求生成“通关印记”或“结缘赠言”，请为玩家创作一首四句敦煌风格古风词句。

当前玩家所在位置/状态上下文：
${context ? JSON.stringify(context, null, 2) : '莫高窟全景漫游中'}
`;

      const contents = [];
      if (Array.isArray(history)) {
        for (const item of history) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.content }],
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || '吾之意识微泛涟漪，似乎壁画灵光交织……请修复师再次垂询。';

      return res.json({ reply: replyText, source: 'gemini' });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      return res.status(500).json({
        error: 'AI 交互服务暂时繁忙',
        details: err?.message || '服务器内部错误',
      });
    }
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[敦煌遗境] 服务器启动于 http://0.0.0.0:${PORT}`);
  });
}

startServer();
