import Image from 'next/image'
import AddUser from "@/components/AddUser";
import {PrismaClient} from "@prisma/client";
import UserSummary from "@/components/UserSummary";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 5
export default async function Home() {
    const prisma = new PrismaClient()
    const tokens = await prisma.stravaToken.findMany()

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-5 md:p-24 p-5">
            <div className="flex gap-5">
                <AddUser/>
                <Button variant="outline">
                    <Link href="/download-activities">Refresh data</Link>
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-ellipsis">
                {tokens.map(t => <UserSummary token={t}/>)}
            </div>
        </main>
    )
}
