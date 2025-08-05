import React from 'react'
import { useUser } from '../../context/UserContext'
import SocialMediaCard from '../SocialMediaCard'
import { ArrowRight, ArrowLeft, Link2, Zap } from 'lucide-react'

const SocialConnectStep = ({ onNext, onPrevious, onSkip }) => {
  const { connectedSocialAccounts, connectSocialAccount } = useUser()

  const socialPlatforms = [
    {
      platform: 'X',
      icon: ({ className, style }) => (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: '#000000',
      description: 'Connect your X account for AI-powered replies'
    },
    {
      platform: 'LinkedIn',
      icon: ({ className, style }) => (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: '#0077B5',
      description: 'Professional networking and engagement'
    },
    {
      platform: 'Instagram',
      icon: ({ className, style }) => (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: '#E4405F',
      description: 'Visual content and story engagement'
    }
  ]

  const connectedCount = connectedSocialAccounts.length
  const hasConnections = connectedCount > 0

  const isConnected = (platform) => {
    return connectedSocialAccounts.some(acc => acc.platform === platform.toLowerCase())
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl inline-block mb-6">
          <Link2 className="h-8 w-8 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Connect Your Social Accounts
        </h2>
        
        <p className="text-lg text-gray-600 mb-2">
          Link your social media accounts to start generating personalized AI responses
        </p>
        
        {hasConnections && (
          <div className="inline-flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <Zap className="h-4 w-4 mr-2" />
            {connectedCount} account{connectedCount !== 1 ? 's' : ''} connected
          </div>
        )}
      </div>

      {/* Social Media Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {socialPlatforms.map((platform) => (
          <SocialMediaCard
            key={platform.platform}
            platform={platform.platform}
            icon={platform.icon}
            color={platform.color}
            description={platform.description}
            isConnected={isConnected(platform.platform)}
            onConnect={connectSocialAccount}
          />
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          Why connect your accounts?
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-xl inline-block mb-3">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Instant Replies</h4>
            <p className="text-sm text-gray-600">Generate contextual responses in seconds</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 p-3 rounded-xl inline-block mb-3">
              <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Smart Insights</h4>
            <p className="text-sm text-gray-600">Learn what resonates with your audience</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-xl inline-block mb-3">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Save Time</h4>
            <p className="text-sm text-gray-600">Automate engagement while staying authentic</p>
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

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onSkip}
            className="btn-ghost btn-lg"
          >
            Skip for now
          </button>
          
          <button
            onClick={onNext}
            className="btn-primary btn-lg group inline-flex items-center"
          >
            {hasConnections ? 'Continue' : 'Continue anyway'}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SocialConnectStep

