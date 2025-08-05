import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useUser } from '../context/UserContext'
import { MessageSquare, Calendar, Users, Heart, CreditCard, Home, Menu, X, Sparkles, RotateCcw } from 'lucide-react'

const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { resetOnboarding } = useUser()
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/automated-responses', label: 'Responses', icon: MessageSquare },
    { path: '/scheduling', label: 'Scheduling', icon: Calendar },
    { path: '/audience-insights', label: 'Insights', icon: Users },
    { path: '/personalized-interactions', label: 'Interactions', icon: Heart },
    { path: '/subscription', label: 'Subscription', icon: CreditCard },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-soft border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-primary-600 to-accent-600 p-2 rounded-xl">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold gradient-text">Reply Assist</span>
              <span className="text-xs text-gray-500 -mt-1">AI-Powered Engagement</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`${
                  location.pathname === path
                    ? 'nav-link-active'
                    : 'nav-link'
                } group relative`}
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="hidden xl:inline">{label}</span>
                {location.pathname === path && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* AI Status Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-success-50 to-primary-50 rounded-full border border-success-200/50">
              <Sparkles className="h-3 w-3 text-success-600 animate-pulse" />
              <span className="text-xs font-medium text-success-700">AI Active</span>
            </div>
            
            <ConnectButton />
            
            {/* Reset Onboarding Button (for testing) */}
            <button
              onClick={resetOnboarding}
              className="hidden md:flex items-center space-x-2 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reset Onboarding (for testing)"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md animate-slide-down">
          <div className="container-custom py-4">
            <nav className="grid grid-cols-2 gap-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${
                    location.pathname === path
                      ? 'bg-primary-50 text-primary-700 border-primary-200'
                      : 'text-gray-700 hover:bg-gray-50 border-gray-200'
                  } flex items-center space-x-3 p-3 rounded-xl border transition-all duration-200`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
