'use client'
import { useModalContext } from "@/context/ModalContext"
import Image from "next/image"
import ImagePlaceholder from '@/public/window.svg'
import { BadgeCheck, UserRoundPlus } from 'lucide-react';
import { Trash } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRef, useState } from "react";
import { updateUser } from "@/lib/updateProfile";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // console.log("Form data:", data);
        // console.log("hey");

        //update profile logic
        const updateProfile = await updateUser(data.firstName, data.lastName, data.email)
        if (updateProfile) {
            setUpdateModal(false)
            toast.success('profile Updated')
            router.refresh()
        }

    }

    const handleCancel = () => {
        // Close modal
        setUpdateModal(false);

        // Reset React Hook Form fields
        reset();

        // Clear local file state
        setFileData(null);

        // Clear actual file input
        if (profileRef.current) {
            profileRef.current.value = "";
        }
    };




    if (!isUpdateModalOpen) return null

    return (
        <>
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-lg bg-white p-7 rounded-2xl shadow-2xl border border-gray-100">

                {/* //header profile image */}
                <div>
                    <div className="flex items-center gap-2">
                        <div className="relative w-12 flex flex-row-reverse ">
                            <Image
                                src={ImagePlaceholder}
                                width={100}
                                height={100}
                                alt="profileImage"
                                className="rounded-full w-10 h-10 object-cover "
                            />
                            <span className="bg-blue-600 block absolute bottom-0 h-5 rounded-md">
                                <BadgeCheck className=" text-white w-5 h-5" />
                            </span>
                        </div>
                        <div className="leading-4">
                            <h1 className="font-bold text-2xl ">{profile.user.name}</h1>
                            <p>{profile?.user?.email}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="my-10" action="">
                    {/* name */}
                    <div className="flex w-full gap-10 md:w-120 ">
                        <label className="w-6/12 md:w-44" htmlFor="name">Name</label>
                        <div className="flex gap-4">
                            <div>
                                <input
                                    placeholder="John"
                                    {...register("firstName", {
                                        required: 'First name is required',
                                        maxLength: { value: 20, message: 'Name too long' },
                                        minLength: { value: 2, message: 'Name too short' }
                                    })}
                                    className={`w-full placeholder-gray-500 rounded-lg px-2 border-gray-400  h-9 md:w-11/12 focus:outline-none focus:ring-2 transition-all border ${errors.lastName
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-[#252b47] focus:ring-blue-500'
                                        }`} />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    placeholder="Smith"
                                    {...register("lastName", {
                                        required: 'Last name is required',
                                        maxLength: { value: 20, message: 'Name too long' },
                                        minLength: { value: 2, message: 'Name too short' }
                                    })}
                                    className={`w-full placeholder-gray-500 rounded-lg px-2 border-gray-400  h-9 md:w-11/12 focus:outline-none focus:ring-2 transition-all border ${errors.lastName
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-[#252b47] focus:ring-blue-500'
                                        }`} />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                    </div>
                    <hr className="my-4 border-t border-gray-500  w-full" />

                    {/* email */}
                    <div className="flex gap-4 md:w-120">
                        <label className="w-6/12 md:w-44" htmlFor="email">Email address</label>
                        <div>
                            <input
                                value={profile.user.email}
                                readOnly
                                // {...register("email", {
                                //     required: 'Email is required',
                                //     pattern: {
                                //         value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i,
                                //         message: 'Invalid email address'
                                //     }
                                // })}
                                // placeholder="Enter your email"
                                // className={`w-full placeholder-gray-500 rounded-lg px-2 border-gray-400  h-9 md:w-11/12 focus:outline-none focus:ring-2 transition-all border ${errors.lastName
                                //     ? 'border-red-500 focus:ring-red-500'
                                //     : 'border-[#252b47] focus:ring-blue-500'
                                //     }`}
                                className="px-7 h-9 rounded-md border outline-none border-gray-300 bg-blue-100"

                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <hr className="my-4 border-t border-gray-500  w-full" />


                    {/* profile photo */}
                    <div className="md:w-120 my-10 flex  gap-2">
                        <label className="w-6/12 md:w-44" htmlFor="profile">Profile Photo</label>
                        <Image
                            src={ImagePlaceholder}
                            width={100}
                            height={100}
                            alt="profileImage"
                            className="rounded-full w-10 h-10 object-cover "
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            {...register("file", {
                                required: 'File can not be empty',
                                validate: {
                                    isImage: (files) =>
                                        files?.[0]?.type.startsWith("image/") || "Only images allowed",
                                },
                                onChange: (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    console.log("selected:", file);
                                    setFileData(file);
                                }
                            })}
                            ref={(el) => {
                                register("file").ref(el); // React Hook Form ref
                                profileRef.current = el;   // Your ref
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

                    <hr className="my-4 border-t border-gray-500  w-full" />


                    {/* button */}
                    <div className="flex md:flex-row flex-col-reverse gap-5 md:justify-between">
                        <button type="button" className="flex cursor-pointer gap-2 items-center bg-red-100 text-red-600 px-5 rounded-md h-9"><Trash style={{ width: 15 }} />Delete user</button>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => handleCancel()} className="bg-gray-200 cursor-pointer px-4 h-9 rounded-md">Cancel</button>
                            <button
                                type="submit" className="bg-blue-200 cursor-pointer text-blue-600 font-semibold px-10 rounded-md h-9">Save</button>
                        </div>
                    </div>

                </form>

            </div>
        </>
    )
}
