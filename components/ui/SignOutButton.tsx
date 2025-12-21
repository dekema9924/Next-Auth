"use client";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter();
    return (
        <button
            onClick={async () => {
                const res = await authClient.signOut();
                if (res?.data?.success) {
                    toast.success("Signed out successfully");
                    router.push("/");
                    router.refresh();
                }
            }}
            className=" bg-red-400 cursor-pointer px-5 h-9 rounded-lg"
        >
            Sign Out
        </button>
    );
}
