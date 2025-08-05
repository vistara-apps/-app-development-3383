import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { useOpenAI } from '../hooks/useOpenAI'
import { Users, TrendingUp, Eye, Lightbulb, Target, BarChart3 } from 'lucide-react'

const AudienceInsights = () => {
  const { user, posts } = useUser()
  const { generateContentSuggestions, isLoading } = useOpenAI()
  const [contentSuggestions, setContentSuggestions] = useState([])

  const audienceStats = {
    totalFollowers: 1247,
    engagementRate: 8.3,
    topInterests: ['Technology', 'Business', 'Innovation', 'Leadership'],
    demographics: {
      ageGroups: [
        { range: '25-34', percentage: 35 },
        { range: '35-44', percentage: 28 },
        { range: '45-54', percentage: 22 },
        { range: '18-24', percentage: 15 }
      ],
      locations: [
        { city: 'San Francisco', percentage: 18 },
        { city: 'New York', percentage: 15 },
        { city: 'Los Angeles', percentage: 12 },
        { city: 'Seattle', percentage: 10 },
        { city: 'Austin', percentage: 8 }
      ]
    }
  }

  const engagementData = [
    { time: '6 AM', engagement: 45 },
    { time: '9 AM', engagement: 78 },
    { time: '12 PM', engagement: 65 },
    { time: '3 PM', engagement: 92 },
    { time: '6 PM', engagement: 85 },
    { time: '9 PM', engagement: 72 }
  ]

  useEffect(() => {
    generateSuggestions()
  }, [])

  const generateSuggestions = async () => {
    try {
      const suggestions = await generateContentSuggestions(
        user?.audience_preferences?.interests || ['technology', 'business'],
        'professional content with practical insights'
      )
      setContentSuggestions(suggestions)
    } catch (err) {
      console.error('Error generating suggestions:', err)
    }
  }

  const topPosts = posts
    .sort((a, b) => b.engagement_metrics.likes - a.engagement_metrics.likes)
    .slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="h-8 w-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">Audience Insights</h1>
        </div>
        <p className="text-gray-600">
          Understand your audience better to create content that resonates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Insights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900">{audienceStats.totalFollowers.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Followers</p>
            </div>
            
            <div className="card text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900">{audienceStats.engagementRate}%</p>
              <p className="text-sm text-gray-600">Engagement Rate</p>
            </div>
            
            <div className="card text-center">
              <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900">2.5K</p>
              <p className="text-sm text-gray-600">Avg. Reach</p>
            </div>
          </div>

          {/* Engagement Timeline */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Engagement Throughout the Day</span>
            </h2>
            <div className="space-y-3">
              {engagementData.map((data, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <span className="w-12 text-sm text-gray-600">{data.time}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                    <div
                      className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${data.engagement}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{data.engagement}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Interests */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Audience Interests
            </h2>
            <div className="flex flex-wrap gap-3">
              {audienceStats.topInterests.map((interest, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Demographics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Groups</h3>
              <div className="space-y-3">
                {audienceStats.demographics.ageGroups.map((group, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{group.range}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${group.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-8">{group.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Locations</h3>
              <div className="space-y-3">
                {audienceStats.demographics.locations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{location.city}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${location.percentage * 5}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-8">{location.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Content Suggestions */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <span>Content Suggestions</span>
            </h2>
            {isLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {contentSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">{suggestion}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Performing Posts */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Top Performing Posts
            </h2>
            <div className="space-y-4">
              {topPosts.map((post, index) => (
                <div key={post.id} className="border-l-4 border-green-500 pl-3 py-2">
                  <p className="text-sm text-gray-900 mb-2 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span>{post.engagement_metrics.likes} likes</span>
                    <span>{post.engagement_metrics.comments} comments</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optimization Tips */}
          <div className="card bg-green-50 border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Optimization Tips</span>
            </h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>• Post during peak engagement hours (2-3 PM)</li>
              <li>• Include more technology and business content</li>
              <li>• Engage with your 25-34 age group audience</li>
              <li>• Share practical insights and actionable tips</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudienceInsights