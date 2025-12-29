'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import PasswordInputs from '../ui/PasswordInputs'
import { useModalContext } from '@/context/ModalContext'
import { changePassword } from '@/lib/actions/auth-actions'

export default function ChangePswrd() {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const { isChangePswrdModal, setChangePswrdModal } = useModalContext()

    const handleSubmit = async () => {
        const newErrors = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }

        if (!currentPassword) {
            newErrors.currentPassword = 'Current password is required'
        }

        if (newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters'
        }

        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)

        if (newErrors.currentPassword || newErrors.newPassword || newErrors.confirmPassword) {
            return
        }

        setIsLoading(true)

        try {
            const data = await changePassword(newPassword, currentPassword)
            if (!data.token) throw new Error('Failed to change password')

            toast.success('Password changed successfully!')
            handleCancel()
        } catch (err: any) {
            toast.error(err.message || 'Failed to change password')
        } finally {
            setIsLoading(false)
        }
    }


    const handleCancel = () => {
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setChangePswrdModal(false)
        setErrors({ currentPassword: '', newPassword: '', confirmPassword: '' })
    }

    if (!isChangePswrdModal) return null

    return (
        <>
            <div className="fixed bg-gray-800 opacity-70  inset-0 bg-opacity-50 z-40" onClick={handleCancel} />

            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-lg bg-white p-7 rounded-2xl shadow-2xl border border-gray-100">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Change Password</h2>
                    <button onClick={handleCancel} className="cursor-pointer text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <p className="text-gray-600 text-sm mb-6">
                    Enter your current password and choose a new secure password
                </p>

                {/* Password Inputs Component */}
                <PasswordInputs
                    currentPassword={currentPassword}
                    newPassword={newPassword}
                    confirmPassword={confirmPassword}
                    onCurrentPasswordChange={(value) => {
                        setCurrentPassword(value)
                        setErrors({ ...errors, currentPassword: '' })
                    }}
                    onNewPasswordChange={(value) => {
                        setNewPassword(value)
                        setErrors({ ...errors, newPassword: '' })
                    }}
                    onConfirmPasswordChange={(value) => {
                        setConfirmPassword(value)
                        setErrors({ ...errors, confirmPassword: '' })
                    }}
                    errors={errors}
                    disabled={isLoading}
                    showPasswordStrength={true}
                />

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg py-3 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 transition-colors"
                    >
                        {isLoading ? 'Changing...' : 'Change Password'}
                    </button>
                </div>
            </div>
        </>
    )
}