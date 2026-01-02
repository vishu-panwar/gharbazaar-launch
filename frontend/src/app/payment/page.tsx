'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Shield,
  Lock,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  QrCode,
  CheckCircle,
  IndianRupee,
  Info,
  AlertCircle,
  X
} from 'lucide-react'

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Get order details from localStorage (from pricing page)
  useEffect(() => {
    const storedPlan = localStorage.getItem('selectedPlan')
    if (storedPlan) {
      const plan = JSON.parse(storedPlan)
      const orderData = {
        id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        planName: plan.name,
        planDescription: plan.description,
        amount: plan.price,
        period: plan.period,
        features: plan.features || [
          'Browse unlimited properties',
          'Direct owner contacts',
          'Priority support',
          'Property visits assistance',
          'Legal document help',
          'Negotiation support'
        ],
        taxes: Math.round(plan.price * 0.18), // 18% GST
        total: plan.price + Math.round(plan.price * 0.18),
        originalPrice: plan.originalPrice,
        savings: plan.savings,
        commission: plan.commission,
        color: plan.color
      }
      setOrderDetails(orderData)
    } else {
      // Fallback to mock data if no plan selected
      const mockOrder = {
        id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        planName: 'Premium Buyer Access',
        planDescription: 'Best value for serious buyers',
        amount: 1499,
        period: '3 Months',
        features: [
          'Browse unlimited properties',
          'Direct owner contacts',
          'Priority support',
          'Property visits assistance',
          'Legal document help',
          'Negotiation support'
        ],
        taxes: 269.82,
        total: 1768.82
      }
      setOrderDetails(mockOrder)
    }
  }, [])

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      description: 'Pay using any UPI app',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'bg-green-500',
      popular: true,
      processingFee: 0,
      apps: ['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI', 'Amazon Pay']
    },
    {
      id: 'cards',
      name: 'Debit/Credit Cards',
      description: 'Visa, Mastercard, RuPay',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-blue-500',
      popular: false,
      processingFee: 2.5,
      apps: ['Visa', 'Mastercard', 'RuPay', 'American Express']
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'Internet banking from 50+ banks',
      icon: <Building2 className="w-6 h-6" />,
      color: 'bg-purple-500',
      popular: false,
      processingFee: 0,
      apps: ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Bank']
    },
    {
      id: 'wallets',
      name: 'Digital Wallets',
      description: 'Quick wallet payments',
      icon: <Wallet className="w-6 h-6" />,
      color: 'bg-orange-500',
      popular: false,
      processingFee: 1.5,
      apps: ['Paytm Wallet', 'MobiKwik', 'FreeCharge', 'Amazon Pay']
    }
  ]

  const handlePayment = () => {
    if (!selectedMethod) return
    
    setLoading(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      setShowSuccess(true)
      // Clear the stored plan data after successful payment
      localStorage.removeItem('selectedPlan')
    }, 3000)
  }

  const calculateTotal = () => {
    if (!orderDetails) return 0
    const method = paymentMethods.find(m => m.id === selectedMethod)
    const processingFee = method ? (orderDetails.amount * method.processingFee / 100) : 0
    return orderDetails.amount + orderDetails.taxes + processingFee
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your {orderDetails?.planName} plan has been activated successfully.
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Order ID:</span>
              <span className="font-mono text-gray-900 dark:text-white">{orderDetails?.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Amount Paid:</span>
              <span className="font-semibold text-gray-900 dark:text-white">₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-semibold transition-all inline-block"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading payment details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/pricing"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Plans</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 relative overflow-hidden rounded-lg">
                  <Image
                    src="/logo.jpeg"
                    alt="GharBazaar Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">GharBazaar</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
              <Shield size={18} />
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                How would you like to pay?
              </h2>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    {method.popular && (
                      <div className="absolute -top-2 right-4">
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Recommended
                        </span>
                      </div>
                    )}

                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center text-white`}>
                        {method.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{method.name}</h3>
                          {method.processingFee > 0 && (
                            <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded">
                              +{method.processingFee}% fee
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{method.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {method.apps.slice(0, 4).map((app, i) => (
                            <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                              {app}
                            </span>
                          ))}
                          {method.apps.length > 4 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              +{method.apps.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {selectedMethod === method.id && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Button */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handlePayment}
                  disabled={!selectedMethod || loading}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    selectedMethod && !loading
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing Payment...</span>
                    </div>
                  ) : selectedMethod ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Lock size={20} />
                      <span>Continue to Secure Payment</span>
                    </div>
                  ) : (
                    'Select Payment Method'
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Shield size={12} />
                    <span>256-bit SSL</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Lock size={12} />
                    <span>Secure Payment</span>
                  </div>
                  <span>•</span>
                  <span>PCI DSS Compliant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{orderDetails.planName}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{orderDetails.planDescription}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Duration:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{orderDetails.period}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Plan Amount</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹{orderDetails.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Taxes & Fees</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹{orderDetails.taxes}</span>
                  </div>
                  {selectedMethod && paymentMethods.find(m => m.id === selectedMethod)?.processingFee && paymentMethods.find(m => m.id === selectedMethod)!.processingFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Processing Fee</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ₹{(orderDetails.amount * paymentMethods.find(m => m.id === selectedMethod)!.processingFee / 100).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      ₹{calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-start space-x-2">
                    <Info size={16} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-green-700 dark:text-green-400">
                      <p className="font-medium mb-1">What's included:</p>
                      <ul className="space-y-1">
                        {orderDetails.features.slice(0, 3).map((feature: string, i: number) => (
                          <li key={i} className="flex items-center space-x-1">
                            <CheckCircle size={12} className="text-green-500" />
                            <span className="text-xs">{feature}</span>
                          </li>
                        ))}
                        {orderDetails.features.length > 3 && (
                          <li className="text-xs text-green-600 dark:text-green-400">
                            +{orderDetails.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Order ID: <span className="font-mono">{orderDetails.id}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}