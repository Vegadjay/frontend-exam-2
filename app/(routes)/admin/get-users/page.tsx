'use client'
import React from "react"
import { baseUrl } from "@/lib/url"
import { routerPush } from "@/lib/router-push";

type ClinicUser = {
  id: string | number
  name: string
  email: string
  role?: string
  phone?: string
  createdAt?: string
}

const Page = () => {

  const [data, setData] = React.useState<ClinicUser[]>([]);

  React.useEffect(() => {
    const authToken = localStorage.getItem("token");

    if (!authToken) {
      routerPush("login");
      return;
    }

    const getClinics = async () => {
      const response = await fetch(`${baseUrl}/admin/users`,
        {
          headers: {
            "Authorization": `Bearer ${authToken}`
          },
          method: "GET"
        }
      );
      const resData = await response.json();
      console.log(resData);
      const users: ClinicUser[] =
        Array.isArray(resData) ? resData
          : Array.isArray(resData?.users) ? resData.users
            : Array.isArray(resData?.data) ? resData.data
              : [];
      setData(users);
    }
    getClinics();
  }, [])


  return (
    <div className="min-h-screen flex mt-5 px-4">
      <div className="w-full max-w-2xl space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Clinic users</h1>
          <p className="text-sm text-gray-600">
            List of all doctors, receptionists, patients, and admins in this clinic.
          </p>
        </div>
        <div className="mx-auto bg-white rounded-md p-6 space-y-4">
          {
            data.map((item) => (
              <div key={item.id} className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
                <div><span className="font-semibold">ID:</span> {item.id}</div>
                <div><span className="font-semibold">Name:</span> {item.name}</div>
                <div><span className="font-semibold">Email:</span> {item.email}</div>
                <div><span className="font-semibold">Role:</span> {item.role}</div>
                <div><span className="font-semibold">Phone:</span> {item.phone}</div>
                <div><span className="font-semibold">Created At:</span> {item.createdAt ? new Date(item.createdAt).toLocaleString() : "-"}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Page