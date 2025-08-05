import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import { useReplyEngine } from '../hooks/useReplyEngine'
import ReplyGenerator from '../components/ReplyGenerator'
import { MessageSquare, History, BarChart3, Save, Copy, Check } from 'lucide-react'

const AutomatedResponses = () => {
  const { user } = useUser()
  const { replyHistory, savedReplies, getReplyStats } = useReplyEngine()
  const [activeTab, setActiveTab] = useState('generator')
  const [copiedIndex, setCopiedIndex] = useState(null)

  const stats = getReplyStats()

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
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageSquare className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Automated Responses</h1>
            <p className="text-gray-600">Generate personalized AI-powered replies for your social media</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Generated</span>
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-1">{stats.totalGenerated}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">Used</span>
            </div>
            <p className="text-2xl font-bold text-green-900 mt-1">{stats.totalUsed}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Usage Rate</span>
            </div>
            <p className="text-2xl font-bold text-purple-900 mt-1">{stats.usageRate}%</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Save className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-900">Saved</span>
            </div>
            <p className="text-2xl font-bold text-orange-900 mt-1">{savedReplies.length}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'generator'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Generator
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            History ({replyHistory.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'saved'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Saved ({savedReplies.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'generator' && (
          <ReplyGenerator />
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Reply History</h3>
            {replyHistory.length === 0 ? (
              <div className="text-center py-8">
                <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No replies generated yet</p>
                <p className="text-sm text-gray-400">Start generating replies to see your history here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {replyHistory.map((entry) => (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {entry.platform} • {entry.responseType}
                        </span>
                        {entry.used && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Used
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => copyToClipboard(entry.response, `history-${entry.id}`)}
                          className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                        >
                          {copiedIndex === `history-${entry.id}` ? (
                            <>
                              <Check className="h-3 w-3 text-green-600" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 mb-2">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Original:</strong> {entry.originalContent}
                      </p>
                      <p className="text-gray-800">{entry.response}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {entry.characterCount} characters
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Saved Replies</h3>
            {savedReplies.length === 0 ? (
              <div className="text-center py-8">
                <Save className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No saved replies yet</p>
                <p className="text-sm text-gray-400">Save your favorite replies for quick access</p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedReplies.map((reply) => (
                  <div key={reply.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {reply.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {new Date(reply.timestamp).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => copyToClipboard(reply.content, `saved-${reply.id}`)}
                          className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                        >
                          {copiedIndex === `saved-${reply.id}` ? (
                            <>
                              <Check className="h-3 w-3 text-green-600" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-800">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AutomatedResponses
