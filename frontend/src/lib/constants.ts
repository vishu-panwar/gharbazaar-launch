// Logo and branding constants
export const BRAND_NAME = 'GharBazaar'
export const BRAND_TAGLINE = "India's Premier Property Platform"

// Logo URLs for different environments
export const getLogoUrl = () => {
  if (typeof window !== 'undefined') {
    // Try multiple paths for Vercel compatibility
    return '/logo.jpeg'
  }
  return '/logo.jpeg'
}