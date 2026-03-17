import { DatePickerTime } from '@/components/date-time';
import React from 'react'

const page = () => {
    return (
        <div className="flex mt-5 px-4">
            <div className="w-full space-y-4">
                <h1 className="text-2xl font-semibold">Book an appointment</h1>
                <p className="text-sm text-gray-600">
                    Choose a date and time slot for your visit to the clinic.
                </p>
                <DatePickerTime />
            </div>
        </div>
    )
}

export default page