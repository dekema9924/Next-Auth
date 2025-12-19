

import Image from 'next/image'
import imagePlaceholder from '@/public/window.svg'
import { User } from 'lucide-react';
import { GlobeLock } from 'lucide-react';
import { Lock } from 'lucide-react';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';



export default function Dashboard() {
    return (
        <div className=' bg-white shadow-2xl border-red-800 border w-11/12 m-auto p-4 rounded-md'>

            <div >
                <h1 className='text-2xl font-semibold'>Welcome to your Dashboard</h1>
                <p className='text-gray-600'>Manage account settings and explore betterAuth features</p>
            </div>


            {/* //profile info */}
            <div className='flex flex-col w-11/12 m-auto md:flex-row  md:items-center gap-3 mt-6 p-4 border-t border-gray-200 bg-gray-100'>
                <Image
                    src={imagePlaceholder}
                    alt="profileImage"
                    width={200}
                    height={200}
                    className='rounded-full w-10 bg-cover'
                />
                <div className='leading-5'>
                    <span className='block'>John Doe</span>
                    <span className='text-gray-600 font-semibold block'>Youremail@gmail.com</span>
                </div>
                <button className='md:ml-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'>SignOut</button>

            </div>

            {/* auth status */}
            <div className='bg-blue-100 p-4 rounded-md border border-blue-400 w-11/12 m-auto mt-10 text-blue-600'>
                <p className='font-semibold'>Authentication Status</p>
                <div className='mt-10 flex flex-col md:flex-wrap w-96 justify-between gap-4'>
                    <p>
                        Status: <span className='text-green-800 bg-green-100 rounded-md px-2'> Authenticated</span>
                    </p>
                    <p>
                        UserId: <span className='font-semibold'> 1234567890</span>
                    </p>
                    <p>
                        Provider: <span className='font-semibold'> BetterAuth</span>
                    </p>
                    <p>
                        Email Verified: <span className='font-semibold text-green-800 bg-green-100 px-2 rounded-md'>yes</span>
                    </p>
                </div>
            </div>


            {/* cards */}
            <div className=' flex md:flex-row flex-col justify-center items-center mt-10 p-4 w-11/12 m-auto'>
                {
                    [
                        { title: "Secure Access", description: "Experience seamless and secure login with Better-Auth's advanced authentication methods.", image: Lock, imageBg: "bg-blue-100" },
                        { title: "Social Login", description: "Enhance your account security with multi-factor authentication options.", image: GlobeLock, imageBg: "bg-green-100" },
                        { title: "User Management", description: "Utilize biometric authentication for quick and secure access.", image: User, imageBg: "bg-purple-100" },
                    ].map((card, index) => (
                        <div key={index} className=" bg-gray-100/50 h-66 border-gray-200 shadow-md rounded-lg p-6 m-4 inline-block  w-full ">
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
            <div className='bg-blue-100 p-4 rounded-md border border-blue-400  w-11/12 m-auto mt-10'>
                <h2 className='text-2xl font-semibold'>Try these Actions</h2>
                <div className='flex gap-4 my-6 md:flex-row flex-col'>
                    <button className='bg-blue-600 text-white md:w-30 h-9 rounded-lg cursor-pointer font-semibold'>Update Profile</button>
                    <button className='bg-gray-600 text-white md:w-30 h-9 rounded-lg cursor-pointer font-semibold'>Save Settings</button>
                    <button className='bg-white text-black md:w-30 h-9 border border-gray-500 rounded-lg cursor-pointer font-semibold'>Export Data</button>
                </div>
            </div>

            <div className='p-4 w-11/12 m-auto mt-10 '>
                <Link href={'/'} className='flex items-center gap-2 text-black border w-44 border-gray-300 px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer hover:text-white transition-colors duration-400'>
                    <MoveLeft size={16} />
                    Back to Home
                </Link>
            </div>




        </div>
    )
}
