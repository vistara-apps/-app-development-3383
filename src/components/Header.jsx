import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { MessageSquare, Calendar, Users, Heart, CreditCard, Home } from 'lucide-react'

const Header = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/automated-responses', label: 'Responses', icon: MessageSquare },
    { path: '/scheduling', label: 'Scheduling', icon: Calendar },
    { path: '/audience-insights', label: 'Insights', icon: Users },
    { path: '/personalized-interactions', label: 'Interactions', icon: Heart },
    { path: '/subscription', label: 'Subscription', icon: CreditCard },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">Reply Assist</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
          
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}

export default Header