'use server'
import { getSession } from "./session";
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { SendOtp } from "./actions/auth-actions";

export const updateUser = async (
    firstName?: string,
    lastName?: string,
    email?: string,
    imageUrl?: string
) => {
    try {
        const session = await getSession()

        if (!session?.user?.id) {
            throw new Error('Not authenticated')
        }

        const name = `${firstName} ${lastName}`.trim()
        const updateData: any = {
            name,
        }

        // Check if email is being changed
        const emailChanged = email !== session.user.email

        let updatedUser;

        if (emailChanged) {
            // Checking if email is already taken
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser && existingUser.id !== session.user.id) {
                throw new Error("Email is already in use");
            }

            // Update email + reset verification
            updatedUser = await prisma.user.update({
                where: { id: session.user.id },
                data: {
                    email,
                    name,
                    emailVerified: false,
                    ...(imageUrl && { image: imageUrl }),
                },
            });

            //  Send OTP to NEW email
            await SendOtp(updatedUser.email);
        } else {
            updatedUser = await prisma.user.update({
                where: { id: session.user.id },
                data: {
                    ...(imageUrl && { image: imageUrl }),
                    name
                },
            });
        }

        revalidatePath("/dashboard");

        return {
            success: true,
            emailChanged,
            user: {
                id: updatedUser.id,
                name: updateData,
                email: updatedUser.email,
                image: updatedUser.image,
                emailVerified: updatedUser.emailVerified,
            },
        };

    } catch (error: any) {
        console.error('Update user error:', error)
        return {
            success: false,
            error: error.message || 'Failed to update user'
        }
    }
}