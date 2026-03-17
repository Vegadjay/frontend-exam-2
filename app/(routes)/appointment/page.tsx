"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"


const page = () => {
  const router = useRouter()

  return (
    <div className="flex gap-2 justify-center items-center h-screen">
      <Button onClick={() => router.push("/appointment/get-appointment")}>
        Show appointment
      </Button>
      <Button onClick={() => router.push("/appointment/book-appointment")}>
        Book an appointment
      </Button>
    </div>
  )
}

export default page;