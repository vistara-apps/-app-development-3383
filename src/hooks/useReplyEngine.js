import { useState } from 'react'
import { useOpenAI } from './useOpenAI'

const PLATFORM_CONFIGS = {
  linkedin: {
    maxLength: 3000,
    tone: 'professional',
    features: ['hashtags', 'mentions', 'links'],
    promptPrefix: 'Create a professional LinkedIn response that'
  },
  instagram: {
    maxLength: 2200,
    tone: 'casual',
    features: ['hashtags', 'emojis', 'mentions'],
    promptPrefix: 'Create an engaging Instagram response that'
  },
  twitter: {
    maxLength: 280,
    tone: 'concise',
    features: ['hashtags', 'mentions', 'threads'],
    promptPrefix: 'Create a concise Twitter response that'
  },
  facebook: {
    maxLength: 63206,
    tone: 'friendly',
    features: ['mentions', 'links', 'emojis'],
    promptPrefix: 'Create a friendly Facebook response that'
  }
}

const RESPONSE_TYPES = {
  reply: 'responds thoughtfully to the original post',
  comment: 'adds valuable insight to the conversation',
  dm: 'initiates a professional direct message conversation',
  engagement: 'encourages further discussion and engagement'
}

const TONE_VARIATIONS = {
  professional: 'maintains a professional and authoritative tone',
  casual: 'uses a friendly and approachable tone',
  enthusiastic: 'shows excitement and positive energy',
  supportive: 'offers encouragement and support',
  inquisitive: 'asks thoughtful questions to continue the conversation'
}

export const useReplyEngine = () => {
  const { generateResponse, isLoading, error } = useOpenAI()
  const [savedReplies, setSavedReplies] = useState([])
  const [replyHistory, setReplyHistory] = useState([])

  const generatePlatformOptimizedReply = async (
    originalContent,
    platform = 'linkedin',
    responseType = 'reply',
    userContext = {},
    options = {}
  ) => {
    const platformConfig = PLATFORM_CONFIGS[platform] || PLATFORM_CONFIGS.linkedin
    const responseTypeDesc = RESPONSE_TYPES[responseType] || RESPONSE_TYPES.reply
    
    const basePrompt = `${platformConfig.promptPrefix} ${responseTypeDesc}.

Original content: "${originalContent}"

Context:
- Platform: ${platform}
- User communication style: ${userContext.communicationStyle || platformConfig.tone}
- Target audience: ${userContext.audienceType || 'professionals'}
- User goals: ${userContext.goals?.join(', ') || 'increase engagement'}
- Character limit: ${platformConfig.maxLength}

Requirements:
- Keep response under ${platformConfig.maxLength} characters
- Match the ${userContext.communicationStyle || platformConfig.tone} tone
- Be authentic and add value to the conversation
- ${platformConfig.features.includes('hashtags') ? 'Include relevant hashtags if appropriate' : ''}
- ${platformConfig.features.includes('emojis') ? 'Use emojis sparingly and appropriately' : ''}
- Avoid generic responses - make it specific and personal`

    try {
      const response = await generateResponse(basePrompt, {
        communicationStyle: userContext.communicationStyle || platformConfig.tone,
        audienceType: userContext.audienceType || 'professionals',
        platform: platform
      })

      // Add to history
      const historyEntry = {
        id: Date.now(),
        originalContent,
        response,
        platform,
        responseType,
        timestamp: new Date().toISOString(),
        characterCount: response.length,
        used: false
      }

      setReplyHistory(prev => [historyEntry, ...prev.slice(0, 49)]) // Keep last 50

      return {
        response,
        characterCount: response.length,
        platform,
        withinLimit: response.length <= platformConfig.maxLength,
        suggestions: await generateVariations(basePrompt, userContext, platform)
      }
    } catch (err) {
      console.error('Error generating platform-optimized reply:', err)
      throw err
    }
  }

  const generateVariations = async (basePrompt, userContext, platform) => {
    const variations = []
    const tones = Object.keys(TONE_VARIATIONS)
    
    try {
      // Generate 3 different tone variations
      for (let i = 0; i < 3; i++) {
        const tone = tones[i] || 'professional'
        const toneDesc = TONE_VARIATIONS[tone]
        const variationPrompt = `${basePrompt}\n\nAdditional requirement: ${toneDesc}`
        
        const variation = await generateResponse(variationPrompt, {
          ...userContext,
          communicationStyle: tone,
          platform: platform
        })
        
        variations.push({
          tone,
          response: variation,
          characterCount: variation.length
        })
      }
    } catch (err) {
      console.error('Error generating variations:', err)
    }

    return variations
  }

  const saveReply = (reply, tags = []) => {
    const savedReply = {
      id: Date.now(),
      content: reply.response,
      platform: reply.platform,
      tags,
      timestamp: new Date().toISOString(),
      useCount: 0
    }

    setSavedReplies(prev => [savedReply, ...prev])
    return savedReply
  }

  const markReplyAsUsed = (historyId) => {
    setReplyHistory(prev => 
      prev.map(entry => 
        entry.id === historyId 
          ? { ...entry, used: true }
          : entry
      )
    )
  }

  const getReplyStats = () => {
    const totalGenerated = replyHistory.length
    const totalUsed = replyHistory.filter(entry => entry.used).length
    const platformBreakdown = replyHistory.reduce((acc, entry) => {
      acc[entry.platform] = (acc[entry.platform] || 0) + 1
      return acc
    }, {})

    return {
      totalGenerated,
      totalUsed,
      usageRate: totalGenerated > 0 ? (totalUsed / totalGenerated * 100).toFixed(1) : 0,
      platformBreakdown,
      averageLength: replyHistory.length > 0 
        ? Math.round(replyHistory.reduce((sum, entry) => sum + entry.characterCount, 0) / replyHistory.length)
        : 0
    }
  }

  const searchSavedReplies = (query) => {
    return savedReplies.filter(reply => 
      reply.content.toLowerCase().includes(query.toLowerCase()) ||
      reply.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
  }

  return {
    generatePlatformOptimizedReply,
    saveReply,
    markReplyAsUsed,
    savedReplies,
    replyHistory,
    getReplyStats,
    searchSavedReplies,
    isLoading,
    error,
    platformConfigs: PLATFORM_CONFIGS
  }
}
