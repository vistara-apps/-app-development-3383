import React from 'react'
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
  const { hasCompletedOnboarding } = useUser()

  // If user hasn't completed onboarding, redirect to onboarding
  if (!hasCompletedOnboarding) {
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    )
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

