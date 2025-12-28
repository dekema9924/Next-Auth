'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ShieldCheck, ArrowLeft } from 'lucide-react'
import { SendOtp, VerifyOtp } from '@/lib/actions/auth-actions'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


export default function VerifyOTPClient() {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [resendTimer, setResendTimer] = useState(60)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const router = useRouter()
    const email = localStorage.getItem('pending_verification_email');


    // Countdown timer for resend
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendTimer])

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        setError('')
        if (value && index < 5) inputRefs.current[index + 1]?.focus()
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus()
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, 6)
        if (!/^\d+$/.test(pastedData)) return
        const newOtp = [...otp]
        pastedData.split('').forEach((char, index) => { if (index < 6) newOtp[index] = char })
        setOtp(newOtp)
        const lastFilledIndex = Math.min(pastedData.length, 5)
        inputRefs.current[lastFilledIndex]?.focus()
    }


    //verify otp
    const handleVerify = async () => {
        const otpCode = otp.join('')
        if (otpCode.length !== 6) {
            setError('Please enter all 6 digits')
            return
        }

        if (!email) {
            setError('Email is missing')
            return
        }

        setIsLoading(true)
        setError('')
        try {
            const emailVerified = await VerifyOtp(email, otpCode)


            await new Promise(resolve => setTimeout(resolve, 1500))
            // after success
            localStorage.removeItem('pending_verification_email');
            if (emailVerified.data.status === true) {
                toast.success("Email verified! Please sign in.");

                setTimeout(() => {
                    router.push('/auth/signin');
                }, 1200);


            }
        } catch (err: any) {
            setError(err.message || 'Invalid OTP')
            setOtp(['', '', '', '', '', ''])
            inputRefs.current[0]?.focus()
        } finally {
            setIsLoading(false)
        }
    }


    //resend otp
    const handleResend = async () => {
        if (resendTimer > 0) return

        if (!email) {
            setError('Email is missing')
            return
        }

        setIsLoading(true)
        setError('')
        try {
            await SendOtp(email)
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API
            setResendTimer(60)
            setOtp(['', '', '', '', '', ''])
            inputRefs.current[0]?.focus()
        } catch (err: any) {
            setError(err.message || 'Failed to resend OTP')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#0f1629]">
            <div className="bg-[#151a30] rounded-3xl w-full max-w-md p-8 relative border border-[#1f2544]">
                <button
                    onClick={() => window.history.back()}
                    className="absolute top-6 left-6 text-gray-400 hover:text-white"
                >
                    <ArrowLeft size={24} />
                </button>

                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <ShieldCheck className="text-white" size={32} />
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-white text-center mb-2">Verify Your Email</h2>
                <p className="text-gray-400 text-center mb-8">
                    Enter the 6-digit code sent to<br />
                    <span className="text-white font-medium">{email}</span>
                </p>

                <div className="flex gap-3 justify-center mb-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className={`w-12 h-14 bg-[#1a1f38] text-white text-center text-xl rounded-lg border ${error ? 'border-red-500' : 'border-[#252b47]'}`}
                            disabled={isLoading}
                        />
                    ))}
                </div>

                {error && <p className="text-red-400 text-center mb-4">{error}</p>}

                <button
                    onClick={handleVerify}
                    disabled={isLoading || otp.join('').length !== 6}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
                >
                    {isLoading ? 'Verifying...' : 'Verify Email'}
                </button>

                <div className="mt-6 text-center">
                    {resendTimer > 0 ? (
                        <p className="text-gray-500 text-sm">
                            Resend code in <span className="text-white">{resendTimer}s</span>
                        </p>
                    ) : (
                        <button onClick={handleResend} disabled={isLoading} className="text-blue-400 text-sm">
                            Resend Code
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
