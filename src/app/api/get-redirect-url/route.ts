// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import strava from "strava-v3";



const STRAVA_ACCS = [
  {refreshToken: '8e05640c003911fa48b558109937303c347b521d'}
]
export async function GET(
  req: NextApiRequest,
) {
  const acc = STRAVA_ACCS[0]
  strava.config({
    redirect_uri: 'http://localhost:3000/strava-callback',
    client_id: process.env.NEXT_SECRET_STRAVA_CLIENT_ID as string,
    client_secret: process.env.NEXT_SECRET_STRAVA_CLIENT_SECRET as string,
    access_token: ""
  })
  const redirect = await strava.oauth.getRequestAccessURL({
    scope: 'read_all,activity:read',
  })
  return Response.json({redirect})
}
