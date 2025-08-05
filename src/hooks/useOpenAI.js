import { useState } from 'react'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: "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",
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
})

export const useOpenAI = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateResponse = async (prompt, context = {}) => {
    setIsLoading(true)
    setError(null)

    try {
      const systemPrompt = `You are an AI assistant helping users create engaging social media responses. 
      Consider the user's communication style: ${context.communicationStyle || 'professional'}.
      Target audience: ${context.audienceType || 'general professional network'}.
      Keep responses authentic, engaging, and appropriate for the platform.`

      const completion = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-001",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        max_tokens: 150,
        temperature: 0.7,
      })

      return completion.choices[0].message.content
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const generateContentSuggestions = async (audienceInterests, recentPerformance) => {
    setIsLoading(true)
    setError(null)

    try {
      const prompt = `Generate 3 content suggestions for a professional social media account.
      Audience interests: ${audienceInterests.join(', ')}.
      Recent post performance indicates they engage well with: ${recentPerformance}.
      Make suggestions specific, actionable, and engaging.`

      const completion = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-001",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.8,
      })

      return completion.choices[0].message.content.split('\n').filter(s => s.trim())
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const generateSchedulingRecommendations = async (audienceData, goals) => {
    setIsLoading(true)
    setError(null)

    try {
      const prompt = `Recommend optimal posting times for social media based on:
      Audience engagement patterns: Most active during business hours and early evening
      Goals: ${goals.join(', ')}
      Provide 3 specific time recommendations with rationale.`

      const completion = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-001",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.6,
      })

      return completion.choices[0].message.content
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    generateResponse,
    generateContentSuggestions,
    generateSchedulingRecommendations,
    isLoading,
    error
  }
}