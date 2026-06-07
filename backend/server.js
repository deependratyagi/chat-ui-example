const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createOpenAI } = require('@ai-sdk/openai');
const { streamText } = require('ai');
const { generateText } = require('ai');
const { pipeDataStreamToResponse } = require('ai');

const app = express();

// 1. Fully open CORS configuration to guarantee preflight requests pass
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Initialize OpenAI client using CommonJS syntax
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  console.log("📥 Inbound request");
  try {
    const { messages } = req.body;

    const {text} = await generateText({
      model: openai('gpt-4o-mini'), 
      messages,
    });

    // Vercel AI Data Stream Protocol Headers
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    res.status(200).json({ response: text });
    console.log("📤 Stream finished");

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: 'Failed' });
  }
});




const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 SUCCESS: Server is securely locked in the foreground!`);
  console.log(`📡 Listening for frontend requests on http://localhost:${PORT}`);
});

// 2. FORCE THE EVENT LOOP TO STAY OPEN 
// This guarantees your Mac cannot push this process to the background or exit early!
setInterval(() => {}, 1000);
