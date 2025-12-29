'use client'
import React, { useState } from 'react'
import { ShieldCheck, Lock, Eye, EyeOff, Check } from 'lucide-react'
import { resetPassword } from '@/lib/actions/auth-actions'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: ''
    })

    const validatePassword = (pwd: string) => {
        if (pwd.length < 8) {
            return 'Password must be at least 8 characters'
        }
        if (!/[A-Z]/.test(pwd)) {
            return 'Password must contain an uppercase letter'
        }
        if (!/[a-z]/.test(pwd)) {
            return 'Password must contain a lowercase letter'
        }
        if (!/[0-9]/.test(pwd)) {
            return 'Password must contain a number'
        }
        return ''
    }

    const handleSubmit = async () => {
        const newErrors = {
            password: '',
            confirmPassword: ''
        }

        // Validate password
        const passwordError = validatePassword(password)
        if (passwordError) {
            newErrors.password = passwordError
        }

        // Validate confirm password
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)

        if (newErrors.password || newErrors.confirmPassword) {
            return
        }

        setIsLoading(true)

        try {
            // Get token from URL
            const urlParams = new URLSearchParams(window.location.search)
            const token = urlParams.get('token')

            if (!token) {
                throw new Error('Invalid reset link')
            }

            const response = await resetPassword(confirmPassword, token)
            if (!response.status) {
                throw new Error('Failed to reset password')
            }
            setIsSuccess(true)

            // Redirect to sign in after 2 seconds
            setTimeout(() => {
                window.location.href = '/auth/signin'
            }, 2000)
        } catch (err: any) {
            setErrors({
                ...errors,
                password: err.message || 'Something went wrong. Please try again.'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const getPasswordStrength = () => {
        if (!password) return { strength: 0, label: '', color: '' }

        let strength = 0
        if (password.length >= 8) strength++
        if (/[A-Z]/.test(password)) strength++
        if (/[a-z]/.test(password)) strength++
        if (/[0-9]/.test(password)) strength++
        if (/[^A-Za-z0-9]/.test(password)) strength++

        if (strength <= 2) return { strength: 33, label: 'Weak', color: 'bg-red-500' }
        if (strength <= 3) return { strength: 66, label: 'Medium', color: 'bg-yellow-500' }
        return { strength: 100, label: 'Strong', color: 'bg-green-500' }
    }

    const passwordStrength = getPasswordStrength()

    if (isSuccess) {
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
                        Password Reset Successful!
                    </h2>
                    <p className="text-gray-400 text-center mb-8">
                        Your password has been reset successfully.<br />
                        Redirecting you to sign in...
                    </p>

                    {/* Loading indicator */}
                    <div className="flex justify-center">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-[#0a0e27] via-[#141937] to-[#0f1629] flex items-center justify-center p-4">
            <div className="bg-[#151a30] rounded-3xl shadow-2xl w-full max-w-md p-8 border border-[#1f2544]">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <ShieldCheck className="text-white" size={32} />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-white text-center mb-2">
                    Reset Password
                </h2>
                <p className="text-gray-400 text-center mb-8">
                    Enter your new password below
                </p>

                {/* Form */}
                <div className="space-y-4">
                    {/* New Password */}
                    <div>
                        <label className="text-gray-300 text-sm mb-2 block">
                            New Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setErrors({ ...errors, password: '' })
                                }}
                                placeholder="Enter new password"
                                className={`w-full bg-[#1a1f38] text-white placeholder-gray-600 rounded-lg pl-11 pr-12 py-3 focus:outline-none focus:ring-2 transition-all border ${errors.password
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-[#252b47] focus:ring-blue-500'
                                    }`}
                                disabled={isLoading}
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                type="button"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-xs mt-2">{errors.password}</p>
                        )}

                        {/* Password Strength */}
                        {password && (
                            <div className="mt-2">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-400">Password strength:</span>
                                    <span className={`text-xs font-medium ${passwordStrength.label === 'Weak' ? 'text-red-400' :
                                        passwordStrength.label === 'Medium' ? 'text-yellow-400' :
                                            'text-green-400'
                                        }`}>
                                        {passwordStrength.label}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-[#1a1f38] rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                        style={{ width: `${passwordStrength.strength}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-gray-300 text-sm mb-2 block">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                    setErrors({ ...errors, confirmPassword: '' })
                                }}
                                placeholder="Confirm new password"
                                className={`w-full bg-[#1a1f38] text-white placeholder-gray-600 rounded-lg pl-11 pr-12 py-3 focus:outline-none focus:ring-2 transition-all border ${errors.confirmPassword
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-[#252b47] focus:ring-blue-500'
                                    }`}
                                disabled={isLoading}
                            />
                            <button
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                type="button"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-400 text-xs mt-2">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-[#1a1f38] rounded-lg p-4 border border-[#252b47]">
                        <p className="text-gray-300 text-xs font-medium mb-2">Password must contain:</p>
                        <ul className="space-y-1">
                            <li className={`text-xs flex items-center gap-2 ${password.length >= 8 ? 'text-green-400' : 'text-gray-500'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${password.length >= 8 ? 'bg-green-400' : 'bg-gray-500'}`} />
                                At least 8 characters
                            </li>
                            <li className={`text-xs flex items-center gap-2 ${/[A-Z]/.test(password) ? 'text-green-400' : 'text-gray-500'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-400' : 'bg-gray-500'}`} />
                                One uppercase letter
                            </li>
                            <li className={`text-xs flex items-center gap-2 ${/[a-z]/.test(password) ? 'text-green-400' : 'text-gray-500'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(password) ? 'bg-green-400' : 'bg-gray-500'}`} />
                                One lowercase letter
                            </li>
                            <li className={`text-xs flex items-center gap-2 ${/[0-9]/.test(password) ? 'text-green-400' : 'text-gray-500'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(password) ? 'bg-green-400' : 'bg-gray-500'}`} />
                                One number
                            </li>
                        </ul>
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
                                <span>Resetting...</span>
                            </div>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-xs mt-8">
                    Remember your password?{' '}
                    <button
                        onClick={() => window.location.href = '/auth/signin'}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    )
}