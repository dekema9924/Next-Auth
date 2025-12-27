'use client'

import { useModalContext } from "@/context/ModalContext"
import { useEffect } from "react"

export default function Background() {
    const { isUpdateModalOpen } = useModalContext()

    useEffect(() => {
        if (isUpdateModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isUpdateModalOpen]);

    if (!isUpdateModalOpen) return null

    return (
        <div className="fixed inset-0 bg-black/70 z-40">

        </div>
    )
}
