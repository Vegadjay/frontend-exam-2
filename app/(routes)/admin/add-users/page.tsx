import { AddUserForm } from '@/components/add-user'
import React from 'react'

const page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-lg space-y-4">
                <div>
                    <h1 className="text-2xl font-semibold">Add clinic user</h1>
                    <p className="text-sm text-gray-600">
                        Create doctors, receptionists, and patients for this clinic.
                    </p>
                </div>
                <AddUserForm />
            </div>
        </div>
    )
}

export default page