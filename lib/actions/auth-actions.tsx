
'use server'
import { redirect } from "next/navigation";
import { auth } from "../auth"
import { headers } from "next/headers";



//signup
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


//signin
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


//signout
export const Signout = async () => {
    const user = await auth.api.signOut({ headers: await headers() });
    return { user };
}




//social signIn
export const SignInWithSocial = async (provider: string) => {
    const { url } = await auth.api.signInSocial({
        body: {
            provider: provider,
            callbackURL: "/dashboard",
        }
    })
    if (url) {
        redirect(url);
    }
}


//send OTP
export const SendOtp = async (email: string) => {
    const data = await auth.api.sendVerificationOTP({
        body: {
            email, // required
            type: "email-verification", // required
        },
    })
    return { data };
}


//verify OTP
export const VerifyOtp = async (email: string, otp: string) => {
    const data = await auth.api.verifyEmailOTP({
        body: {
            email, // required
            otp, // required
        },
    });
    return { data };
}