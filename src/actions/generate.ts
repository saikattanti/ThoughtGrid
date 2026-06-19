'use server'

import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

export type AIModel = 'grok-3-mini' | 'grok-3' | 'gemini-flash-latest' | 'gpt-4o-mini'

const MODEL_CONFIGS: Record<AIModel, { provider: 'xai' | 'openai' | 'google'; label: string }> = {
  'grok-3-mini':       { provider: 'xai',    label: 'Grok 3 Mini (xAI)' },
  'grok-3':            { provider: 'xai',    label: 'Grok 3 (xAI)' },
  'gemini-flash-latest': { provider: 'google', label: 'Gemini Flash (Google)' },
  'gpt-4o-mini':       { provider: 'openai', label: 'GPT-4o Mini (OpenAI)' },
}

export async function generateLinkedInPost(
  url: string,
  title: string,
  style: string,
  model: AIModel = 'grok-3-mini'
) {
  const prompt = `You are an expert LinkedIn ghostwriter. 
Write a highly engaging LinkedIn post based on the following article:
Title: "${title}"
URL: "${url}"

Writing Style: ${style}

Requirements:
1. Start with a scroll-stopping hook.
2. Provide 2-3 key takeaways.
3. End with a strong Call to Action (CTA) asking a question to drive engagement.
4. Include 3-5 relevant hashtags at the bottom.
5. Do not use cringey corporate jargon. Keep it authentic.

Return ONLY the content of the post.`

  try {
    const config = MODEL_CONFIGS[model]

    // Google Gemini
    if (config.provider === 'google') {
      const apiKey = process.env.GEMINI_API_KEY
      if (!apiKey) throw new Error('GEMINI_API_KEY is not set')
      const genAI = new GoogleGenerativeAI(apiKey)
      const geminiModel = genAI.getGenerativeModel({ model })
      const result = await geminiModel.generateContent(prompt)
      return { success: true, text: result.response.text() }
    }

    // OpenAI-compatible (xAI Grok or OpenAI)
    const isXai = config.provider === 'xai'
    const apiKey = isXai ? process.env.GROK_API_KEY : process.env.OPENAI_API_KEY
    if (!apiKey) throw new Error(`API key for ${config.label} is not set`)

    const client = new OpenAI({
      apiKey,
      ...(isXai ? { baseURL: 'https://api.x.ai/v1' } : {}),
    })

    const response = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 600,
    })

    const text = response.choices[0]?.message?.content
    if (!text) throw new Error('No content generated')
    return { success: true, text }

  } catch (error: any) {
    console.error('Generation error:', error)
    return { success: false, error: error.message || 'Failed to generate post' }
  }
}
