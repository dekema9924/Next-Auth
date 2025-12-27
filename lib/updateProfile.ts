'use server'
import { getSession } from "./session";
import { prisma } from '@/lib/prisma'


export const updateUser = async (firstName: string, lastName: string, email: string) => {
    const session = await getSession()
    let name = firstName + " " + lastName

    if (!session) return

    const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: {
            name,
            email,
            // other fields
        },
    });

    return updatedUser

}