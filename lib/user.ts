import { requireSession } from "./requireSession";
import { prisma } from '@/lib/prisma'


export async function getUserProfile() {
    const session = await requireSession()

    if (session) {
        const userWithAccounts = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
                accounts: true,
            },
        });

        return { userWithAccounts, session }

    }

}