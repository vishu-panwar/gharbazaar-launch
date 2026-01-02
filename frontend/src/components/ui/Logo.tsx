import { Building2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { BRAND_NAME } from '@/lib/constants'

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
  const [logoUrl, setLogoUrl] = useState('')

  useEffect(() => {
    // Multiple logo URL attempts for Vercel compatibility
    const logoUrls = [
      '/logo.jpeg',
      './logo.jpeg',
      `${process.env.NODE_ENV === 'production' ? '' : ''}/logo.jpeg`,
      '/favicon.ico'
    ]
    
    const testImage = (url: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = url
      })
    }

    const findWorkingLogo = async () => {
      for (const url of logoUrls) {
        const works = await testImage(url)
        if (works) {
          setLogoUrl(url)
          setImageError(false)
          return
        }
      }
      // If no logo works, use fallback
      setImageError(true)
    }

    findWorkingLogo()
  }, [])

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded-lg shadow-lg ${imageError || !logoUrl ? 'bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center' : ''}`}>
        {!imageError && logoUrl ? (
          <img
            src={logoUrl}
            alt={`${BRAND_NAME} Logo`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            onLoad={() => setImageError(false)}
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