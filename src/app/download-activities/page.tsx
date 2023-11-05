import {PrismaClient} from "@prisma/client";
import strava from "strava-v3";
export const dynamic = 'force-dynamic'
export const maxDuration = 60;

export default async function() {
    strava.config({
        redirect_uri: `https://straba-challenge.vercel.app/strava-callback`,
        client_id: process.env.NEXT_SECRET_STRAVA_CLIENT_ID as string,
        client_secret: process.env.NEXT_SECRET_STRAVA_CLIENT_SECRET as string,
        access_token: ""
    })
    const prisma = new PrismaClient()
    const tokens = await prisma.stravaToken.findMany()
    let updated = 0;
    for (const t of tokens) {
        const {access_token} = await strava.oauth.refreshToken(t.refresh_token)
        const activities = await strava.athlete.listActivities({access_token})
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