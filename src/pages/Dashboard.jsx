import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { MessageSquare, Calendar, Users, Heart, TrendingUp, Clock, ArrowUpRight, Sparkles, Zap, Target, BarChart3 } from 'lucide-react'
import EmptyState from '../components/EmptyState'

const Dashboard = () => {
  const { user, posts, connectedSocialAccounts } = useUser()

  const features = [
    {
      title: 'Automated Responses',
      description: 'Generate personalized replies with AI',
      icon: MessageSquare,
      link: '/automated-responses',
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-700'
    },
    {
      title: 'Intelligent Scheduling',
      description: 'Optimize posting times for maximum engagement',
      icon: Calendar,
      link: '/scheduling',
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      textColor: 'text-green-700'
    },
    {
      title: 'Audience Insights',
      description: 'Understand your audience better',
      icon: Users,
      link: '/audience-insights',
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-700'
    },
    {
      title: 'Personalized Interactions',
      description: 'Build stronger connections',
      icon: Heart,
      link: '/personalized-interactions',
      gradient: 'from-pink-500 to-pink-600',
      bgGradient: 'from-pink-50 to-pink-100',
      textColor: 'text-pink-700'
    }
  ]

  const stats = [
    {
      label: 'Total Posts',
      value: posts.length,
      icon: TrendingUp,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      change: '+12%',
      changeType: 'positive'
    },
    {
      label: 'Avg. Engagement',
      value: Math.round(posts.reduce((acc, post) => acc + post.engagement_metrics.likes, 0) / posts.length || 0),
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      change: '+8%',
      changeType: 'positive'
    },
    {
      label: 'Response Rate',
      value: '94%',
      icon: Clock,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      change: '+2%',
      changeType: 'positive'
    }
  ]

  const recentPosts = posts.slice(0, 3)

  return (
    <div className="container-custom animate-fade-in">
      {/* Welcome Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-gradient-to-r from-primary-500 to-accent-500 p-3 rounded-2xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p className="text-lg text-gray-600">
              Your personalized AI assistant for social media success
            </p>
          </div>
        </div>
        
        {/* Quick Action Bar */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Link to="/automated-responses" className="btn-primary btn-sm group">
            <Zap className="h-4 w-4 mr-2 group-hover:animate-bounce-subtle" />
            Generate Response
          </Link>
          <Link to="/scheduling" className="btn-secondary btn-sm group">
            <Target className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
            Schedule Post
          </Link>
          <Link to="/audience-insights" className="btn-ghost btn-sm group">
            <BarChart3 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            View Analytics
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="card-hover animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      stat.changeType === 'positive' 
                        ? 'bg-success-100 text-success-700' 
                        : 'bg-error-100 text-error-700'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-2xl`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Connected Accounts */}
      {connectedSocialAccounts.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Connected Accounts</h2>
            <Link to="/onboarding" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Manage Connections
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {connectedSocialAccounts.map((account, index) => (
              <div
                key={account.platform}
                className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600 capitalize">
                        {account.platform.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 capitalize">{account.platform}</h3>
                      <p className="text-sm text-gray-500">{account.username}</p>
                    </div>
                  </div>
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                {account.followers && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      {account.followers.toLocaleString()} followers
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature Grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">AI-Powered Features</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
            <span>All systems operational</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Link
                key={feature.title}
                to={feature.link}
                className="card-interactive group animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`bg-gradient-to-br ${feature.bgGradient} p-4 rounded-2xl mb-4 group-hover:scale-105 transition-all duration-300`}>
                  <div className={`bg-gradient-to-r ${feature.gradient} w-12 h-12 rounded-xl flex items-center justify-center shadow-medium`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                      {feature.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card animate-slide-up" style={{ animationDelay: '600ms' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
          <Link to="/posts" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1">
            <span>View all</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        
        {recentPosts.length > 0 ? (
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="group p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-1 h-12 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 mb-3 line-clamp-2">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{post.engagement_metrics.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{post.engagement_metrics.comments}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>{post.engagement_metrics.shares}</span>
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(post.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            type="messages"
            action={
              <Link to="/automated-responses" className="btn-primary">
                Create Your First Post
              </Link>
            }
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard
