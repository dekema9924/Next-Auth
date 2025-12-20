import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { session } from '@/lib/session'


export default function Header() {

    console.log(session?.session.token)
    return (
        <>
            <header className=' shadow-xl'>
                <nav className='flex items-center justify-between px-10 py-4'>
                    <div className='flex items-center gap-2'>
                        <span className=' w-10 h-10  rounded-md flex items-center justify-center bg-blue-600'>
                            <ShieldCheck className='text-white' size={24} />
                        </span>
                        <span className='font-bold text-xl'>BetterAuth</span>
                    </div>

                    <div className='flex items-center gap-4'>
                        <Link className='bg-blue-200 text-blue-600 w-20 h-8 rounded-lg font-bold flex justify-center items-center ' href={'/'}>
                            Home
                        </Link>
                        <Link href={'/dashboard'} className='bg-blue-600 text-white w-24 h-9 rounded-lg flex justify-center items-center'>
                            Dashboard
                        </Link>
                        {
                            session?.user ?
                                <>
                                    <Link className='border border-gray-200 text-gray-500 px-5 h-9 rounded-lg flex justify-center items-center' href="/auth/signin">
                                        Sign In
                                    </Link>
                                </>
                                : <button className=' bg-red-400  px-5 h-9 rounded-lg flex justify-center items-center'>Sign Out</button>
                        }

                    </div>

                </nav>
            </header>
        </>
    )
}
