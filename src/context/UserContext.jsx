import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [connections, setConnections] = useState([])
  const [isSubscribed, setIsSubscribed] = useState(false)

  // Mock user data for demo
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      communication_style: 'professional',
      goals: ['increase_engagement', 'build_network'],
      audience_preferences: {
        interests: ['technology', 'business', 'innovation'],
        demographics: 'professionals',
        engagement_times: ['9:00 AM', '2:00 PM', '6:00 PM']
      }
    }

    const mockConnections = [
      {
        id: 1,
        name: 'Sarah Johnson',
        relationship_type: 'colleague',
        interaction_history: 'frequent_interactions'
      },
      {
        id: 2,
        name: 'Mike Chen',
        relationship_type: 'client',
        interaction_history: 'occasional_interactions'
      }
    ]

    const mockPosts = [
      {
        id: 1,
        content: 'Just launched a new project! Excited to share with everyone.',
        timestamp: new Date().toISOString(),
        engagement_metrics: { likes: 25, comments: 8, shares: 3 }
      },
      {
        id: 2,
        content: 'Great insights from today\'s conference on AI and productivity.',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        engagement_metrics: { likes: 42, comments: 15, shares: 7 }
      }
    ]

    setUser(mockUser)
    setConnections(mockConnections)
    setPosts(mockPosts)
  }, [])

  const addPost = (newPost) => {
    setPosts(prev => [{ ...newPost, id: Date.now() }, ...prev])
  }

  const value = {
    user,
    setUser,
    posts,
    setPosts,
    addPost,
    connections,
    setConnections,
    isSubscribed,
    setIsSubscribed
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}