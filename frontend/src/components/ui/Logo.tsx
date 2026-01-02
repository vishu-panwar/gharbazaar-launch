import Image from 'next/image'
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
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded-lg shadow-lg`}>
        <Image
          src="/logo.jpeg"
          alt="GharBazaar Logo"
          fill
          className="object-cover"
          onError={(e) => {
            // Fallback to icon if logo image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.className += ' bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center';
              const icon = document.createElement('div');
              icon.innerHTML = `<svg width="${iconSizes[size]}" height="${iconSizes[size]}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`;
              parent.appendChild(icon);
            }
          }}
        />
      </div>
      {showText && (
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          GharBazaar
        </span>
      )}
    </div>
  )
}