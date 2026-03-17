"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

const page = () => {
    const router = useRouter()

    return (
        <div className='flex gap-2 h-screen justify-center items-center'>
            <Button onClick={() => router.push("/admin/get-clinic")}>
                Get clinic
            </Button>
            <Button onClick={() => router.push("/admin/get-users")}>
                Get users
            </Button>
            <Button onClick={() => router.push("/admin/add-users")}>
                Add users
            </Button>
        </div>
    )
}

export default page