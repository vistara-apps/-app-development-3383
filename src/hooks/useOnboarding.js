import { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'

const ONBOARDING_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to Reply Assist',
    description: 'Your AI-powered social media engagement companion'
  },
  {
    id: 'communication-style',
    title: 'Communication Style',
    description: 'How would you like your AI replies to sound?'
  },
  {
    id: 'audience-goals',
    title: 'Audience & Goals',
    description: 'Tell us about your target audience and objectives'
  },
  {
    id: 'platform-connect',
    title: 'Connect Platforms',
    description: 'Connect your social media accounts (optional)'
  },
  {
    id: 'first-reply',
    title: 'Generate Your First Reply',
    description: 'Let\'s create your first AI-powered response'
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'Welcome to the future of social media engagement'
  }
]

const COMMUNICATION_STYLES = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Formal, authoritative, and business-focused',
    example: 'Thank you for sharing this insightful perspective. I\'d like to add that...'
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Friendly, approachable, and conversational',
    example: 'Great point! I totally agree and wanted to share my experience with...'
  },
  {
    id: 'enthusiastic',
    name: 'Enthusiastic',
    description: 'Energetic, positive, and engaging',
    example: 'This is amazing! 🚀 I love how you\'ve approached this topic...'
  },
  {
    id: 'supportive',
    name: 'Supportive',
    description: 'Encouraging, empathetic, and helpful',
    example: 'I really appreciate you sharing this. It takes courage to be vulnerable...'
  }
]

const AUDIENCE_TYPES = [
  {
    id: 'professionals',
    name: 'Business Professionals',
    description: 'Colleagues, industry peers, and business contacts'
  },
  {
    id: 'entrepreneurs',
    name: 'Entrepreneurs',
    description: 'Startup founders, business owners, and innovators'
  },
  {
    id: 'creatives',
    name: 'Creatives',
    description: 'Artists, designers, writers, and creative professionals'
  },
  {
    id: 'general',
    name: 'General Audience',
    description: 'Mixed audience with varied interests and backgrounds'
  }
]

const USER_GOALS = [
  {
    id: 'increase_engagement',
    name: 'Increase Engagement',
    description: 'Get more likes, comments, and shares on your content'
  },
  {
    id: 'build_network',
    name: 'Build Network',
    description: 'Connect with new people and expand your professional network'
  },
  {
    id: 'thought_leadership',
    name: 'Thought Leadership',
    description: 'Establish yourself as an expert in your field'
  },
  {
    id: 'brand_awareness',
    name: 'Brand Awareness',
    description: 'Increase visibility for your personal or business brand'
  },
  {
    id: 'lead_generation',
    name: 'Lead Generation',
    description: 'Generate business leads and opportunities'
  },
  {
    id: 'community_building',
    name: 'Community Building',
    description: 'Build and nurture an engaged community around your content'
  }
]

export const useOnboarding = () => {
  const { user, setUser } = useUser()
  const [currentStep, setCurrentStep] = useState(0)
  const [onboardingData, setOnboardingData] = useState({
    communication_style: '',
    audience_type: '',
    goals: [],
    connected_platforms: [],
    completed: false
  })
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding
    const savedOnboarding = localStorage.getItem('reply_assist_onboarding')
    if (savedOnboarding) {
      const parsed = JSON.parse(savedOnboarding)
      if (parsed.completed) {
        setIsCompleted(true)
        setCurrentStep(ONBOARDING_STEPS.length - 1)
      }
    }
  }, [])

  const nextStep = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (stepIndex) => {
    if (stepIndex >= 0 && stepIndex < ONBOARDING_STEPS.length) {
      setCurrentStep(stepIndex)
    }
  }

  const updateOnboardingData = (key, value) => {
    setOnboardingData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const toggleGoal = (goalId) => {
    setOnboardingData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(id => id !== goalId)
        : [...prev.goals, goalId]
    }))
  }

  const completeOnboarding = () => {
    const completedData = {
      ...onboardingData,
      completed: true,
      completedAt: new Date().toISOString()
    }

    // Save to localStorage
    localStorage.setItem('reply_assist_onboarding', JSON.stringify(completedData))

    // Update user context
    setUser(prev => ({
      ...prev,
      communication_style: completedData.communication_style,
      audience_preferences: {
        demographics: completedData.audience_type,
        interests: [], // Can be expanded later
        engagement_times: ['9:00 AM', '2:00 PM', '6:00 PM'] // Default times
      },
      goals: completedData.goals,
      connected_platforms: completedData.connected_platforms,
      onboarding_completed: true
    }))

    setIsCompleted(true)
    setCurrentStep(ONBOARDING_STEPS.length - 1)
  }

  const resetOnboarding = () => {
    localStorage.removeItem('reply_assist_onboarding')
    setCurrentStep(0)
    setOnboardingData({
      communication_style: '',
      audience_type: '',
      goals: [],
      connected_platforms: [],
      completed: false
    })
    setIsCompleted(false)
  }

  const skipOnboarding = () => {
    // Set default values and complete
    const defaultData = {
      communication_style: 'professional',
      audience_type: 'professionals',
      goals: ['increase_engagement'],
      connected_platforms: [],
      completed: true,
      skipped: true,
      completedAt: new Date().toISOString()
    }

    localStorage.setItem('reply_assist_onboarding', JSON.stringify(defaultData))
    
    setUser(prev => ({
      ...prev,
      communication_style: defaultData.communication_style,
      audience_preferences: {
        demographics: defaultData.audience_type,
        interests: [],
        engagement_times: ['9:00 AM', '2:00 PM', '6:00 PM']
      },
      goals: defaultData.goals,
      connected_platforms: defaultData.connected_platforms,
      onboarding_completed: true
    }))

    setIsCompleted(true)
  }

  const getCurrentStep = () => ONBOARDING_STEPS[currentStep]
  const getProgress = () => ((currentStep + 1) / ONBOARDING_STEPS.length) * 100
  const isFirstStep = () => currentStep === 0
  const isLastStep = () => currentStep === ONBOARDING_STEPS.length - 1

  return {
    // State
    currentStep,
    onboardingData,
    isCompleted,
    
    // Step info
    steps: ONBOARDING_STEPS,
    getCurrentStep,
    getProgress,
    isFirstStep,
    isLastStep,
    
    // Navigation
    nextStep,
    prevStep,
    goToStep,
    
    // Data management
    updateOnboardingData,
    toggleGoal,
    completeOnboarding,
    resetOnboarding,
    skipOnboarding,
    
    // Options
    communicationStyles: COMMUNICATION_STYLES,
    audienceTypes: AUDIENCE_TYPES,
    userGoals: USER_GOALS
  }
}
