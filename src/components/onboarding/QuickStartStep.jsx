import React from 'react'
import { useUser } from '../../context/UserContext'
import { CheckCircle, ArrowLeft, Sparkles, MessageSquare, Calendar, Users, ArrowRight } from 'lucide-react'

const QuickStartStep = ({ onPrevious, onComplete }) => {
  const { connectedSocialAccounts } = useUser()

  const quickActions = [
    {
      icon: MessageSquare,
      title: 'Generate Your First Reply',
      description: 'Try our AI-powered response generator',
      action: 'Try Now',
      color: 'blue'
    },
    {
      icon: Calendar,
      title: 'Schedule a Post',
      description: 'Plan your content for optimal engagement',
      action: 'Schedule',
      color: 'green'
    },
    {
      icon: Users,
      title: 'View Audience Insights',
      description: 'Understand your followers better',
      action: 'Explore',
      color: 'purple'
    }
  ]

  const handleComplete = () => {
    onComplete()
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl blur-xl opacity-20"></div>
          <div className="relative bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-3xl inline-block">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎉 You're All Set!
        </h2>
        
        <p className="text-lg text-gray-600 mb-6">
          Welcome to Reply Assist! Here's what you can do next to get the most out of your AI assistant.
        </p>

        {/* Connection Summary */}
        {connectedSocialAccounts.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Connected Accounts
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {connectedSocialAccounts.map((account) => (
                <div
                  key={account.platform}
                  className="bg-white px-4 py-2 rounded-full border border-green-200 flex items-center space-x-2"
                >
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {account.platform}
                  </span>
                  <span className="text-xs text-gray-500">
                    {account.username}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Quick Actions to Get Started
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600 bg-blue-50 text-blue-600',
              green: 'from-green-500 to-green-600 bg-green-50 text-green-600',
              purple: 'from-purple-500 to-purple-600 bg-purple-50 text-purple-600'
            }
            
            return (
              <div
                key={action.title}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`${colorClasses[action.color].split(' ')[2]} ${colorClasses[action.color].split(' ')[3]} p-3 rounded-xl inline-block mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h4>
                
                <p className="text-gray-600 text-sm mb-4">
                  {action.description}
                </p>
                
                <button className={`w-full py-2 px-4 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r ${colorClasses[action.color].split(' ')[0]} ${colorClasses[action.color].split(' ')[1]} text-white hover:shadow-md group-hover:scale-105`}>
                  {action.action}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-8">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Pro Tips</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg mt-1">
              <span className="text-blue-600 font-bold text-sm">1</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Personalize Your Voice</h4>
              <p className="text-sm text-gray-600">
                The AI learns from your writing style to create authentic responses
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg mt-1">
              <span className="text-blue-600 font-bold text-sm">2</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Review Before Posting</h4>
              <p className="text-sm text-gray-600">
                Always review AI suggestions to ensure they match your intent
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg mt-1">
              <span className="text-blue-600 font-bold text-sm">3</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Use Analytics</h4>
              <p className="text-sm text-gray-600">
                Check your engagement metrics to optimize your strategy
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg mt-1">
              <span className="text-blue-600 font-bold text-sm">4</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Stay Consistent</h4>
              <p className="text-sm text-gray-600">
                Regular engagement helps build stronger connections
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={onPrevious}
          className="btn-ghost btn-lg group inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <button
          onClick={handleComplete}
          className="btn-primary btn-lg group inline-flex items-center"
        >
          Enter Dashboard
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}

export default QuickStartStep

