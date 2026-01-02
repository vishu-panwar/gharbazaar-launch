import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Check if Firebase config is properly set
const isFirebaseConfigured = Object.values(firebaseConfig).every(value => 
  value && value !== 'undefined' && !value.includes('placeholder')
)

// Initialize Firebase only if properly configured
let app: any = null
let auth: any = null
let db: any = null
let storage: any = null
let analytics: any = null
let googleProvider: any = null

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
    googleProvider = new GoogleAuthProvider()
    
    // Configure Google Provider
    googleProvider.setCustomParameters({
      prompt: 'select_account',
    })

    // Initialize Analytics (only in browser)
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app)
        }
      })
    }
  } catch (error) {
    console.warn('Firebase initialization failed:', error)
  }
} else {
  console.warn('Firebase not configured properly. Please set up your Firebase environment variables.')
}

// PERFORMANCE OPTIMIZATION: Auth utilities
export const AuthUtils = {
  // Get current user synchronously (no waiting)
  getCurrentUser: () => {
    if (!auth) return null
    return auth.currentUser
  },

  // Check if user is logged in (instant) - improved for refresh
  isLoggedIn: () => {
    const user = AuthUtils.getCurrentUser()
    const cachedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    return !!(user || (cachedUser && token))
  },

  // Get cached user data (instant) - improved error handling and refresh detection
  getCachedUser: () => {
    if (typeof window === 'undefined') return null
    try {
      const cached = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      const lastLogin = localStorage.getItem('lastLogin')
      
      // Only return cached user if we have all required data and it's recent
      if (cached && token && lastLogin) {
        const parsed = JSON.parse(cached)
        const loginTime = parseInt(lastLogin)
        const now = Date.now()
        
        // Cache is valid for 24 hours
        if (parsed && (parsed.uid || parsed.email) && (now - loginTime < 24 * 60 * 60 * 1000)) {
          return parsed
        }
      }
      
      // Clear stale cache
      if (cached || token) {
        AuthUtils.clearCache()
      }
      
      return null
    } catch (error) {
      console.warn('Error reading cached user, clearing cache:', error)
      AuthUtils.clearCache()
      return null
    }
  },

  // Cache user data for instant access - improved with timestamp
  cacheUser: (userData: any) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('userRole', userData.role || 'buyer')
      localStorage.setItem('lastLogin', Date.now().toString())
      
      // Set a token for refresh detection
      if (!localStorage.getItem('token')) {
        localStorage.setItem('token', `user-${userData.uid || Date.now()}`)
      }
    } catch (error) {
      console.warn('Error caching user data:', error)
    }
  },

  // Clear all cached data
  clearCache: () => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userMode')
      localStorage.removeItem('lastLogin')
    } catch (error) {
      console.warn('Error clearing cache:', error)
    }
  },

  // Get user role (instant)
  getUserRole: () => {
    if (typeof window === 'undefined') return 'buyer'
    return localStorage.getItem('userRole') || 'buyer'
  },

  // Check if this is a page refresh - improved detection
  isPageRefresh: () => {
    if (typeof window === 'undefined') return false
    
    // Multiple ways to detect refresh
    const perfNavigation = window.performance && window.performance.navigation
    const perfEntry = window.performance && window.performance.getEntriesByType('navigation')[0] as any
    
    return (
      (perfNavigation && perfNavigation.type === 1) ||
      (perfEntry && perfEntry.type === 'reload') ||
      (document.referrer === window.location.href)
    )
  },

  // Check if we're on a public page that doesn't need auth
  isPublicPage: (pathname?: string) => {
    const path = pathname || (typeof window !== 'undefined' ? window.location.pathname : '/')
    const publicPaths = ['/', '/about', '/contact', '/privacy', '/terms', '/testimonials', '/listings', '/pricing', '/founder']
    return publicPaths.includes(path) || 
           path.startsWith('/public') || 
           path.startsWith('/listings/') ||
           path.startsWith('/about') ||
           path.startsWith('/contact')
  }
}

// Recaptcha Verifier for Phone Auth
export const setupRecaptcha = (containerId: string) => {
  if (!auth || typeof window === 'undefined') {
    console.warn('Firebase Auth not initialized or not in browser environment')
    return null
  }
  
  try {
    // Clear any existing reCAPTCHA widget
    const container = document.getElementById(containerId)
    if (container) {
      container.innerHTML = ''
    }

    // Create new RecaptchaVerifier with visible size for better reliability
    const recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'normal',
      callback: (response: any) => {
        console.log('reCAPTCHA solved successfully')
      },
      'expired-callback': () => {
        console.log('reCAPTCHA expired, please try again')
      },
    })

    return recaptchaVerifier
  } catch (error) {
    console.error('Error setting up reCAPTCHA:', error)
    return null
  }
}

export { auth, db, storage, analytics, googleProvider }
export default app
