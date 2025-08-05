import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import AutomatedResponses from './pages/AutomatedResponses'
import IntelligentScheduling from './pages/IntelligentScheduling'
import AudienceInsights from './pages/AudienceInsights'
import PersonalizedInteractions from './pages/PersonalizedInteractions'
import Subscription from './pages/Subscription'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <UserProvider>
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
          </Routes>
        </main>
      </div>
    </UserProvider>
  )
}

export default App