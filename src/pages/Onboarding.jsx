import React, { useState } from 'react'
import { useOnboarding } from '../hooks/useOnboarding'
import ReplyGenerator from '../components/ReplyGenerator'
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Users, 
  Target, 
  MessageSquare,
  Zap,
  BarChart3,
  Heart,
  Briefcase,
  Palette,
  Globe,
  TrendingUp,
  Network,
  Award,
  Eye,
  DollarSign,
  UserPlus,
  X
} from 'lucide-react'

const PLATFORM_ICONS = {
  linkedin: { icon: '💼', name: 'LinkedIn', color: 'bg-blue-100 text-blue-700' },
  instagram: { icon: '📸', name: 'Instagram', color: 'bg-pink-100 text-pink-700' },
  twitter: { icon: '🐦', name: 'Twitter', color: 'bg-sky-100 text-sky-700' },
  facebook: { icon: '👥', name: 'Facebook', color: 'bg-blue-100 text-blue-700' }
}

const GOAL_ICONS = {
  increase_engagement: TrendingUp,
  build_network: Network,
  thought_leadership: Award,
  brand_awareness: Eye,
  lead_generation: DollarSign,
  community_building: UserPlus
}

const AUDIENCE_ICONS = {
  professionals: Briefcase,
  entrepreneurs: Zap,
  creatives: Palette,
  general: Globe
}

const Onboarding = ({ onComplete }) => {
  const {
    currentStep,
    onboardingData,
    steps,
    getCurrentStep,
    getProgress,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    updateOnboardingData,
    toggleGoal,
    completeOnboarding,
    skipOnboarding,
    communicationStyles,
    audienceTypes,
    userGoals
  } = useOnboarding()

  const [sampleReply, setSampleReply] = useState('')

  const currentStepData = getCurrentStep()
  const progress = getProgress()

  const handleNext = () => {
    if (isLastStep()) {
      completeOnboarding()
      if (onComplete) onComplete()
    } else {
      nextStep()
    }
  }

  const handleSkip = () => {
    skipOnboarding()
    if (onComplete) onComplete()
  }

  const canProceed = () => {
    switch (currentStepData.id) {
      case 'communication-style':
        return onboardingData.communication_style !== ''
      case 'audience-goals':
        return onboardingData.audience_type !== '' && onboardingData.goals.length > 0
      default:
        return true
    }
  }

  const renderStepContent = () => {
    switch (currentStepData.id) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-20"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Welcome to Reply Assist!</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your AI-powered companion for creating engaging, personalized social media responses. 
                Let's set up your profile to generate replies that sound authentically you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Smart Replies</h3>
                <p className="text-sm text-gray-600">Generate contextual responses that match your communication style</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-sm text-gray-600">Track your engagement and optimize your social media strategy</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <Heart className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Authentic</h3>
                <p className="text-sm text-gray-600">Maintain your unique voice while boosting engagement</p>
              </div>
            </div>
          </div>
        )

      case 'communication-style':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Communication Style</h2>
              <p className="text-gray-600">This helps us generate replies that sound like you</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communicationStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => updateOnboardingData('communication_style', style.id)}
                  className={`p-6 rounded-lg border-2 text-left transition-all ${
                    onboardingData.communication_style === style.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{style.name}</h3>
                    {onboardingData.communication_style === style.id && (
                      <Check className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{style.description}</p>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-xs text-gray-700 italic">"{style.example}"</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 'audience-goals':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell Us About Your Audience & Goals</h2>
              <p className="text-gray-600">This helps us tailor responses for maximum impact</p>
            </div>
            
            {/* Audience Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Target Audience
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {audienceTypes.map((audience) => {
                  const IconComponent = AUDIENCE_ICONS[audience.id]
                  return (
                    <button
                      key={audience.id}
                      onClick={() => updateOnboardingData('audience_type', audience.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        onboardingData.audience_type === audience.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{audience.name}</h4>
                          <p className="text-sm text-gray-600">{audience.description}</p>
                        </div>
                        {onboardingData.audience_type === audience.id && (
                          <Check className="h-5 w-5 text-blue-600 ml-auto" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Goals Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Your Goals (select all that apply)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {userGoals.map((goal) => {
                  const IconComponent = GOAL_ICONS[goal.id]
                  const isSelected = onboardingData.goals.includes(goal.id)
                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{goal.name}</h4>
                          <p className="text-sm text-gray-600">{goal.description}</p>
                        </div>
                        {isSelected && (
                          <Check className="h-5 w-5 text-blue-600 ml-auto" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )

      case 'platform-connect':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Platforms</h2>
              <p className="text-gray-600">Connect your social media accounts to get personalized suggestions (optional)</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(PLATFORM_ICONS).map(([platform, config]) => (
                <div key={platform} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{config.icon}</span>
                    <h3 className="font-semibold text-gray-900">{config.name}</h3>
                  </div>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                    Connect {config.name}
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Don't worry, you can connect platforms later from your dashboard
              </p>
            </div>
          </div>
        )

      case 'first-reply':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Generate Your First Reply</h2>
              <p className="text-gray-600">Let's test your settings with a sample social media post</p>
            </div>
            <ReplyGenerator 
              initialContent="Just launched my new project after months of hard work! Excited to share it with the community and get your feedback. What do you think about the direction we're heading?"
              onReplyGenerated={(reply) => setSampleReply(reply.response)}
            />
            {sampleReply && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">Great! Your AI is working perfectly</span>
                </div>
                <p className="text-sm text-green-700">
                  You've successfully generated your first AI-powered reply. You're ready to start engaging!
                </p>
              </div>
            )}
          </div>
        )

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-lg opacity-20"></div>
              <div className="relative bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                <Check className="h-12 w-12 text-white" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">You're All Set! 🎉</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Welcome to Reply Assist! Your AI is now configured with your preferences and ready to help you create engaging social media responses.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Settings Summary:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Communication Style:</span>
                  <span className="font-medium capitalize">{onboardingData.communication_style}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Audience:</span>
                  <span className="font-medium capitalize">{onboardingData.audience_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Goals:</span>
                  <span className="font-medium">{onboardingData.goals.length} selected</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <span className="font-semibold text-gray-900">Reply Assist</span>
            </div>
            <button
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Skip Setup
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={isFirstStep()}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLastStep() ? 'Get Started' : 'Next'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
