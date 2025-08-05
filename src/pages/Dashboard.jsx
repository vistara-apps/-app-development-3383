import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { MessageSquare, Calendar, Users, Heart, TrendingUp, Clock } from 'lucide-react'

const Dashboard = () => {
  const { user, posts } = useUser()

  const features = [
    {
      title: 'Automated Responses',
      description: 'Generate personalized replies with AI',
      icon: MessageSquare,
      link: '/automated-responses',
      color: 'bg-blue-500'
    },
    {
      title: 'Intelligent Scheduling',
      description: 'Optimize posting times for maximum engagement',
      icon: Calendar,
      link: '/scheduling',
      color: 'bg-green-500'
    },
    {
      title: 'Audience Insights',
      description: 'Understand your audience better',
      icon: Users,
      link: '/audience-insights',
      color: 'bg-purple-500'
    },
    {
      title: 'Personalized Interactions',
      description: 'Build stronger connections',
      icon: Heart,
      link: '/personalized-interactions',
      color: 'bg-pink-500'
    }
  ]

  const recentPosts = posts.slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600">
          Your personalized AI assistant for social media success
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-3xl font-bold text-gray-900">{posts.length}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Engagement</p>
              <p className="text-3xl font-bold text-gray-900">
                {Math.round(posts.reduce((acc, post) => acc + post.engagement_metrics.likes, 0) / posts.length || 0)}
              </p>
            </div>
            <Heart className="h-8 w-8 text-pink-500" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-3xl font-bold text-gray-900">94%</p>
            </div>
            <Clock className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Link
              key={feature.title}
              to={feature.link}
              className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
            >
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </Link>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Posts</h2>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="border-l-4 border-primary-500 pl-4 py-2">
              <p className="text-gray-900 mb-2">{post.content}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{post.engagement_metrics.likes} likes</span>
                <span>{post.engagement_metrics.comments} comments</span>
                <span>{post.engagement_metrics.shares} shares</span>
                <span className="ml-auto">
                  {new Date(post.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard