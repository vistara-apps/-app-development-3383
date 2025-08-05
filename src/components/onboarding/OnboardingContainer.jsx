import React from 'react'
import { useUser } from '../../context/UserContext'
import ProgressIndicator from './ProgressIndicator'
import WelcomeStep from './WelcomeStep'
import SocialConnectStep from './SocialConnectStep'
import QuickStartStep from './QuickStartStep'
import { X } from 'lucide-react'

const OnboardingContainer = ({ onComplete, onSkip }) => {
  const { onboardingStep, setOnboardingStep, completeOnboarding } = useUser()

  const steps = [
    { id: 'welcome', title: 'Welcome', component: WelcomeStep },
    { id: 'connect', title: 'Connect', component: SocialConnectStep },
    { id: 'start', title: 'Start', component: QuickStartStep }
  ]

  const currentStepData = steps[onboardingStep]
  const CurrentStepComponent = currentStepData.component

  const handleNext = () => {
    if (onboardingStep < steps.length - 1) {
      setOnboardingStep(onboardingStep + 1)
    }
  }

  const handlePrevious = () => {
    if (onboardingStep > 0) {
      setOnboardingStep(onboardingStep - 1)
    }
  }

  const handleComplete = () => {
    completeOnboarding()
    onComplete()
  }

  const handleSkip = () => {
    completeOnboarding()
    onSkip()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={handleSkip}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
          title="Skip onboarding"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={onboardingStep}
          totalSteps={steps.length}
          steps={steps}
        />

        {/* Step Content */}
        <div className="animate-fade-in">
          <CurrentStepComponent
            onNext={handleNext}
            onPrevious={handlePrevious}
            onComplete={handleComplete}
            onSkip={handleSkip}
          />
        </div>
      </div>
    </div>
  )
}

export default OnboardingContainer

