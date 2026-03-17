"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { baseUrl } from "@/lib/url"
import { routerPush } from "@/lib/router-push"


export function DatePickerTime() {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [authToken, setAuthToken] = React.useState("");
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const authToken = localStorage.getItem("token");
        setAuthToken(authToken || "");
    }, [])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const toTime = formData.get("to-time") as string;
        const fromTime = formData.get("from-time") as string;

        if (!date || !toTime || !fromTime) {
            setError("Please select date and time.");
            return;
        }
        if (!authToken) {
            setError("You are not logged in.");
            return;
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        const finalDate = `${year}-${month}-${day}`;
        const finalTime = fromTime + "-" + toTime;

        setLoading(true);
        const response = await fetch(`${baseUrl}/appointments`, {
            method: "POST",
            body: JSON.stringify({ appointmentDate: finalDate, timeSlot: finalTime }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        });

        const data = await response.json();
        setLoading(false);

        console.log(data);

        if (!(data.error)) {
            routerPush('/');
        } else {
            setError(data.error || "Could not book appointment.");
        }
    }

    return (
        <FieldGroup className="mx-auto max-w-xs flex-row">
            <form onSubmit={handleSubmit}>
                <Field>
                    <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="date-picker-optional"
                                className="w-32 justify-between font-normal"
                            >
                                {date ? format(date, "PPP") : "Select date"}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                captionLayout="dropdown"
                                defaultMonth={date}
                                onSelect={(date) => {
                                    setDate(date)
                                    setOpen(false)
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </Field>
                <Field className="w-32">
                    <FieldLabel htmlFor="time-picker-optional">From Time</FieldLabel>
                    <Input
                        type="time"
                        id="from-time-picker-optional"
                        defaultValue="10:30"
                        className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        name="from-time"
                    />
                </Field>
                <Field className="w-32">
                    <FieldLabel htmlFor="time-picker-optional">To Time</FieldLabel>
                    <Input
                        type="time"
                        id="to-time-picker-optional"
                        defaultValue="10:30"
                        className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        name="to-time"
                    />
                </Field>
                <Field>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Booking..." : "Book appointment"}
                    </Button>
                    {error && (
                        <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}
                </Field>
            </form>
        </FieldGroup>
    )
}
