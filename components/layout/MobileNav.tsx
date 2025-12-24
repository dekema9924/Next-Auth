// MobileNav.tsx
'use client'
import Link from 'next/link'
import UserBadge from '../ui/UserBadge';

interface MobileNavProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (value: boolean) => void;
}

export default function MobileNav({ isMenuOpen, setIsMenuOpen }: MobileNavProps) {
    return (
        <>
            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden'
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`absolute top-0 right-0 h-full w-full shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className='flex flex-col p-6 pt-20 gap-4'>
                    <Link
                        onClick={() => setIsMenuOpen(false)}
                        className='bg-blue-200 text-blue-600 h-12 rounded-lg font-bold flex justify-center items-center hover:bg-blue-300 transition-colors'
                        href={'/'}
                    >
                        Home
                    </Link>
                    <Link
                        onClick={() => setIsMenuOpen(false)}
                        href={'/dashboard'}
                        className='bg-blue-600 text-white h-12 rounded-lg flex justify-center items-center hover:bg-blue-700 transition-colors'
                    >
                        Dashboard
                    </Link>

                </div>
            </div>
        </>
    )
}