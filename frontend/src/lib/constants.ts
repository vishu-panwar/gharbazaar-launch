// Logo and branding constants
export const LOGO_URL = `/logo.jpeg?v=${Date.now()}`
export const BRAND_NAME = 'GharBazaar'
export const BRAND_TAGLINE = "India's Premier Property Platform"

// Cache busting for logo to ensure it loads on Vercel
export const getLogoUrl = () => `/logo.jpeg?v=${Date.now()}`