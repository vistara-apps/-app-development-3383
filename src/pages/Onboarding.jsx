import React from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingContainer from '../components/onboarding/OnboardingContainer'

const Onboarding = () => {
  const navigate = useNavigate()

  const handleComplete = () => {
    navigate('/', { replace: true })
  }

  const handleSkip = () => {
    navigate('/', { replace: true })
  }

  return (
    <OnboardingContainer
      onComplete={handleComplete}
      onSkip={handleSkip}
    />
  )
}

export default Onboarding

