import React from 'react'
import { Sparkles, MessageSquare, TrendingUp, Users, ArrowRight } from 'lucide-react'

const WelcomeStep = ({ onNext, onSkip }) => {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI-Powered Replies',
      description: 'Generate personalized responses that match your voice and style'
    },
    {
      icon: TrendingUp,
      title: 'Smart Scheduling',
      description: 'Post at optimal times for maximum engagement and reach'
    },
    {
      icon: Users,
      title: 'Audience Insights',
      description: 'Understand your audience better with detailed analytics'
    }
  ]

  return (
    <div className="text-center max-w-2xl mx-auto">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-3xl blur-xl opacity-20"></div>
          <div className="relative bg-gradient-to-r from-primary-500 to-accent-500 p-6 rounded-3xl inline-block">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Reply Assist</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Your personalized AI assistant for social media success. 
          <br />
          Boost engagement, save time, and build meaningful connections.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-primary-50 p-3 rounded-xl inline-block mb-4">
                <Icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-8 rounded-2xl mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to get started?
        </h2>
        <p className="text-gray-600 mb-6">
          Let's connect your social media accounts and set up your AI assistant in just a few steps.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onNext}
            className="btn-primary btn-lg group inline-flex items-center justify-center"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onSkip}
            className="btn-ghost btn-lg"
          >
            Skip for now
          </button>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Secure & Private
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
          AI-Powered
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
          Easy Setup
        </div>
      </div>
    </div>
  )
}

export default WelcomeStep

