'use client'
import useSWR from "swr";
import {Button} from "@/components/ui/button";
import Link from "next/link";


export default function () {
    const {data, error, isLoading, mutate} = useSWR('/api/get-redirect-url', async () => {
        return fetch("/api/get-redirect-url").then(r => r.json())
    })

    if (error) return "An error has occurred." + error;
    if (isLoading) return "Loading...";

    return (
        <div>
            <Button>
                <Link href={data.redirect} target="_blank">Authorize</Link>
            </Button>
        </div>
    );
}