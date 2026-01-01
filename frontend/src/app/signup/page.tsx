'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Shield,
  Users,
  Building2,
  Sparkles,
  Star,
  CheckCircle,
  Gift
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useLoader } from '@/components/GlobalLoader'

export default function SignupPage() {
  const router = useRouter()
  const { signup, loginWithGoogle } = useAuth()
  const { showLoader } = useLoader()

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false,
  })

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong']
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']

  // Handle Email Signup
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all fields')
      return
    }

    if (passwordStrength < 2) {
      alert('Please use a stronger password')
      return
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions')
      return
    }

    setLoading(true)
    showLoader('Creating your account...', 2000)

    try {
      await signup(formData.email, formData.password, formData.name)
    } catch (error: any) {
      alert(error.message || 'Signup failed')
      setLoading(false)
    }
  }

  // Handle Google Signup
  const handleGoogleSignup = async () => {
    setLoading(true)
    showLoader('Signing up with Google...', 2000)
    try {
      await loginWithGoogle()
    } catch (error: any) {
      alert(error.message || 'Google signup failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
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
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">GharBazaar</h1>
                <p className="text-pink-200">Join India's Fastest Growing Property Platform</p>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-white leading-tight">
                Start Your
                <span className="bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent"> Property Journey</span>
                Today
              </h2>
              <p className="text-xl text-pink-200 leading-relaxed">
                Join thousands of satisfied users who found their perfect property through our platform. Create your account in seconds!
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Free Account Setup</h3>
                  <p className="text-pink-200 text-sm">No hidden fees, completely free to get started</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Verified Properties Only</h3>
                  <p className="text-pink-200 text-sm">Every listing is verified by our expert team</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Expert Support 24/7</h3>
                  <p className="text-pink-200 text-sm">Get help from property experts anytime</p>
                </div>
              </div>
            </div>

            {/* Success Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-pink-200 text-sm">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">25K+</div>
                <div className="text-pink-200 text-sm">Properties Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">4.9★</div>
                <div className="text-pink-200 text-sm">User Rating</div>
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
                "Signing up was the best decision! Found my dream apartment within a week. The process was smooth and transparent."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PS</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Priya Sharma</p>
                  <p className="text-pink-200 text-sm">New User, Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">GharBazaar</h1>
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">Create Account</h3>
              <p className="text-pink-200">Join thousands finding their perfect property</p>
            </div>

            {/* Signup Form */}
            <div className="space-y-6">
              {/* Google Signup */}
              <button
                onClick={handleGoogleSignup}
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
                  <span className="px-4 bg-transparent text-pink-200 font-medium">Or create with email</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSignup} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300" size={20} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all text-white placeholder:text-pink-300 text-lg"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300" size={20} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all text-white placeholder:text-pink-300 text-lg"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-14 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all text-white placeholder:text-pink-300 text-lg"
                      placeholder="Create a strong password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-300 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${strengthColors[passwordStrength]} ${
                              passwordStrength === 0 ? 'w-1/4' : 
                              passwordStrength === 1 ? 'w-2/4' : 
                              passwordStrength === 2 ? 'w-3/4' : 'w-full'
                            }`}
                          />
                        </div>
                        <span className="text-sm text-pink-200 font-medium">
                          {strengthLabels[passwordStrength]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start space-x-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="w-5 h-5 text-pink-400 border-white/20 rounded focus:ring-pink-400 cursor-pointer bg-white/10 mt-0.5"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-pink-200 cursor-pointer leading-relaxed">
                    I agree to the{' '}
                    <Link href="/terms" className="text-pink-400 hover:text-pink-300 underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-pink-400 hover:text-pink-300 underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="text-center pt-6">
                <p className="text-pink-200">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="text-pink-400 hover:text-pink-300 font-semibold transition-colors"
                  >
                    Sign in
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