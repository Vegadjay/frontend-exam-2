import { DatePickerTime } from "@/components/date-time"
import { Container } from "@/components/container"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import React from "react"

const page = () => {
  return (
    <Container>
      <div className="flex flex-col gap-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Queue for a day</h1>
          <p className="text-sm text-muted-foreground">
            Pick a date to view and manage the queue for that day.
          </p>
        </div>

        <Card className="md:sticky md:top-6">
          <CardHeader className="gap-2">
            <CardTitle>Choose date</CardTitle>
            <CardDescription>Loads the queue for the selected day.</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <DatePickerTime />
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}

export default page