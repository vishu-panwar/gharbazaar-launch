'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface LoaderProps {
  isVisible: boolean
  onComplete?: () => void
  duration?: number
  message?: string
}

export default function Loader({ 
  isVisible, 
  onComplete, 
  duration = 2000,
  message = "Building trust, one home at a time"
}: LoaderProps) {
  const [animationPhase, setAnimationPhase] = useState<'enter' | 'loading' | 'exit'>('enter')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    // Animation sequence
    const timer1 = setTimeout(() => {
      setAnimationPhase('loading')
    }, 300)

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, duration / 50)

    // Exit animation
    const timer2 = setTimeout(() => {
      setAnimationPhase('exit')
    }, duration - 500)

    // Complete
    const timer3 = setTimeout(() => {
      onComplete?.()
    }, duration)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearInterval(progressInterval)
    }
  }, [isVisible, duration, onComplete])

  if (!isVisible) return null

  return (
    <div 
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center
        bg-gradient-to-br from-gray-50 via-white to-teal-50
        dark:from-gray-950 dark:via-gray-900 dark:to-gray-800
        transition-all duration-500 ease-out
        ${animationPhase === 'exit' ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}
      `}
      style={{
        background: `
          radial-gradient(circle at 30% 20%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f0fdfa 100%)
        `
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-teal-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-emerald-200/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-blue-200/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center space-y-8">
        
        {/* Logo Container */}
        <div 
          className={`
            relative transition-all duration-700 ease-out
            ${animationPhase === 'enter' ? 'opacity-0 scale-90 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}
          `}
        >
          {/* Logo Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 via-emerald-400/20 to-blue-400/20 rounded-3xl blur-2xl scale-110 animate-pulse"></div>
          
          {/* Logo Background */}
          <div className="relative w-24 h-24 lg:w-32 lg:h-32 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 flex items-center justify-center overflow-hidden">
            {/* Logo Image */}
            <div className="relative w-16 h-16 lg:w-20 lg:h-20">
              <div className="w-full h-full bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Building2 className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
            </div>
                className="object-contain rounded-xl"
                priority
              />
            </div>
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-pulse"></div>
          </div>
        </div>

        {/* Brand Name */}
        <div 
          className={`
            text-center transition-all duration-700 delay-200 ease-out
            ${animationPhase === 'enter' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}
        >
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
            GharBazaar
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
            India's Leading Property Platform
          </p>
        </div>

        {/* Loading Animation */}
        <div 
          className={`
            relative transition-all duration-700 delay-400 ease-out
            ${animationPhase === 'enter' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}
        >
          {/* Circular Progress Ring */}
          <div className="relative w-20 h-20 lg:w-24 lg:h-24">
            {/* Background Ring */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              {/* Progress Ring */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-300 ease-out drop-shadow-sm"
              />
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Floating Dots Animation */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Loading Message */}
        <div 
          className={`
            text-center transition-all duration-700 delay-600 ease-out
            ${animationPhase === 'enter' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 font-light tracking-wide max-w-xs">
            {message}
          </p>
        </div>

        {/* Trust Indicators */}
        <div 
          className={`
            flex items-center space-x-6 transition-all duration-700 delay-800 ease-out
            ${animationPhase === 'enter' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}
        >
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Secure</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span>Trusted</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span>Transparent</span>
          </div>
        </div>
      </div>
    </div>
  )
}