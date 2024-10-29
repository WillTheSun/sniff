'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import Button from '../components/Button';
import { useEffect, useState } from 'react';

export default function Analysis() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [imageData, setImageData] = useState<string | null>(null);

    const analysisData = searchParams.get('data')
        ? JSON.parse(decodeURIComponent(searchParams.get('data')!))
        : null;

    useEffect(() => {
        // Get image from localStorage
        const storedImage = localStorage.getItem('analysisImage');
        if (storedImage) {
            setImageData(storedImage);
            // Clean up
            localStorage.removeItem('analysisImage');
        }
    }, []);

    if (!analysisData) {
        router.push('/');
        return null;
    }

    const isSafe = !analysisData.toLowerCase().includes('not safe');

    return (
        <div className="min-h-screen bg-white p-4">
            <div className="max-w-md mx-auto">
                <h1 className="text-xl font-semibold mb-4">Analysis for Fido</h1>

                {imageData && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                            src={imageData}
                            alt="Analyzed food"
                            className="w-full h-48 object-cover"
                        />
                    </div>
                )}

                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        {!isSafe && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        )}
                        <span className={`font-medium ${!isSafe ? 'text-red-500' : 'text-green-500'}`}>
                            {!isSafe ? 'Not safe' : 'Safe'}
                        </span>
                    </div>
                    <p className="text-gray-600">
                        {analysisData}
                    </p>
                </div>

                <Button
                    onClick={() => router.push('/')}
                    className="w-full"
                >
                    Done
                </Button>
            </div>
        </div>
    );
} 