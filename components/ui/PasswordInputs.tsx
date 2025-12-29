'use client'
import React, { useState } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'

interface PasswordInputsProps {
    currentPassword: string
    newPassword: string
    confirmPassword: string
    onCurrentPasswordChange: (value: string) => void
    onNewPasswordChange: (value: string) => void
    onConfirmPasswordChange: (value: string) => void
    errors?: {
        currentPassword?: string
        newPassword?: string
        confirmPassword?: string
    }
    disabled?: boolean
    showPasswordStrength?: boolean
}

export default function PasswordInputs({
    currentPassword,
    newPassword,
    confirmPassword,
    onCurrentPasswordChange,
    onNewPasswordChange,
    onConfirmPasswordChange,
    errors = {},
    disabled = false,
    showPasswordStrength = true
}: PasswordInputsProps) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const getPasswordStrength = () => {
        if (!newPassword) return { strength: 0, label: '', color: '' }

        let strength = 0
        if (newPassword.length >= 8) strength++
        if (/[A-Z]/.test(newPassword)) strength++
        if (/[a-z]/.test(newPassword)) strength++
        if (/[0-9]/.test(newPassword)) strength++
        if (/[^A-Za-z0-9]/.test(newPassword)) strength++

        if (strength <= 2) return { strength: 33, label: 'Weak', color: 'bg-red-500' }
        if (strength <= 3) return { strength: 66, label: 'Medium', color: 'bg-yellow-500' }
        return { strength: 100, label: 'Strong', color: 'bg-green-500' }
    }

    const passwordStrength = getPasswordStrength()

    return (
        <div className="space-y-4">
            {/* Current Password */}
            <div>
                <label className="text-gray-700 text-sm font-medium mb-2 block">
                    Current Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => onCurrentPasswordChange(e.target.value)}
                        placeholder="Enter current password"
                        className={`w-full bg-gray-50 text-gray-800 placeholder-gray-400 rounded-lg pl-11 pr-12 py-3 focus:outline-none focus:ring-2 transition-all border ${errors.currentPassword
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        disabled={disabled}
                    />
                    <button
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        type="button"
                        disabled={disabled}
                    >
                        {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {errors.currentPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
                )}
            </div>

            <hr className="my-4 border-gray-200" />

            {/* New Password */}
            <div>
                <label className="text-gray-700 text-sm font-medium mb-2 block">
                    New Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => onNewPasswordChange(e.target.value)}
                        placeholder="Enter new password"
                        className={`w-full bg-gray-50 text-gray-800 placeholder-gray-400 rounded-lg pl-11 pr-12 py-3 focus:outline-none focus:ring-2 transition-all border ${errors.newPassword
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        disabled={disabled}
                    />
                    <button
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        type="button"
                        disabled={disabled}
                    >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {errors.newPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
                )}

                {/* Password Strength */}
                {showPasswordStrength && newPassword && (
                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">Password strength:</span>
                            <span className={`text-xs font-medium ${passwordStrength.label === 'Weak' ? 'text-red-500' :
                                    passwordStrength.label === 'Medium' ? 'text-yellow-500' :
                                        'text-green-500'
                                }`}>
                                {passwordStrength.label}
                            </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${passwordStrength.color} transition-all duration-300`}
                                style={{ width: `${passwordStrength.strength}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Confirm New Password */}
            <div>
                <label className="text-gray-700 text-sm font-medium mb-2 block">
                    Confirm New Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => onConfirmPasswordChange(e.target.value)}
                        placeholder="Confirm new password"
                        className={`w-full bg-gray-50 text-gray-800 placeholder-gray-400 rounded-lg pl-11 pr-12 py-3 focus:outline-none focus:ring-2 transition-all border ${errors.confirmPassword
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        disabled={disabled}
                    />
                    <button
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        type="button"
                        disabled={disabled}
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="text-gray-700 text-xs font-medium mb-2">Password must contain:</p>
                <ul className="space-y-1">
                    <li className={`text-xs flex items-center gap-2 ${newPassword.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-400'}`} />
                        At least 8 characters
                    </li>
                    <li className={`text-xs flex items-center gap-2 ${/[A-Z]/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-400'}`} />
                        One uppercase letter
                    </li>
                    <li className={`text-xs flex items-center gap-2 ${/[a-z]/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-400'}`} />
                        One lowercase letter
                    </li>
                    <li className={`text-xs flex items-center gap-2 ${/[0-9]/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-400'}`} />
                        One number
                    </li>
                </ul>
            </div>
        </div>
    )
}