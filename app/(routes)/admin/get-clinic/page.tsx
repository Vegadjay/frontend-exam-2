'use client'
import React from "react"
import { baseUrl } from "@/lib/url"
import { routerPush } from "@/lib/router-push";


const page = () => {

    const [data, setData] = React.useState<any>({});

    React.useEffect(() => {
        const authToken = localStorage.getItem("token");

        if (!authToken) {
            routerPush("login");
            return;
        }

        const getClinics = async () => {
            const response = await fetch(`${baseUrl}/admin/clinic`,
                {
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    },
                    method: "GET"
                }
            );
            const resData = await response.json();
            console.log(resData);
            setData(resData);
        }
        getClinics();
    }, [])


    return (
        <div className="min-h-screen flex mt-5 px-4">
            <div className="w-full max-w-xl space-y-4">
                <div>
                    <h1 className="text-2xl font-semibold">Clinic overview</h1>
                    <p className="text-sm text-gray-600">
                        Basic information and quick stats for your clinic.
                    </p>
                </div>
                <div className="mx-auto bg-white rounded-md p-6 space-y-4">
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">ID:</span>
                        <span className="text-gray-900">{data?.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Name:</span>
                        <span className="text-gray-900">{data?.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Code:</span>
                        <span className="text-gray-900">{data?.code}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Created At:</span>
                        <span className="text-gray-900">{data?.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">User Count:</span>
                        <span className="text-gray-900">{data?.userCount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Appointment Count:</span>
                        <span className="text-gray-900">{data?.appointmentCount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Queue Count:</span>
                        <span className="text-gray-900">{data?.queueCount}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page