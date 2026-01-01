'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Shield,
  Users,
  CheckCircle,
  Building2,
  Sparkles,
  Star
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useLoader } from '@/components/GlobalLoader'

export default function LoginPage() {
  const router = useRouter()
  const { login, loginWithGoogle } = useAuth()
  const { showLoader } = useLoader()

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  // Handle Email Login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)
    showLoader('Signing you in securely...', 2000)

    try {
      await login(formData.email, formData.password)
    } catch (error: any) {
      if (error.message.includes('user-not-found')) {
        alert('No account found with this email')
      } else if (error.message.includes('wrong-password')) {
        alert('Incorrect password')
      } else {
        alert(error.message || 'Login failed')
      }
      setLoading(false)
    }
  }

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setLoading(true)
    showLoader('Signing in with Google...', 2000)
    try {
      await loginWithGoogle()
    } catch (error: any) {
      alert(error.message || 'Google login failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-all duration-300 group border border-white/20"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">GharBazaar</h1>
                <p className="text-purple-200">India's Premier Property Platform</p>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-white leading-tight">
                Welcome Back to Your
                <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent"> Dream Home</span>
              </h2>
              <p className="text-xl text-purple-200 leading-relaxed">
                Access your personalized dashboard and continue your property journey with India's most trusted real estate platform.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Bank-Level Security</h3>
                  <p className="text-purple-200 text-sm">Your data is protected with enterprise-grade encryption</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">50,000+ Happy Users</h3>
                  <p className="text-purple-200 text-sm">Join thousands who found their perfect property</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Zero Broker Fees</h3>
                  <p className="text-purple-200 text-sm">Direct property deals without hidden charges</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-white italic mb-4">
                "GharBazaar made finding my dream home incredibly easy. The platform is intuitive and the support team is amazing!"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RK</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Rahul Kumar</p>
                  <p className="text-purple-200 text-sm">Property Buyer, Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">GharBazaar</h1>
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">Welcome Back!</h3>
              <p className="text-purple-200">Sign in to continue your property journey</p>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl group border border-gray-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="font-semibold text-gray-700 text-lg">Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-purple-200 font-medium">Or continue with email</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailLogin} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" size={20} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all text-white placeholder:text-purple-300 text-lg"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-white">Password</label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-teal-400 hover:text-teal-300 font-medium transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-14 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all text-white placeholder:text-purple-300 text-lg"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="w-5 h-5 text-teal-400 border-white/20 rounded focus:ring-teal-400 cursor-pointer bg-white/10"
                  />
                  <label htmlFor="remember" className="ml-3 text-sm text-purple-200 cursor-pointer">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center pt-6">
                <p className="text-purple-200">
                  Don't have an account?{' '}
                  <Link
                    href="/signup"
                    className="text-teal-400 hover:text-teal-300 font-semibold transition-colors"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}