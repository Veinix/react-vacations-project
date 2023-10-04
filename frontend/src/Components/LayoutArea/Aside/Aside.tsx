import React from 'react'

function Aside() {
    return (
        <div className="bg-gray-50 rounded-xl border mb-3 w-full">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-xl font-extrabold tracking-tight text-center text-indigo-600 ">
                    {(process.env.NODE_ENV).toUpperCase()}
                </h2>
            </div>
        </div>
    )
}

export default Aside