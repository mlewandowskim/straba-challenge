import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {Activity} from ".prisma/client";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getBaseUrl() {
    if (process.env.NODE_ENV === "development") {
        return `http://localhost:3000`
    }

    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
}


export function getPoints(activity: Activity) {
    const multipliers = {
        "Walk": 6,
        "VirtualRide": 1.75,
        "Ride": 2
    } as any
    const multiplier = multipliers[activity.type] ?? 0;
    return Math.round(activity.distance.toNumber() * multiplier * 0.01);
}