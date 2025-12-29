'use client'
import { useModalContext } from '@/context/ModalContext'

export default function ChangePswrdBtn() {
    const { setChangePswrdModal, isChangePswrdModal } = useModalContext()

    return (
        <button onClick={() => setChangePswrdModal(true)} className='bg-gray-600 text-white md:w-60 h-9 rounded-lg cursor-pointer font-semibold'>Change Password</button>
    )
}
