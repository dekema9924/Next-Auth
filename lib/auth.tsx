import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from '@/generated/prisma/client'
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins"
import { transporter } from "./Nodemailer";


const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),

    emailAndPassword: {
        enabled: true,
        autoSignIn: false //defaults to true

    },
    socialProviders: {

        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    trustedOrigins: ["http://localhost:3000", "https://yourdomain.com"],
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                if (type === "sign-in") {
                    // Send the OTP for sign in
                } else if (type === "email-verification") {
                    // Send the OTP for email verification
                    const message = {
                        from: 'Better-Auth-Demo <no-reply@betterauth-demo.com>',
                        to: email,
                        subject: "your OTP code",
                        text: `your otp for ${type} is ${otp}`,
                        html: `<p>Your OTP for ${type} is: <strong>${otp}</strong></p>`,


                    }

                    await transporter.sendMail(message)




                } else {
                    // Send the OTP for password reset
                }
            }
        }),
        nextCookies()
    ],




});


