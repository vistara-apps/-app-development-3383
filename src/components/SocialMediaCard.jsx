import React, { useState } from 'react'
import { Check, ExternalLink, Loader2 } from 'lucide-react'

const SocialMediaCard = ({ platform, icon: Icon, color, description, isConnected, onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock account data
    const mockAccountData = {
      username: `@user_${platform.toLowerCase()}`,
      followers: Math.floor(Math.random() * 10000) + 1000,
      avatar: `https://ui-avatars.com/api/?name=${platform}&background=${color.replace('#', '')}&color=fff`
    }
    
    onConnect(platform.toLowerCase(), mockAccountData)
    setIsConnecting(false)
  }

  return (
    <div className={`bg-white rounded-2xl border-2 transition-all duration-300 ${
      isConnected 
        ? 'border-green-200 bg-green-50' 
        : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="p-3 rounded-xl"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon className="h-6 w-6" style={{ color }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{platform}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          
          {isConnected && (
            <div className="bg-green-100 p-2 rounded-full">
              <Check className="h-4 w-4 text-green-600" />
            </div>
          )}
        </div>

        {isConnected ? (
          <div className="bg-white rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">@user_{platform.toLowerCase()}</p>
                  <p className="text-xs text-gray-500">
                    {Math.floor(Math.random() * 10000) + 1000} followers
                  </p>
                </div>
              </div>
              <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center">
                View Profile
                <ExternalLink className="ml-1 h-3 w-3" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              isConnecting
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95'
            }`}
          >
            {isConnecting ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </div>
            ) : (
              `Connect ${platform}`
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default SocialMediaCard

