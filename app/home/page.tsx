'use client'

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Button from '../components/Button'
import { FaUser } from 'react-icons/fa'

export default function Home() {
    const { data: session, status } = useSession()
    const router = useRouter()

    // useEffect(() => {
    //     if (status === 'unauthenticated') {
    //         router.replace('/')
    //     }
    // }, [status, router])

    if (status === 'loading') {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>
    }

    return (
        <main className="flex min-h-screen flex-col bg-white">
            <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">Sniff</h1>
                    <button
                        onClick={() => router.push('/profile')}
                        className="p-2 text-gray-600 hover:text-gray-900"
                        aria-label="Profile"
                    >
                        <FaUser size={24} />
                    </button>
                </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center px-4 mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Check if it&apos;s safe for your dog
                </h2>
                <p className="text-gray-600 mb-8 text-center max-w-md">
                    Take a photo of any food or ingredient to instantly check if it's safe for your furry friend
                </p>
                <Button
                    onClick={() => router.push('/camera')}
                    className="py-3 px-8 text-lg"
                >
                    Scan Now
                </Button>
            </div>
        </main>
    )
} 