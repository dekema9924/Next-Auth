'use client';
import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Signin, Signup } from '@/lib/actions/auth-actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form"
import { LockOpen } from 'lucide-react';
import { Loader2 } from 'lucide-react';


function SignInPage() {
    interface FormData {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }




    const router = useRouter();
    const [activeTab, setActiveTab] = useState('signup');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        //handle form submit
        console.log("data", data);
        let name = data.firstName + " " + data.lastName;

        if (activeTab === 'signup') {

            //signup logic
            try {
                const res = await Signup(data.email, data.password, name);
                console.log(res);
                if (res.user) {
                    reset();
                    toast.success("Signup successful");
                    setActiveTab('signin');
                }
            } catch (error: any) {
                console.error("Signup error:", error);
                toast.error(error.message);
            }
        } else {
            //signin logic
            try {
                const res = await Signin(data.email, data.password);
                console.log(res);


                if (res.user) {
                    toast.success("Signup successful");
                    router.push('/dashboard');
                }

            } catch (error: any) {
                console.error("Signin error:", error);
                toast.error(error.message);
            }

        }
    }


    return (
        <div className="min-h-screen bg-linear-to-b from-[#050816] via-[#0f1535] to-[#1e3a8a] flex items-center justify-center p-4">
            {/* Modal Container */}
            <div className="bg-[#151a30] rounded-3xl shadow-2xl w-full max-w-md p-8 relative border border-[#1f2544]">

                {/* Toggle Tabs */}
                <div className="flex items-center gap-2 bg-[#0d1128] rounded-lg p-1 mb-8 w-fit border border-[#1a1f3d]">
                    <button
                        onClick={() => { setActiveTab('signup'); reset() }}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'signup'
                            ? 'bg-[#1e2642] text-white shadow-lg'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Sign up
                    </button>
                    <button
                        onClick={() => { setActiveTab('signin'), reset() }}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'signin'
                            ? 'bg-[#1e2642] text-white shadow-lg'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Sign in
                    </button>

                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-white mb-6">
                    {activeTab === 'signup' ? 'Create an account' : 'Welcome back'}
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Fields - Only for Sign Up */}
                    {activeTab === 'signup' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <input
                                        {...register("firstName", {
                                            required: 'First name is required',
                                            maxLength: { value: 20, message: 'Name too long' },
                                            minLength: { value: 2, message: 'Name too short' }
                                        })}
                                        type="text"
                                        placeholder="First name"
                                        className={`w-full bg-[#1a1f38] text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all border ${errors.firstName
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-[#252b47] focus:ring-blue-500'
                                            }`}
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        {...register("lastName", {
                                            required: 'Last name is required',
                                            maxLength: { value: 20, message: 'Name too long' },
                                            minLength: { value: 2, message: 'Name too short' }
                                        })}
                                        type="text"
                                        placeholder="Last name"
                                        className={`w-full bg-[#1a1f38] text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all border ${errors.lastName
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-[#252b47] focus:ring-blue-500'
                                            }`}
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Email Field */}
                    <div>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                {...register("email", {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                                type="email"
                                placeholder="Enter your email"
                                className={`w-full bg-[#1a1f38] text-white placeholder-gray-600 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 transition-all border ${errors.email
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-[#252b47] focus:ring-blue-500'
                                    }`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="relative">
                            {
                                passwordVisible ? <LockOpen onClick={() => setPasswordVisible(!passwordVisible)} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} /> : <Lock onClick={() => setPasswordVisible(!passwordVisible)} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            }                       <input
                                {...register("password", {
                                    required: 'Password is required',
                                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                                    maxLength: { value: 50, message: 'Password is too long' }
                                })}
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className={`w-full bg-[#1a1f38] text-white placeholder-gray-600 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 transition-all border ${errors.password
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-[#252b47] focus:ring-blue-500'
                                    }`}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Forgot Password - Only for Sign In */}
                    {activeTab === 'signin' && (
                        <div className="text-right">
                            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                                Forgot password?
                            </a>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-linear-to-r from-[#4f6ef5] to-[#3b82f6] hover:from-[#4361ee] hover:to-[#2563eb] text-white font-medium rounded-lg py-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    >
                        <div className='flex items-center justify-center gap-2'>
                            {activeTab === 'signup' ? 'Create an account' : 'Sign in'}
                            {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : null}
                        </div>
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-[#252b47]"></div>
                        <span className="text-gray-500 text-sm">OR SIGN IN WITH</span>
                        <div className="flex-1 h-px bg-[#252b47]"></div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button type="button" className="flex items-center justify-center gap-2 bg-[#1a1f38] hover:bg-[#1f2540] text-white rounded-lg py-3 transition-all border border-[#252b47]">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 bg-[#1a1f38] hover:bg-[#1f2540] text-white rounded-lg py-3 transition-all border border-[#252b47]">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </button>
                    </div>

                    {/* Terms */}
                    <p className="text-center text-gray-500 text-xs mt-6">
                        {activeTab === 'signup' ? (
                            <>
                                By creating an account, you agree to our{' '}
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Terms & Service
                                </a>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('signup')}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Sign up
                                </button>
                            </>
                        )}
                    </p>
                </form>
            </div>
        </div >
    );
}

export default SignInPage;