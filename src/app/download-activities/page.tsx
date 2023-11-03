import {PrismaClient} from "@prisma/client";
import strava from "strava-v3";
export default async function() {
    const prisma = new PrismaClient()
    const tokens = await prisma.stravaToken.findMany()
    let updated = 0;
    for (const t of tokens) {
        const activities = await strava.athlete.listActivities({access_token: t.access_token})
        for (const a of activities) {
            const id = `${a.id}`
            await prisma.activity.upsert({
                where: {
                    strava_id: id
                },
                create: {
                    strava_id: id,
                    name: a.name,
                    distance: a.distance,
                    started_at: a.start_date,
                    strava_user_id: t.strava_user_id,
                    type: a.sport_type
                },
                update: {

                }
            })
            updated++;
        }
    }


    return (<div>
        Updated: {updated}
    </div>)
}