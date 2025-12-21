
// import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function UserBadge() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) return <Link href={'/auth/signin'}>SignIn</Link>;

    return (
        <div className="flex items-center gap-2">


            {session.user.image && (
                <Image
                    src={session.user.image}
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            )}
        </div>
    );
}
