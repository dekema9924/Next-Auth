'use client'
import { useModalContext } from '@/context/ModalContext'

export default function UpdateProfleBtn() {
    const { isUpdateModalOpen, setUpdateModal } = useModalContext()

    console.log(isUpdateModalOpen)
    return (

        <button onClick={() => { setUpdateModal(true) }} className='bg-blue-600 text-white md:w-30 h-9 rounded-lg cursor-pointer font-semibold'>Update Profile</button>

    )
}
