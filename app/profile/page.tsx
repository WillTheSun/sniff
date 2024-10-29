'use client'

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import { FaArrowLeft, FaSignOutAlt } from 'react-icons/fa'
import type { OnboardingData } from '../context/OnboardingContext'

export default function Profile() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [dogData, setDogData] = useState<OnboardingData | null>(null)

    useEffect(() => {
        const savedData = localStorage.getItem('dogData')
        if (savedData) {
            setDogData(JSON.parse(savedData))
        }
    }, [])

    const handlePasswordReset = async () => {
        try {
            if (!session?.user?.email) return;

            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mode: 'requestReset',
                    email: session.user.email
                }),
            });

            if (response.ok) {
                alert('Check your email for the password reset link');
            } else {
                throw new Error('Failed to send reset email');
            }
        } catch (error) {
            console.error('Password reset failed:', error);
            alert('Failed to initiate password reset');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mode: 'logout' }),
            });
            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (status === 'loading') {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>
    }

    return (
        <main className="flex min-h-screen flex-col bg-white">
            <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => router.push('/home')}
                            className="mr-4 text-gray-600 hover:text-gray-900"
                            aria-label="Go back"
                        >
                            <FaArrowLeft size={20} />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">Profile</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 border rounded-md"
                        aria-label="Logout"
                    >
                        <FaSignOutAlt size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </header>

            <div className="flex-1 max-w-2xl mx-auto w-full px-4 pt-20 pb-8">
                {/* Account Section */}
                <section className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold mb-4">Account</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <p className="text-gray-900">{session?.user?.email}</p>
                        </div>
                        <Button
                            onClick={handlePasswordReset}
                            variant="secondary"
                            className="w-full"
                        >
                            Reset Password
                        </Button>
                    </div>
                </section>

                {/* Dog Profiles Section */}
                <section className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold mb-4">Dog Profiles</h2>

                    {dogData?.dogNames.map((dogName, index) => {
                        const details = dogData.dogDetails[index];
                        if (!details) return null;

                        return (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4 last:mb-0">
                                <h3 className="text-lg font-semibold mb-2">{dogName}</h3>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="font-medium">Breed: </span>
                                        <span>{details.breed}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Gender: </span>
                                        <span>{details.gender}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Age: </span>
                                        <span>{details.age}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Weight: </span>
                                        <span>{details.weight}</span>
                                    </div>
                                    {details.healthConditions.length > 0 && (
                                        <div>
                                            <span className="font-medium">Health Conditions: </span>
                                            <span>{details.healthConditions.join(', ')}</span>
                                        </div>
                                    )}
                                    {details.allergies.length > 0 && (
                                        <div>
                                            <span className="font-medium">Allergies: </span>
                                            <span>{details.allergies.join(', ')}</span>
                                        </div>
                                    )}
                                    {details.notes && (
                                        <div>
                                            <span className="font-medium">Additional Notes: </span>
                                            <span>{details.notes}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {(!dogData || dogData.dogNames.length === 0) && (
                        <p className="text-gray-500 text-center">No dog profiles found.</p>
                    )}
                </section>
            </div>
        </main>
    )
} 