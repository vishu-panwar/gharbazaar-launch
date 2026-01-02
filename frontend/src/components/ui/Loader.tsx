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
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            onComplete?.()
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, duration / 50)

    return () => {
      clearInterval(progressInterval)
    }
  }, [isVisible, duration, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <div className="text-center">
        {/* Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 relative overflow-hidden rounded-3xl shadow-2xl mx-auto">
            <Image
              src="/logo.jpeg"
              alt="GharBazaar Logo"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
            GharBazaar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            India's Premier Property Platform
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {progress}%
          </div>
        </div>

        {/* Loading Message */}
        <div className="mb-8">
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            {message}
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Secure</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span>Trusted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span>Transparent</span>
          </div>
        </div>
      </div>
    </div>
  )
}