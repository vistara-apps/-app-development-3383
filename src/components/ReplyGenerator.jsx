import React, { useState, useEffect } from 'react'
import { useReplyEngine } from '../hooks/useReplyEngine'
import { useUser } from '../context/UserContext'
import { 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Save, 
  BarChart3,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const PLATFORM_ICONS = {
  linkedin: '💼',
  instagram: '📸',
  twitter: '🐦',
  facebook: '👥'
}

const ReplyGenerator = ({ initialContent = '', onReplyGenerated }) => {
  const { user } = useUser()
  const {
    generatePlatformOptimizedReply,
    saveReply,
    markReplyAsUsed,
    isLoading,
    error,
    platformConfigs
  } = useReplyEngine()

  const [inputContent, setInputContent] = useState(initialContent)
  const [selectedPlatform, setSelectedPlatform] = useState('linkedin')
  const [responseType, setResponseType] = useState('reply')
  const [generatedReply, setGeneratedReply] = useState(null)
  const [variations, setVariations] = useState([])
  const [selectedVariation, setSelectedVariation] = useState(0)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [customTone, setCustomTone] = useState('')

  useEffect(() => {
    if (initialContent) {
      setInputContent(initialContent)
    }
  }, [initialContent])

  const handleGenerate = async () => {
    if (!inputContent.trim()) return

    try {
      const result = await generatePlatformOptimizedReply(
        inputContent,
        selectedPlatform,
        responseType,
        {
          communicationStyle: user?.communication_style || 'professional',
          audienceType: user?.audience_preferences?.demographics || 'professionals',
          goals: user?.goals || ['increase_engagement']
        }
      )

      setGeneratedReply(result)
      setVariations(result.suggestions || [])
      setSelectedVariation(0)
      
      if (onReplyGenerated) {
        onReplyGenerated(result)
      }
    } catch (err) {
      console.error('Failed to generate reply:', err)
    }
  }

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  const handleSave = (reply) => {
    const tags = [selectedPlatform, responseType]
    saveReply(reply, tags)
  }

  const handleUse = (replyId) => {
    markReplyAsUsed(replyId)
  }

  const getCurrentReply = () => {
    if (!generatedReply) return null
    
    if (selectedVariation === 0) {
      return {
        response: generatedReply.response,
        characterCount: generatedReply.characterCount,
        tone: user?.communication_style || 'professional'
      }
    }
    
    return variations[selectedVariation - 1] || null
  }

  const currentReply = getCurrentReply()
  const platformConfig = platformConfigs[selectedPlatform]
  const isOverLimit = currentReply && currentReply.characterCount > platformConfig?.maxLength

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">AI Reply Generator</h3>
      </div>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original Content
          </label>
          <textarea
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder="Paste the original post or message you want to reply to..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        {/* Platform and Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(platformConfigs).map(([key, config]) => (
                <option key={key} value={key}>
                  {PLATFORM_ICONS[key]} {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Response Type
            </label>
            <select
              value={responseType}
              onChange={(e) => setResponseType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="reply">Reply</option>
              <option value="comment">Comment</option>
              <option value="dm">Direct Message</option>
              <option value="engagement">Engagement</option>
            </select>
          </div>
        </div>

        {/* Advanced Options */}
        <div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
          >
            <Settings className="h-4 w-4" />
            Advanced Options
            {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {showAdvanced && (
            <div className="mt-3 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Tone (optional)
                </label>
                <input
                  type="text"
                  value={customTone}
                  onChange={(e) => setCustomTone(e.target.value)}
                  placeholder="e.g., humorous, technical, empathetic..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!inputContent.trim() || isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Reply
            </>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Generated Reply Display */}
      {generatedReply && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Generated Replies</h4>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {variations.length + 1} variations
              </span>
            </div>
          </div>

          {/* Variation Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedVariation(0)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedVariation === 0
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Original
            </button>
            {variations.map((variation, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariation(index + 1)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap capitalize ${
                  selectedVariation === index + 1
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {variation.tone}
              </button>
            ))}
          </div>

          {/* Reply Display */}
          {currentReply && (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {PLATFORM_ICONS[selectedPlatform]} {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500 capitalize">
                    {currentReply.tone} tone
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${isOverLimit ? 'text-red-600' : 'text-gray-500'}`}>
                    {currentReply.characterCount}/{platformConfig?.maxLength}
                  </span>
                  {isOverLimit && (
                    <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                      Over limit
                    </span>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-gray-800 whitespace-pre-wrap">
                  {currentReply.response}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(currentReply.response, selectedVariation)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {copiedIndex === selectedVariation ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => handleSave(currentReply)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Save
                </button>
                
                <button
                  onClick={() => handleUse(generatedReply.id)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                >
                  <Send className="h-4 w-4" />
                  Mark as Used
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ReplyGenerator
