// MobileNav.tsx
'use client'
import { X } from 'lucide-react';
import Link from 'next/link'
import { useEffect } from 'react';

interface MobileNavProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (value: boolean) => void;
}

export default function MobileNav({ isMenuOpen, setIsMenuOpen }: MobileNavProps) {

    //disable scroll if menu open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);
    return (
        <>
            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-40 md:hidden bg-black/30 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-6 right-6 text-gray-800 hover:text-gray-600"
                    aria-label="Close menu"
                >
                    <X size={28} />
                </button>

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