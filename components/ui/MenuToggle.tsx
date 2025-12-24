// MenuToggle.tsx
'use client'
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import MobileNav from '../layout/MobileNav';

export default function MenuToggle() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);



    return (
        <>
            <button
                onClick={() => { setIsMenuOpen(!isMenuOpen); console.log(isMenuOpen); }}
                className=' md:hidden z-50 relative cursor-pointer'
                aria-label='Toggle menu'
            >
                {isMenuOpen ? (
                    <X className='text-white' size={28} />
                ) : (
                    <Menu size={28} />
                )}
            </button>

            <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </>
    );
}