// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import strava from "strava-v3";
import {getBaseUrl} from "@/lib/utils";

export async function GET() {
  strava.config({
    redirect_uri: `${getBaseUrl()}/strava-callback`,
    client_id: process.env.NEXT_SECRET_STRAVA_CLIENT_ID as string,
    client_secret: process.env.NEXT_SECRET_STRAVA_CLIENT_SECRET as string,
    access_token: ""
  })
  const redirect = await strava.oauth.getRequestAccessURL({
    scope: 'read_all,activity:read',
  })
  return Response.json({redirect})
}
