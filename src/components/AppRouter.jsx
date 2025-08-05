import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import Header from './Header'
import Dashboard from '../pages/Dashboard'
import AutomatedResponses from '../pages/AutomatedResponses'
import IntelligentScheduling from '../pages/IntelligentScheduling'
import AudienceInsights from '../pages/AudienceInsights'
import PersonalizedInteractions from '../pages/PersonalizedInteractions'
import Subscription from '../pages/Subscription'
import Onboarding from '../pages/Onboarding'

const AppRouter = () => {
  const { hasCompletedOnboarding, completeOnboarding } = useUser()
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding using our comprehensive system
    const savedOnboarding = localStorage.getItem('reply_assist_onboarding')
    if (!savedOnboarding) {
      setShowOnboarding(true)
    } else {
      try {
        const parsed = JSON.parse(savedOnboarding)
        if (!parsed.completed) {
          setShowOnboarding(true)
        } else {
          // Sync with UserContext if onboarding was completed
          if (!hasCompletedOnboarding) {
            completeOnboarding()
          }
        }
      } catch (error) {
        console.error('Error parsing onboarding data:', error)
        setShowOnboarding(true)
      }
    }
  }, [hasCompletedOnboarding, completeOnboarding])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    completeOnboarding()
  }

  // If user hasn't completed onboarding, show our comprehensive onboarding
  if (showOnboarding || !hasCompletedOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  // Main app routes for users who have completed onboarding
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/automated-responses" element={<AutomatedResponses />} />
          <Route path="/scheduling" element={<IntelligentScheduling />} />
          <Route path="/audience-insights" element={<AudienceInsights />} />
          <Route path="/personalized-interactions" element={<PersonalizedInteractions />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/onboarding" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default AppRouter
