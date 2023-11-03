import Image from 'next/image'
import AddUser from "@/components/AddUser";
import {PrismaClient} from "@prisma/client";

export default async function Home() {
    const prisma = new PrismaClient()
    const tokens = await prisma.stravaToken.findMany()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <AddUser/>
            {tokens.map(t => t.firstname)}
        </main>
    )
}
