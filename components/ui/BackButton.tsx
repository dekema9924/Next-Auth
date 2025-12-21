'use client';
import { useRouter } from 'next/navigation';
import { MoveLeft } from 'lucide-react';

export function BackButton() {
    const router = useRouter();

    return (
        <div className='p-4 w-11/12 m-auto mt-10'>
            <button
                className=' flex items-center gap-2text-black border w-44 border-gray-300 px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer hover:text-white transition-colors duration-400'
                onClick={() => {
                    router.push('/');
                    router.refresh();
                }}
            >
                <MoveLeft size={16} />
                Back to Home
            </button>
        </div>
    );
}
