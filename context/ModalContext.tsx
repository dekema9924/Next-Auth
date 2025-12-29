
'use client'

import React, { useContext, createContext, useState, Dispatch, SetStateAction } from "react";
interface isUpdatemodalContext {
    isUpdateModalOpen: boolean
    setUpdateModal: Dispatch<SetStateAction<boolean>>
    isChangePswrdModal: boolean,
    setChangePswrdModal: Dispatch<SetStateAction<boolean>>
}

const modalContext = createContext<isUpdatemodalContext>({
    isUpdateModalOpen: false,
    setUpdateModal: () => { },
    isChangePswrdModal: false,
    setChangePswrdModal: () => { }
});


export const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isUpdateModalOpen, setUpdateModal] = useState(false)
    const [isChangePswrdModal, setChangePswrdModal] = useState(false)

    return (
        <modalContext.Provider value={{ isUpdateModalOpen, setUpdateModal, isChangePswrdModal, setChangePswrdModal }}>
            {children}
        </modalContext.Provider>
    )
}



export const useModalContext = () => {
    const context = useContext(modalContext)
    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider");
    }
    return context

}
