import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import { usePaymentContext } from '../hooks/usePaymentContext'
import { CreditCard, Check, Zap, Star, Users, Calendar } from 'lucide-react'

const Subscription = () => {
  const { isSubscribed, setIsSubscribed } = useUser()
  const { createSession } = usePaymentContext()
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [isProcessing, setIsProcessing] = useState(false)

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$9.99',
      period: 'per month',
      description: 'Perfect for individuals getting started',
      features: [
        'Up to 50 AI-generated responses per month',
        'Basic scheduling recommendations',
        'Standard audience insights',
        'Email support'
      ],
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19.99',
      period: 'per month',
      description: 'Ideal for growing professionals',
      features: [
        'Up to 200 AI-generated responses per month',
        'Advanced scheduling with optimal timing',
        'Detailed audience analytics',
        'Personalized interaction suggestions',
        'Priority support',
        'Custom communication styles'
      ],
      icon: Star,
      color: 'text-yellow-600',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$49.99',
      period: 'per month',
      description: 'For teams and heavy users',
      features: [
        'Unlimited AI-generated responses',
        'Advanced scheduling & automation',
        'Comprehensive audience insights',
        'Team collaboration features',
        'API access',
        'Dedicated account manager',
        'Custom integrations'
      ],
      icon: Users,
      color: 'text-purple-600'
    }
  ]

  const handleSubscribe = async (planId) => {
    if (isSubscribed) return

    setIsProcessing(true)
    try {
      const plan = plans.find(p => p.id === planId)
      await createSession(plan.price)
      setIsSubscribed(true)
      alert(`Successfully subscribed to ${plan.name} plan!`)
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (isSubscribed) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <CreditCard className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Subscription</h1>
          </div>
        </div>

        <div className="card text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for subscribing. You now have access to all premium features.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Unlimited Responses</h3>
              <p className="text-sm text-gray-600">Generate as many AI responses as you need</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Smart Scheduling</h3>
              <p className="text-sm text-gray-600">Optimize your posting times automatically</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Advanced Analytics</h3>
              <p className="text-sm text-gray-600">Deep insights into your audience</p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan: Pro</h3>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Next billing date:</span>
              <span className="font-medium text-gray-900">
                {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <CreditCard className="h-8 w-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Unlock the full potential of Reply Assist with our premium features. 
          Choose a plan that fits your needs and start building stronger social media connections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const Icon = plan.icon
          const isSelected = selectedPlan === plan.id
          
          return (
            <div
              key={plan.id}
              className={`card relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                plan.popular ? 'border-primary-500 shadow-lg scale-105' : 'border-gray-200'
              } ${isSelected ? 'ring-2 ring-primary-500' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center`}>
                  <Icon className={`h-8 w-8 ${plan.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={isProcessing}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isProcessing ? 'Processing...' : `Subscribe to ${plan.name}`}
              </button>
            </div>
          )
        })}
      </div>

      <div className="mt-16 card bg-gray-50 border-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose Reply Assist?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm">
                Advanced AI generates contextual, personalized responses that match your style
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Time-Saving</h3>
              <p className="text-gray-600 text-sm">
                Reduce time spent crafting responses by 80% while maintaining quality
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Better Engagement</h3>
              <p className="text-gray-600 text-sm">
                Increase your social media engagement by up to 150% with optimized content
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscription