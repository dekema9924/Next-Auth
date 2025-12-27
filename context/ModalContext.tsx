
'use client'

import React, { useContext, createContext, useState, Dispatch, SetStateAction } from "react";
interface isUpdatemodalContext {
    isUpdateModalOpen: boolean
    setUpdateModal: Dispatch<SetStateAction<boolean>>
}

const modalContext = createContext<isUpdatemodalContext>({
    isUpdateModalOpen: false,
    setUpdateModal: () => { }
});


export const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isUpdateModalOpen, setUpdateModal] = useState(false)

    return (
        <modalContext.Provider value={{ isUpdateModalOpen, setUpdateModal }}>
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
