import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import { useOpenAI } from '../hooks/useOpenAI'
import { MessageSquare, Send, Sparkles, Copy, Check } from 'lucide-react'

const AutomatedResponses = () => {
  const { user } = useUser()
  const { generateResponse, isLoading, error } = useOpenAI()
  const [inputText, setInputText] = useState('')
  const [responseType, setResponseType] = useState('reply')
  const [generatedResponses, setGeneratedResponses] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)

  const handleGenerate = async () => {
    if (!inputText.trim()) return

    try {
      let prompt = ''
      
      switch (responseType) {
        case 'reply':
          prompt = `Create a thoughtful reply to this social media post: "${inputText}"`
          break
        case 'comment':
          prompt = `Write an engaging comment for this post: "${inputText}"`
          break
        case 'dm':
          prompt = `Compose a professional direct message response to: "${inputText}"`
          break
        default:
          prompt = inputText
      }

      const response = await generateResponse(prompt, {
        communicationStyle: user?.communication_style || 'professional',
        audienceType: user?.audience_preferences?.demographics || 'professionals'
      })

      // Generate multiple variations
      const variations = await Promise.all([
        generateResponse(prompt + " (casual tone)", { communicationStyle: 'casual' }),
        generateResponse(prompt + " (formal tone)", { communicationStyle: 'formal' }),
        generateResponse(prompt + " (enthusiastic tone)", { communicationStyle: 'enthusiastic' })
      ])

      setGeneratedResponses([response, ...variations])
    } catch (err) {
      console.error('Error generating response:', err)
    }
  }

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <div className="container-custom animate-fade-in">
      <div className="mb-12">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-primary-400 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-primary-500 p-3 rounded-2xl">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Automated Responses</h1>
            <p className="text-lg text-gray-600 mt-2">
              Generate personalized, engaging replies using AI that matches your communication style
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="card-gradient animate-slide-up">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Generate Response</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Response Type
                </label>
                <div className="relative">
                  <select
                    value={responseType}
                    onChange={(e) => setResponseType(e.target.value)}
                    className="input appearance-none cursor-pointer pr-10"
                  >
                    <option value="reply">🔄 Public Reply</option>
                    <option value="comment">💬 Comment</option>
                    <option value="dm">📩 Direct Message</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Original Post or Message
                </label>
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="textarea resize-none"
                    rows={5}
                    placeholder="Paste the post or message you want to respond to..."
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {inputText.length}/500
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!inputText.trim() || isLoading}
                className="btn-primary w-full flex items-center justify-center space-x-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  {isLoading ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-spin" />
                      <span>Generating responses...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Generate Responses</span>
                    </>
                  )}
                </div>
              </button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* User Preferences */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Style</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Communication Style:</span>
                <span className="font-medium capitalize">
                  {user?.communication_style || 'Professional'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Target Audience:</span>
                <span className="font-medium capitalize">
                  {user?.audience_preferences?.demographics || 'Professionals'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Responses */}
        <div className="space-y-6">
          {generatedResponses.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Generated Responses
              </h2>
              <div className="space-y-4">
                {generatedResponses.map((response, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Variation {index + 1}
                      </span>
                      <button
                        onClick={() => copyToClipboard(response, index)}
                        className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        <span className="text-xs">
                          {copiedIndex === index ? 'Copied!' : 'Copy'}
                        </span>
                      </button>
                    </div>
                    <p className="text-gray-900">{response}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Tips for Better Responses</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Provide context about the original post for more relevant responses</li>
              <li>• Choose the appropriate response type for the platform</li>
              <li>• Review and personalize AI-generated content before posting</li>
              <li>• Consider your relationship with the original poster</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AutomatedResponses
