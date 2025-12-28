"use client";

import { toast } from "react-hot-toast";
import { useModalContext } from "@/context/ModalContext";

export default function UpdateProfleBtn({
    isEmailVerified,
}: {
    isEmailVerified: boolean;
}) {
    const { setUpdateModal } = useModalContext();

    const handleClick = () => {
        if (!isEmailVerified) {
            toast.error("Verify your account to use this function");
            return;
        }

        setUpdateModal(true);
    };

    return (
        <button
            onClick={handleClick}
            className="bg-blue-600 text-white md:w-30 h-9 rounded-lg cursor-pointer font-semibold"
        >
            Update Profile
        </button>
    );
}
