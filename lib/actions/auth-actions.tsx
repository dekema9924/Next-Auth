
'use server'
import { auth } from "../auth"
import { headers } from "next/headers";

export const Signup = async (email: string, password: string, name: string) => {
    const user = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
        }
    });
    return { user };
}

export const Signin = async (email: string, password: string) => {

    const user = await auth.api.signInEmail({
        returnHeaders: true,

        body: {
            email,
            password,
            callbackURL: "/dashboard",
        }
    });
    return { user };
}

export const Signout = async () => {
    const user = await auth.api.signOut({ headers: await headers() });
    return { user };
}