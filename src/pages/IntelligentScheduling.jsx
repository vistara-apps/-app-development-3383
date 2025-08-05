import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { useOpenAI } from '../hooks/useOpenAI'
import { Calendar, Clock, TrendingUp, Target, Zap } from 'lucide-react'
import { format, addDays, startOfWeek } from 'date-fns'

const IntelligentScheduling = () => {
  const { user, addPost } = useUser()
  const { generateSchedulingRecommendations, isLoading } = useOpenAI()
  const [recommendations, setRecommendations] = useState('')
  const [postContent, setPostContent] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  const optimalTimes = [
    { time: '9:00 AM', engagement: '87%', reason: 'Morning check-ins' },
    { time: '2:00 PM', engagement: '92%', reason: 'Lunch break browsing' },
    { time: '6:00 PM', engagement: '85%', reason: 'Evening wind-down' },
    { time: '8:00 PM', engagement: '78%', reason: 'Prime social time' }
  ]

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfWeek(new Date()), i)
    return {
      date,
      dayName: format(date, 'EEEE'),
      dateStr: format(date, 'MMM dd'),
      engagement: Math.floor(Math.random() * 20) + 75 // Mock engagement data
    }
  })

  useEffect(() => {
    generateRecommendations()
  }, [])

  const generateRecommendations = async () => {
    try {
      const recs = await generateSchedulingRecommendations(
        user?.audience_preferences || {},
        user?.goals || ['increase_engagement']
      )
      setRecommendations(recs)
    } catch (err) {
      console.error('Error generating recommendations:', err)
    }
  }

  const handleSchedulePost = () => {
    if (!postContent.trim() || !selectedTime || !selectedDate) return

    const newPost = {
      content: postContent,
      timestamp: new Date(`${selectedDate} ${selectedTime}`).toISOString(),
      engagement_metrics: { likes: 0, comments: 0, shares: 0 },
      scheduled: true
    }

    addPost(newPost)
    setPostContent('')
    setSelectedTime('')
    setSelectedDate('')
    
    alert('Post scheduled successfully!')
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="h-8 w-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">Intelligent Scheduling</h1>
        </div>
        <p className="text-gray-600">
          Optimize your posting times for maximum reach and engagement
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Optimal Times */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Best Times to Post Today
            </h2>
            <div className="space-y-3">
              {optimalTimes.map((time, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{time.time}</p>
                      <p className="text-sm text-gray-600">{time.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-green-600">{time.engagement}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Overview */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Weekly Engagement Forecast
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  className="text-center p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                >
                  <p className="text-xs font-medium text-gray-600 mb-1">
                    {day.dayName.substr(0, 3)}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">{day.dateStr}</p>
                  <div className="flex items-center justify-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      day.engagement >= 85 ? 'bg-green-500' : 
                      day.engagement >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-xs font-medium">{day.engagement}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>AI Recommendations</span>
            </h2>
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{recommendations}</p>
              </div>
            )}
          </div>
        </div>

        {/* Schedule Post */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Schedule Post
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post Content
                </label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="textarea"
                  rows={4}
                  placeholder="What would you like to share?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input"
                  min={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="input"
                >
                  <option value="">Select time</option>
                  {optimalTimes.map((time, index) => (
                    <option key={index} value={time.time}>
                      {time.time} - {time.engagement} engagement
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSchedulePost}
                disabled={!postContent.trim() || !selectedTime || !selectedDate}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule Post</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
            <h3 className="text-lg font-semibold text-primary-900 mb-3">
              Your Performance
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-primary-700">Avg. Engagement Rate:</span>
                <span className="font-medium text-primary-900">8.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-700">Best Day:</span>
                <span className="font-medium text-primary-900">Wednesday</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-700">Peak Time:</span>
                <span className="font-medium text-primary-900">2:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntelligentScheduling