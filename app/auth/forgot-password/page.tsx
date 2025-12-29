'use client'
import React, { useState } from 'react'
import { ShieldCheck, ArrowLeft, Mail, Check } from 'lucide-react'
import { SendresetPasswordUrl } from '@/lib/actions/auth-actions'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            setError('Please enter your email address')
            return
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address')
            return
        }

        setIsLoading(true)
        setError('')

        try {

            const data = await SendresetPasswordUrl(email)

            if (data) {
                console.log(data)
                toast.success(data.message)
            }

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            if (!data.status) {
                throw new Error('Failed to send reset email')
            }

            setIsSubmitted(true)
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleBack = () => {
        window.history.back()
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-linear-to-br from-[#0a0e27] via-[#141937] to-[#0f1629] flex items-center justify-center p-4">
                <div className="bg-[#151a30] rounded-3xl shadow-2xl w-full max-w-md p-8 border border-[#1f2544]">

                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                            <Check className="text-green-500" size={32} />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-white text-center mb-2">
                        Check Your Email
                    </h2>
                    <p className="text-gray-400 text-center mb-8">
                        We've sent a password reset link to<br />
                        <span className="text-white font-medium">{email}</span>
                    </p>

                    {/* Instructions */}
                    <div className="bg-[#1a1f38] rounded-lg p-4 mb-6 border border-[#252b47]">
                        <p className="text-gray-300 text-sm mb-2">
                            Check your email inbox
                        </p>
                        <p className="text-gray-300 text-sm mb-2">
                            Click the reset link in the email
                        </p>
                        <p className="text-gray-300 text-sm">
                            Create a new password
                        </p>
                    </div>

                    {/* Resend */}
                    <p className="text-center text-gray-400 text-sm mb-4">
                        Didn't receive the email?{' '}
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                        >
                            Try again
                        </button>
                    </p>

                    {/* Back to Sign In */}
                    <button
                        onClick={handleBack}
                        className="w-full bg-[#1a1f38] hover:bg-[#1f2540] text-white rounded-lg py-3 transition-all border border-[#252b47] flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={20} />
                        Back to Sign In
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-[#0a0e27] via-[#141937] to-[#0f1629] flex items-center justify-center p-4">
            <div className="bg-[#151a30] rounded-3xl shadow-2xl w-full max-w-md p-8 relative border border-[#1f2544]">

                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <ShieldCheck className="text-white" size={32} />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-white text-center mb-2">
                    Forgot Password?
                </h2>
                <p className="text-gray-400 text-center mb-8">
                    No worries! Enter your email and we'll send you reset instructions.
                </p>

                {/* Form */}
                <div className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label className="text-gray-300 text-sm mb-2 block">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setError('')
                                }}
                                placeholder="Enter your email"
                                className={`w-full bg-[#1a1f38] text-white placeholder-gray-600 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 transition-all border ${error
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-[#252b47] focus:ring-blue-500'
                                    }`}
                                disabled={isLoading}
                            />
                        </div>
                        {error && (
                            <p className="text-red-400 text-xs mt-2">{error}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-linear-to-r from-[#4f6ef5] to-[#3b82f6] hover:from-[#4361ee] hover:to-[#2563eb] text-white font-medium rounded-lg py-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Sending...</span>
                            </div>
                        ) : (
                            'Send Reset Link'
                        )}
                    </button>
                </div>

                {/* Back to Sign In Link */}
                <div className="mt-6 text-center">
                    <button
                        onClick={handleBack}
                        className="text-gray-400 hover:text-white transition-colors text-sm flex items-center justify-center gap-1 mx-auto"
                    >
                        <ArrowLeft size={16} />
                        Back to Sign In
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-xs mt-8">
                    Remember your password?{' '}
                    <button
                        onClick={handleBack}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    )
}