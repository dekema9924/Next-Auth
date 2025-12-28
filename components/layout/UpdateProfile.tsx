'use client'
import { useModalContext } from "@/context/ModalContext"
import Image from "next/image"
import ImagePlaceholder from '@/public/window.svg'
import { BadgeCheck, Trash } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRef, useState } from "react";
import { updateUser } from "@/lib/updateProfile";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { Signout } from "@/lib/actions/auth-actions";


type Inputs = {
    firstName: string
    lastName: string
    email: string
    file: FileList
}

export default function UpdateProfile(profile: any) {
    const { isUpdateModalOpen, setUpdateModal } = useModalContext()
    const profileRef = useRef<HTMLInputElement>(null)
    const [FileData, setFileData] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('')
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsUploading(true)
        let imageUrl: string | undefined = ''

        try {
            // Upload image to Cloudinary if a file was selected
            if (FileData) {
                const formData = new FormData()
                formData.append('file', FileData)

                // Use server action instead of API route
                const uploadResult = await uploadToCloudinary(formData)

                if (!uploadResult.success) {
                    throw new Error(uploadResult.error || 'Image upload failed')
                }

                imageUrl = uploadResult.url
                console.log('Uploaded image URL:', imageUrl)
            }

            // Update profile
            const result = await updateUser(
                data.firstName,
                data.lastName,
                data.email,
                imageUrl || undefined
            )

            if (result.success) {
                setUpdateModal(false)

                if (result.emailChanged) {
                    router.push('/auth/verify-email')
                    localStorage.setItem('pending_verification_email', data.email);
                    // await Signout()
                    toast.success('Profile updated! Please verify your new email address.')
                } else {
                    toast.success('Profile Updated Successfully!')
                }

                router.refresh()
                handleCancel()
            } else {
                toast.error(result.error || 'Failed to update profile')
            }
        } catch (error: any) {
            console.error('Update error:', error)
            toast.error(error.message || 'Failed to update profile')
        } finally {
            setIsUploading(false)
        }
    }
    const handleCancel = () => {
        setUpdateModal(false)
        reset()
        setFileData(null)
        setUploadedImageUrl('')
        if (profileRef.current) {
            profileRef.current.value = ""
        }
    }

    if (!isUpdateModalOpen) return null

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={handleCancel}
            />

            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-lg bg-white p-7 rounded-2xl shadow-2xl border border-gray-100">

                {/* Header profile image */}
                <div>
                    <div className="flex items-center gap-2">
                        <div className="relative w-12 flex flex-row-reverse">
                            <Image
                                src={profile.user.image || ImagePlaceholder}
                                width={100}
                                height={100}
                                alt="profileImage"
                                className="rounded-full w-10 h-10 object-cover"
                            />
                            <span className="bg-blue-600 block absolute bottom-0 h-5 rounded-md">
                                <BadgeCheck className="text-white w-5 h-5" />
                            </span>
                        </div>
                        <div className="leading-4">
                            <h1 className="text-2xl capitalize font-semibold">{profile.user.name}</h1>
                            <p>{profile?.user?.email}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="my-10">
                    {/* Name */}
                    <div className="flex w-full gap-10 md:w-120">
                        <label className="w-6/12 md:w-44" htmlFor="name">Name</label>
                        <div className="flex gap-4">
                            <div>
                                <input
                                    placeholder="John"
                                    {...register("firstName", {
                                        maxLength: { value: 20, message: 'Name too long' },
                                        minLength: { value: 2, message: 'Name too short' }
                                    })}
                                    className={`w-full placeholder-gray-500 rounded-lg px-2 border-gray-400 h-9 md:w-11/12 focus:outline-none focus:ring-2 transition-all border ${errors.firstName
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
                                    placeholder="Smith"
                                    {...register("lastName", {
                                        maxLength: { value: 20, message: 'Name too long' },
                                        minLength: { value: 2, message: 'Name too short' }
                                    })}
                                    className={`w-full placeholder-gray-500 rounded-lg px-2 border-gray-400 h-9 md:w-11/12 focus:outline-none focus:ring-2 transition-all border ${errors.lastName
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
                    <hr className="my-4 border-t border-gray-500 w-full" />

                    {/* Email */}
                    <div className="flex gap-4 md:w-120">
                        <label className="w-6/12 md:w-44" htmlFor="email">Email address</label>
                        <div>
                            <input
                                {...register("email", {
                                    pattern: {
                                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                                defaultValue={profile.user.email}
                                placeholder="Enter your email"
                                className={`w-full placeholder-gray-500 rounded-lg px-2 border-gray-400 h-9 md:w-11/12 focus:outline-none focus:ring-2 transition-all border ${errors.email
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-[#252b47] focus:ring-blue-500'
                                    }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>
                    </div>
                    <hr className="my-4 border-t border-gray-500 w-full" />

                    {/* Profile photo */}
                    <div className="md:w-120 my-10 flex gap-2">
                        <label className="w-6/12 md:w-44" htmlFor="profile">Profile Photo</label>

                        {/* Show preview if file selected, otherwise show current image */}
                        {FileData ? (
                            <img
                                src={URL.createObjectURL(FileData)}
                                alt="Preview"
                                className="rounded-full w-10 h-10 object-cover"
                            />
                        ) : (
                            <Image
                                src={profile.user.image || ImagePlaceholder}
                                width={100}
                                height={100}
                                alt="profileImage"
                                className="rounded-full w-10 h-10 object-cover"
                            />
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            {...register("file", {
                                validate: {
                                    isImage: (files) =>
                                        !files?.[0] || files[0].type.startsWith("image/") || "Only images allowed",
                                },
                                onChange: (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    console.log("selected:", file);
                                    setFileData(file);
                                }
                            })}
                            ref={(el) => {
                                register("file").ref(el);
                                profileRef.current = el;
                            }}
                        />

                        <div>
                            <button
                                type="button"
                                onClick={() => profileRef.current?.click()}
                                className="w-30 h-7 rounded-md font-semibold text-sm shadow-2xl border border-gray-400"
                            >
                                click to replace
                            </button>
                            {FileData ? (
                                <p className="text-xs text-blue-600 mt-1">{FileData.name}</p>
                            ) : errors.file && (
                                <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>
                            )}
                        </div>
                    </div>
                    <hr className="my-4 border-t border-gray-500 w-full" />

                    {/* Buttons */}
                    <div className="flex md:flex-row flex-col-reverse gap-5 md:justify-between">
                        <button
                            type="button"
                            className="flex cursor-pointer gap-2 items-center bg-red-100 text-red-600 px-5 rounded-md h-9"
                        >
                            <Trash style={{ width: 15 }} />Delete user
                        </button>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-200 cursor-pointer px-4 h-9 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isUploading}
                                className="bg-blue-200 cursor-pointer text-blue-600 font-semibold px-10 rounded-md h-9 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUploading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}