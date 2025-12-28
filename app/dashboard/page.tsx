
import Image from 'next/image'
import imagePlaceholder from '@/public/window.svg'
import { User } from 'lucide-react';
import { GlobeLock } from 'lucide-react';
import { Lock } from 'lucide-react';
import SignOutButton from '@/components/ui/SignOutButton';
import { BackButton } from '@/components/ui/BackButton';
import UpdateProfleBtn from '@/components/ui/UpdateProfleBtn';
import UpdateProfile from '@/components/layout/UpdateProfile';
import { getUserProfile } from '@/lib/user';



export default async function Dashboard() {
    const profile = await getUserProfile()

    const showUpdateBtn = profile?.userWithAccounts?.accounts.map((a) => {
        return a.providerId
    })

    return (
        <>
            <div className='bg-white relative shadow-2xl shadow-red-500  md:w-11/12 m-auto md:p-4 p-2 rounded-md'>
                <div >
                    <h1 className='text-2xl font-semibold'>Welcome to your Dashboard</h1>
                    <p className='text-gray-600'>Manage account settings and explore betterAuth features</p>
                </div>


                {/* //profile info */}
                <div className='flex flex-col w-11/12 m-auto md:flex-row  md:items-center gap-3 mt-6 p-4 border-t border-gray-200 bg-gray-100'>
                    <Image
                        src={profile?.session.user.image || imagePlaceholder}
                        alt="profileImage"
                        width={200}
                        height={200}
                        className='rounded-full w-10 bg-cover'
                    />
                    <div className='leading-5'>
                        <span className='block'>{profile?.session.user.name}</span>
                        <span className='text-gray-600 font-semibold block'>{profile?.session.user.email}</span>
                    </div>
                    <SignOutButton />
                </div>

                {/* auth status */}
                <div className='bg-blue-100 p-4 rounded-md border border-blue-400 w-11/12 m-auto mt-10 text-blue-600'>
                    <p className='font-semibold'>Authentication Status</p>
                    <div className='mt-10 flex flex-col md:flex-wrap md:w-96 justify-between gap-4'>
                        <p>
                            Status: {profile?.session.user.emailVerified ? <span className='text-green-800 bg-green-100 rounded-md px-2'>Authenticated</span> : <span className='text-red-800 bg-red-100 w-fit rounded-md px-2'>Not Authenticated</span>}
                        </p>
                        <p>
                            UserId: <span className='font-semibold text-xs md:text-md '> {profile?.session.user.id}</span>
                        </p>
                        <div className="flex gap-2">
                            <span>Providers:</span>
                            {profile?.userWithAccounts?.accounts.map((a) => {
                                let label = "";
                                switch (a.providerId) {
                                    case "github": label = "GitHub"; break;
                                    case "google": label = "Google"; break;
                                    case "email":
                                    case "credential":
                                        label = "Better Auth"; break;

                                }
                                return (
                                    <span key={a.providerId} className="bg-gray-100 px-2 py-1 rounded">
                                        {label}
                                    </span>
                                );
                            })}
                        </div>


                        <p>
                            Email Verified: <span className={`font-semibold ${profile?.session.user.emailVerified ? "text-green-800" : "text-red-800"} ${profile?.session.user.emailVerified ? "bg-green-100" : "bg-red-100"} px-2 rounded-md`}>{profile?.session.user.emailVerified ? "Yes" : "No"}</span>
                        </p>
                    </div>
                </div>


                {/* cards */}
                <div className=' flex md:flex-row flex-col justify-center items-center mt-10 p-4 w-11/12 m-auto '>
                    {
                        [
                            { title: "Secure Access", description: "Experience seamless and secure login with Better-Auth's advanced authentication methods.", image: Lock, imageBg: "bg-blue-100" },
                            { title: "Social Login", description: "Enhance your account security with multi-factor authentication options.", image: GlobeLock, imageBg: "bg-green-100" },
                            { title: "User Management", description: "Utilize biometric authentication for quick and secure access.", image: User, imageBg: "bg-purple-100" },
                        ].map((card, index) => (
                            <div key={index} className=" bg-gray-100/50 h-66 md:h-80 border-gray-200 shadow-md rounded-lg p-6 m-4 inline-block  w-full ">
                                <span className={` rounded-md ${card.imageBg} w-10 h-10 flex items-center justify-center `}>
                                    <card.image className=" text-blue-600" size={20} />
                                </span>
                                <h2 className="text-xl font-bold mb-2 mt-4">{card.title}</h2>
                                <p className="text-gray-700">{card.description}</p>
                            </div>
                        ))
                    }
                </div>


                {/* //actions */}
                {
                    showUpdateBtn?.includes("credential") || showUpdateBtn?.includes("email") ? (
                        <div className='bg-blue-100 p-4 rounded-md border border-blue-400  w-11/12 m-auto mt-10'>
                            <h2 className='text-2xl font-semibold'>Try these Actions</h2>
                            <div className='flex gap-4 my-6 md:flex-row flex-col'>
                                <UpdateProfleBtn isEmailVerified={!!profile?.session.user.emailVerified} />
                                <button className='bg-gray-600 text-white md:w-30 h-9 rounded-lg cursor-pointer font-semibold'>Save Settings</button>
                                <button className='bg-white text-black md:w-30 h-9 border border-gray-500 rounded-lg cursor-pointer font-semibold'>Export Data</button>
                            </div>
                        </div>

                    ) : ""

                }
                <BackButton />
            </div>
            <UpdateProfile user={profile?.session.user} />
        </>

    )
}
