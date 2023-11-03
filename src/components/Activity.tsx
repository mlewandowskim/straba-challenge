import {Activity} from ".prisma/client";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {getPoints} from "@/lib/utils";

type Props = {
    activity: Activity
}
export default function ({activity}: Props) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {activity.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+{getPoints(activity)}p</div>
                <p className="text-xs text-muted-foreground">
                    {(activity.distance.toNumber() / 100).toFixed(2)}km
                </p>
                <p>
                    {activity.started_at.toLocaleDateString()} {activity.started_at.toLocaleTimeString()}
                </p>
            </CardContent>
        </Card>

    )
}