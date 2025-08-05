import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import { useOpenAI } from '../hooks/useOpenAI'
import { Heart, MessageSquare, User, Send, Star, Clock } from 'lucide-react'

const PersonalizedInteractions = () => {
  const { connections } = useUser()
  const { generateResponse, isLoading } = useOpenAI()
  const [selectedConnection, setSelectedConnection] = useState(null)
  const [messageType, setMessageType] = useState('follow-up')
  const [context, setContext] = useState('')
  const [generatedMessage, setGeneratedMessage] = useState('')

  const interactionHistory = [
    {
      id: 1,
      connection: 'Sarah Johnson',
      type: 'comment',
      content: 'Great insights on the latest AI trends!',
      timestamp: '2 hours ago',
      engagement: 'high'
    },
    {
      id: 2,
      connection: 'Mike Chen',
      type: 'dm',
      content: 'Thanks for connecting! Looking forward to our collaboration.',
      timestamp: '1 day ago',
      engagement: 'medium'
    },
    {
      id: 3,
      connection: 'Sarah Johnson',
      type: 'like',
      content: 'Liked your post about remote work productivity',
      timestamp: '3 days ago',
      engagement: 'low'
    }
  ]

  const messageTypes = [
    { value: 'follow-up', label: 'Follow-up Message', description: 'Continue a previous conversation' },
    { value: 'congratulations', label: 'Congratulations', description: 'Celebrate an achievement' },
    { value: 'introduction', label: 'Introduction', description: 'Make a new connection' },
    { value: 'collaboration', label: 'Collaboration', description: 'Propose working together' },
    { value: 'thank-you', label: 'Thank You', description: 'Express gratitude' }
  ]

  const handleGenerateMessage = async () => {
    if (!selectedConnection || !messageType) return

    try {
      const connection = connections.find(c => c.id === selectedConnection)
      
      let prompt = `Write a personalized ${messageType} message for ${connection.name}.`
      
      if (context.trim()) {
        prompt += ` Context: ${context}`
      }
      
      prompt += ` The relationship type is ${connection.relationship_type} with ${connection.interaction_history} interaction history.`
      
      const message = await generateResponse(prompt, {
        communicationStyle: 'professional',
        audienceType: connection.relationship_type
      })
      
      setGeneratedMessage(message)
    } catch (err) {
      console.error('Error generating message:', err)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Heart className="h-8 w-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">Personalized Interactions</h1>
        </div>
        <p className="text-gray-600">
          Build stronger relationships with AI-powered personalized messages
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Message Generator */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Generate Personalized Message
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Connection
                </label>
                <select
                  value={selectedConnection || ''}
                  onChange={(e) => setSelectedConnection(Number(e.target.value))}
                  className="input"
                >
                  <option value="">Choose a connection...</option>
                  {connections.map((connection) => (
                    <option key={connection.id} value={connection.id}>
                      {connection.name} ({connection.relationship_type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Type
                </label>
                <select
                  value={messageType}
                  onChange={(e) => setMessageType(e.target.value)}
                  className="input"
                >
                  {messageTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Context (Optional)
                </label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="textarea"
                  rows={3}
                  placeholder="Provide any specific context or recent developments..."
                />
              </div>

              <button
                onClick={handleGenerateMessage}
                disabled={!selectedConnection || !messageType || isLoading}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <MessageSquare className="h-4 w-4 animate-pulse" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Generate Message</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Message */}
          {generatedMessage && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Generated Message
              </h3>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-gray-900 leading-relaxed">{generatedMessage}</p>
              </div>
              <div className="flex justify-end space-x-3 mt-4">
                <button className="btn-secondary">Edit</button>
                <button className="btn-primary">Send Message</button>
              </div>
            </div>
          )}

          {/* Recent Interactions */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Interactions
            </h2>
            <div className="space-y-4">
              {interactionHistory.map((interaction) => (
                <div
                  key={interaction.id}
                  className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {interaction.connection}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          interaction.engagement === 'high' ? 'bg-green-100 text-green-800' :
                          interaction.engagement === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {interaction.type}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{interaction.timestamp}</span>
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{interaction.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Connection Summary */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Your Connections
            </h3>
            <div className="space-y-3">
              {connections.map((connection) => (
                <div
                  key={connection.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedConnection === connection.id
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedConnection(connection.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{connection.name}</p>
                    <Star className={`h-4 w-4 ${
                      connection.interaction_history === 'frequent_interactions'
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`} />
                  </div>
                  <p className="text-sm text-gray-600 capitalize">
                    {connection.relationship_type}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {connection.interaction_history.replace('_', ' ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interaction Tips */}
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Interaction Tips
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Personalize messages based on recent achievements</li>
              <li>• Reference shared interests or connections</li>
              <li>• Keep follow-ups timely and relevant</li>
              <li>• Show genuine interest in their work</li>
              <li>• Provide value in every interaction</li>
            </ul>
          </div>

          {/* Engagement Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Engagement Stats
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Response Rate:</span>
                <span className="font-medium text-green-600">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Response Time:</span>
                <span className="font-medium text-gray-900">2.3 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Messages Sent:</span>
                <span className="font-medium text-gray-900">127</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalizedInteractions