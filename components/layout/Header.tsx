import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import UserBadge from '../ui/UserBadge';
import MenuToggle from '../ui/MenuToggle';

export default async function Header() {

    return (
        <>
            <header className=' shadow-xl relative '>
                <nav className=' flex items-center justify-between md:px-10 px-2 py-4 '>
                    <div className='flex items-center gap-2'>
                        <span className=' w-10 h-10  rounded-md flex items-center justify-center bg-blue-600'>
                            <ShieldCheck className='text-white' size={24} />
                        </span>
                        <span className='font-bold text-xl'>BetterAuth</span>
                    </div>

                    <div className=' items-center gap-4 hidden md:flex'>
                        <Link className='bg-blue-200 text-blue-600 w-20 h-8 rounded-lg font-bold flex justify-center items-center ' href={'/'}>
                            Home
                        </Link>
                        <Link href={'/dashboard'} className='bg-blue-600 text-white w-24 h-9 rounded-lg flex justify-center items-center'>
                            Dashboard
                        </Link>
                        <UserBadge />

                    </div>
                    <MenuToggle />

                </nav>
            </header >
        </>
    )
}
