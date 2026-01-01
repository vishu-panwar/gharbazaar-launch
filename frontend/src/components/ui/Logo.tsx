import { Building2 } from 'lucide-react'

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
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg`}>
        <Building2 className="text-white" size={iconSizes[size]} />
      </div>
      {showText && (
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          GharBazaar
        </span>
      )}
    </div>
  )
}