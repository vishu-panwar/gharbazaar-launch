import { Building2 } from 'lucide-react'
import { useState } from 'react'
import { getLogoUrl, BRAND_NAME } from '@/lib/constants'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showText?: boolean
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10', 
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
}

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
}

export function Logo({ size = 'md', className = '', showText = false }: LogoProps) {
  const [imageError, setImageError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const handleImageError = () => {
    if (retryCount < 2) {
      // Try to reload the image
      setRetryCount(prev => prev + 1)
      setTimeout(() => {
        const img = new Image()
        img.onload = () => setImageError(false)
        img.onerror = () => setImageError(true)
        img.src = getLogoUrl()
      }, 100)
    } else {
      setImageError(true)
    }
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded-lg shadow-lg ${imageError ? 'bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center' : ''}`}>
        {!imageError ? (
          <img
            src={getLogoUrl()}
            alt={`${BRAND_NAME} Logo`}
            className="w-full h-full object-cover"
            onError={handleImageError}
            onLoad={() => {
              setImageError(false)
              setRetryCount(0)
            }}
            loading="eager"
          />
        ) : (
          <Building2 
            size={iconSizes[size]} 
            className="text-white" 
          />
        )}
      </div>
      {showText && (
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          {BRAND_NAME}
        </span>
      )}
    </div>
  )
}