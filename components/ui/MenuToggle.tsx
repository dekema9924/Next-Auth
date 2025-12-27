// MenuToggle.tsx
'use client'
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import MobileNav from '../layout/MobileNav';

export default function MenuToggle() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);



    return (
        // MenuToggle.tsx
        <>
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='md:hidden z-50 relative cursor-pointer'
                aria-label='Toggle menu'
            >
                <Menu size={28} />
            </button>

            <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </>
    );
}