import strava from "strava-v3";
import {PrismaClient} from "@prisma/client";

type Props = { searchParams: { code: string } }
export default async function StravaCallback({searchParams}: Props) {
    strava.config({
        redirect_uri: `https://straba-challenge.vercel.app/strava-callback`,
        client_id: process.env.NEXT_SECRET_STRAVA_CLIENT_ID as string,
        client_secret: process.env.NEXT_SECRET_STRAVA_CLIENT_SECRET as string,
        access_token: ""
    })
    const prisma = new PrismaClient()
    const {code} = searchParams;
    const authResponse = await getAuthResponse(code)
    const {athlete} = authResponse
    const id = `${athlete.id}`
    await prisma.stravaToken.upsert({
        create: {
            strava_user_id: id,
            firstname: athlete.firstname,
            lastname: athlete.lastname,
            profile_medium: athlete.profile_medium,
            access_token: authResponse.access_token,
            refresh_token: authResponse.refresh_token,

        },
        update: {
            access_token: authResponse.access_token,
            refresh_token: authResponse.refresh_token
        },
        where: {
            strava_user_id: id
        }
    })

    return (<div>
        Ok, got your data. Thanks {athlete.firstname}
    </div>)
}

async function getAuthResponse(code: string) {
    try {
        return await strava.oauth.getToken(code)
    } catch (e) {
        console.error(`Error getting token: ${JSON.stringify((e as any).request)}`)
        throw e;
    }
}