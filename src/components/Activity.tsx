import {Activity} from ".prisma/client";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {getPoints} from "@/lib/utils";
import Link from "next/link";

type Props = {
    activity: Activity
}
export default function ({activity}: Props) {
    return (
        <Link target="_blank" href={`https://www.strava.com/activities/${activity.strava_id}`}>
            <Card className="hover:bg-emerald-50 h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {activity.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{getPoints(activity)}p</div>
                    <p className="text-xs text-muted-foreground">
                        {(activity.distance.toNumber() / 1000).toFixed(2)}km
                    </p>
                    <p>
                        {activity.started_at.toLocaleDateString()} {activity.started_at.toLocaleTimeString()}
                    </p>
                </CardContent>
            </Card>
        </Link>

    )
}