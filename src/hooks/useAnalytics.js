import { useState, useEffect } from 'react'

const ANALYTICS_STORAGE_KEY = 'reply_assist_analytics'

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalRepliesGenerated: 0,
    totalRepliesUsed: 0,
    platformBreakdown: {},
    dailyUsage: {},
    averageResponseTime: 0,
    topPerformingReplies: [],
    engagementMetrics: {
      totalLikes: 0,
      totalComments: 0,
      totalShares: 0
    },
    userActivity: {
      sessionsThisWeek: 0,
      averageSessionDuration: 0,
      lastActiveDate: null
    }
  })

  useEffect(() => {
    // Load analytics from localStorage
    const savedAnalytics = localStorage.getItem(ANALYTICS_STORAGE_KEY)
    if (savedAnalytics) {
      try {
        const parsed = JSON.parse(savedAnalytics)
        setAnalytics(prev => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error('Error parsing analytics data:', error)
      }
    }
  }, [])

  const saveAnalytics = (newAnalytics) => {
    try {
      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(newAnalytics))
    } catch (error) {
      console.error('Error saving analytics data:', error)
    }
  }

  const trackReplyGenerated = (platform = 'linkedin', responseTime = 0) => {
    const today = new Date().toISOString().split('T')[0]
    
    setAnalytics(prev => {
      const newAnalytics = {
        ...prev,
        totalRepliesGenerated: prev.totalRepliesGenerated + 1,
        platformBreakdown: {
          ...prev.platformBreakdown,
          [platform]: (prev.platformBreakdown[platform] || 0) + 1
        },
        dailyUsage: {
          ...prev.dailyUsage,
          [today]: (prev.dailyUsage[today] || 0) + 1
        },
        averageResponseTime: prev.totalRepliesGenerated > 0 
          ? ((prev.averageResponseTime * prev.totalRepliesGenerated) + responseTime) / (prev.totalRepliesGenerated + 1)
          : responseTime
      }
      
      saveAnalytics(newAnalytics)
      return newAnalytics
    })
  }

  const trackReplyUsed = (replyId, platform = 'linkedin', engagementData = {}) => {
    setAnalytics(prev => {
      const newAnalytics = {
        ...prev,
        totalRepliesUsed: prev.totalRepliesUsed + 1,
        engagementMetrics: {
          totalLikes: prev.engagementMetrics.totalLikes + (engagementData.likes || 0),
          totalComments: prev.engagementMetrics.totalComments + (engagementData.comments || 0),
          totalShares: prev.engagementMetrics.totalShares + (engagementData.shares || 0)
        }
      }
      
      saveAnalytics(newAnalytics)
      return newAnalytics
    })
  }

  const trackSession = (duration = 0) => {
    const today = new Date().toISOString().split('T')[0]
    
    setAnalytics(prev => {
      const newAnalytics = {
        ...prev,
        userActivity: {
          ...prev.userActivity,
          sessionsThisWeek: prev.userActivity.sessionsThisWeek + 1,
          averageSessionDuration: prev.userActivity.sessionsThisWeek > 0
            ? ((prev.userActivity.averageSessionDuration * prev.userActivity.sessionsThisWeek) + duration) / (prev.userActivity.sessionsThisWeek + 1)
            : duration,
          lastActiveDate: today
        }
      }
      
      saveAnalytics(newAnalytics)
      return newAnalytics
    })
  }

  const getUsageRate = () => {
    if (analytics.totalRepliesGenerated === 0) return 0
    return ((analytics.totalRepliesUsed / analytics.totalRepliesGenerated) * 100).toFixed(1)
  }

  const getTopPlatform = () => {
    const platforms = Object.entries(analytics.platformBreakdown)
    if (platforms.length === 0) return 'linkedin'
    
    return platforms.reduce((top, [platform, count]) => 
      count > (analytics.platformBreakdown[top] || 0) ? platform : top
    , platforms[0][0])
  }

  const getDailyUsageData = (days = 7) => {
    const data = []
    const today = new Date()
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      data.push({
        date: dateStr,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        usage: analytics.dailyUsage[dateStr] || 0
      })
    }
    
    return data
  }

  const getPlatformUsageData = () => {
    return Object.entries(analytics.platformBreakdown).map(([platform, count]) => ({
      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
      count,
      percentage: analytics.totalRepliesGenerated > 0 
        ? ((count / analytics.totalRepliesGenerated) * 100).toFixed(1)
        : 0
    }))
  }

  const getEngagementRate = () => {
    const totalEngagements = analytics.engagementMetrics.totalLikes + 
                           analytics.engagementMetrics.totalComments + 
                           analytics.engagementMetrics.totalShares
    
    if (analytics.totalRepliesUsed === 0) return 0
    return (totalEngagements / analytics.totalRepliesUsed).toFixed(1)
  }

  const resetAnalytics = () => {
    const resetData = {
      totalRepliesGenerated: 0,
      totalRepliesUsed: 0,
      platformBreakdown: {},
      dailyUsage: {},
      averageResponseTime: 0,
      topPerformingReplies: [],
      engagementMetrics: {
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0
      },
      userActivity: {
        sessionsThisWeek: 0,
        averageSessionDuration: 0,
        lastActiveDate: null
      }
    }
    
    setAnalytics(resetData)
    saveAnalytics(resetData)
  }

  const exportAnalytics = () => {
    const exportData = {
      ...analytics,
      exportDate: new Date().toISOString(),
      summary: {
        usageRate: getUsageRate(),
        topPlatform: getTopPlatform(),
        engagementRate: getEngagementRate(),
        dailyUsage: getDailyUsageData(),
        platformUsage: getPlatformUsageData()
      }
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reply-assist-analytics-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return {
    analytics,
    trackReplyGenerated,
    trackReplyUsed,
    trackSession,
    getUsageRate,
    getTopPlatform,
    getDailyUsageData,
    getPlatformUsageData,
    getEngagementRate,
    resetAnalytics,
    exportAnalytics
  }
}
