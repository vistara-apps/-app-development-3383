import React from 'react'
import { FileX, Search, MessageSquare, Users, Calendar, Heart } from 'lucide-react'

const EmptyState = ({ 
  type = 'default',
  title,
  description,
  action = null,
  className = ''
}) => {
  const iconMap = {
    default: FileX,
    search: Search,
    messages: MessageSquare,
    users: Users,
    calendar: Calendar,
    interactions: Heart
  }

  const Icon = iconMap[type] || FileX

  const defaultContent = {
    default: {
      title: 'No data available',
      description: 'There\'s nothing to show here yet.'
    },
    search: {
      title: 'No results found',
      description: 'Try adjusting your search criteria or filters.'
    },
    messages: {
      title: 'No messages yet',
      description: 'Start generating responses to see them here.'
    },
    users: {
      title: 'No audience data',
      description: 'Connect your social accounts to see audience insights.'
    },
    calendar: {
      title: 'No scheduled posts',
      description: 'Create your first scheduled post to get started.'
    },
    interactions: {
      title: 'No interactions yet',
      description: 'Your personalized interactions will appear here.'
    }
  }

  const content = {
    title: title || defaultContent[type]?.title || defaultContent.default.title,
    description: description || defaultContent[type]?.description || defaultContent.default.description
  }

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full blur-xl opacity-50 animate-pulse-soft"></div>
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-soft">
          <Icon className="h-12 w-12 text-gray-400 mx-auto" />
        </div>
      </div>
      
      <div className="max-w-md space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">
          {content.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {content.description}
        </p>
      </div>
      
      {action && (
        <div className="mt-8 animate-fade-in">
          {action}
        </div>
      )}
    </div>
  )
}

export default EmptyState
