'use client'
import React from "react"
import { baseUrl } from "@/lib/url"
import { routerPush } from "@/lib/router-push";

const page = () => {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {

        const authToken = localStorage.getItem("token");

        if (!authToken) {
            routerPush("login");
        }

        const getDoctors = async () => {
            const response = await fetch(`${baseUrl}/reports/my`,
                {
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    },
                    method: "GET"
                }
            );
            const data = await response.json();
            setData(data);
        }
        getDoctors();
    }, [])

    return (
        <div className="flex mt-5 px-4">
            <div className="w-full max-w-xl space-y-4">
                <div>
                    <h1 className="text-2xl font-semibold">My reports</h1>
                    <p className="text-sm text-gray-600">
                        View diagnosis details and test information for your visits.
                    </p>
                </div>
                <div className="bg-white rounded-md p-4 space-y-2">
                    {/* @ts-ignore */}
                    <span>{data?.error || "No error"}</span>
                </div>
            </div>
        </div>
    )
}

export default page