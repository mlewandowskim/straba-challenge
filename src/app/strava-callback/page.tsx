import strava from "strava-v3";
import {PrismaClient} from "@prisma/client";

type Props = {searchParams: { code: string}}
export default async function StravaCallback({searchParams}: Props) {
    const prisma = new PrismaClient()
    const {code} = searchParams;
    const authResponse = await strava.oauth.getToken(code)
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