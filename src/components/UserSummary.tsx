import {StravaToken} from ".prisma/client";
import {PrismaClient} from "@prisma/client";
import Activity from "@/components/Activity";
import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getPoints} from "@/lib/utils";

type Props = {
    token: StravaToken
}
export default async function ({token}: Props) {
    const prisma = new PrismaClient()
    const activities = await prisma.activity.findMany({
        where: {
            strava_user_id: `${token.strava_user_id}`,
            started_at: {
                gte: '2023-11-01T00:00:00Z'
            },
        },
        orderBy: {
            started_at: "desc"
        }
    })

    const total = activities.reduce((acc, a) => acc + getPoints(a), 0)

    return (
        <div className="border-2 rounded-lg p-2">
            <div className="flex justify-start items-center gap-1 md:gap-3 mb-5">
                <Avatar>
                    <AvatarImage src={token.profile_medium} alt="Picture"/>
                </Avatar>
                <h2 className="md:text-3xl text-l">{token.firstname} {token.lastname} ({total}p)</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {activities.map(a => <Activity activity={a}/>)}
            </div>
        </div>
    )

}