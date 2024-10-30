'use client'

import { useState, useEffect, Suspense } from 'react'
import Button from '../components/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import Modal from '../components/Modal'

// Create a wrapper component for the search params logic
function AuthPageContent() {
    const searchParams = useSearchParams()
    const [isLogin, setIsLogin] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    useEffect(() => {
        setIsLogin(searchParams.get('mode') === 'login')
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    mode: isLogin ? 'login' : 'signup'
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Authentication failed')
            }

            if (data.user) {
                if (!isLogin) {
                    setShowConfirmModal(true)
                } else {
                    router.push('/home')
                }
            }
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isLogin ? 'Welcome back' : 'Create your account'}
                    </h1>
                    <p className="mt-2 text-gray-600">
                        {isLogin ? 'Log in to continue' : 'Start protecting your dog today'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        {isLogin ? 'Log in' : 'Create account'}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-gray-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </span>
                    <button
                        onClick={() => router.push(`/signup?mode=${isLogin ? 'signup' : 'login'}`)}
                        className="text-blue-600 hover:text-blue-500"
                    >
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                </div>
            </div>

            {showConfirmModal && (
                <Modal
                    isOpen={showConfirmModal}
                    onClose={() => {
                        setShowConfirmModal(false)
                        router.push('/home')
                    }}
                >
                    <div className="p-6 text-center">
                        <h3 className="mb-4 text-lg font-semibold">Check your email!</h3>
                        <p className="mb-6 text-gray-600">
                            We&apos;ve sent a confirmation email to {email}. Please check your inbox and
                            click the link to verify your account. Until you verify your account, you will
                            not be able to log in again.
                        </p>
                        <Button
                            onClick={() => {
                                setShowConfirmModal(false)
                                router.push('/home')
                            }}
                            className="w-full"
                        >
                            Got it
                        </Button>
                    </div>
                </Modal>
            )}
        </main>
    )
}

// Main component with Suspense boundary
export default function AuthPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthPageContent />
        </Suspense>
    )
} 