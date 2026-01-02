'use client'

import { useState, useEffect } from 'react'
import Loader from '@/components/ui/Loader'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Auto-hide the loader after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Loader 
      isVisible={isLoading} 
      message="Preparing your GharBazaar experience..."
      duration={3000}
      onComplete={() => setIsLoading(false)}
    />
  )
}