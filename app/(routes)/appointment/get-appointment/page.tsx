'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { baseUrl } from '@/lib/url';
import { routerPush } from '@/lib/router-push';


const page = () => {

    const [data, setData] = useState([]);


    useEffect(() => {
        const authToken = localStorage.getItem("token");

        if (!authToken) {
            routerPush("login");
        }

        const getAppointment = async () => {
            const response = await fetch(`${baseUrl}/appointments/my`,
                {
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    },
                    method: "GET"
                }
            )
            const data = await response.json();
            setData(data);
        }

        getAppointment();
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-xl space-y-4">
                <div>
                    <h1 className="text-2xl font-semibold">My appointments</h1>
                    <p className="text-sm text-gray-600">
                        View your upcoming visits and their queue status.
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