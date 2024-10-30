'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// interface AnalysisResponse {
//     safe: string;
//     explanation: string;
// }

export default function Analysis() {
    const router = useRouter();
    const [imageData, setImageData] = useState<string | null>(null);
    const [analysisData, setAnalysisData] = useState<any | null>(null);

    useEffect(() => {
        // Get image and analysis data from localStorage
        setImageData(localStorage.getItem('analysisImage'));
        const data = localStorage.getItem('analysisData');
        if (data) {
            setAnalysisData(JSON.parse(data));
        }
    }, []);

    if (!analysisData) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header with back button */}
            <div className="p-4 flex items-center border-b border-gray-200 relative">
                <button onClick={() => router.back()} className="text-gray-600 absolute left-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-lg font-medium flex-1 text-center">Analysis Results</h1>
            </div>

            {/* Main content */}
            <div className="flex-1 p-4">
                {imageData && (
                    <div className="mb-4">
                        <img
                            src={imageData}
                            alt="Analyzed food"
                            className="w-full object-cover rounded-lg"
                        />
                    </div>
                )}

                {/* Result card */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className={`flex items-center gap-2 mb-2`}>
                        <span className="font-medium">{analysisData.safe}</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                        {analysisData.explanation}
                    </p>
                </div>
            </div>

            {/* Fixed bottom button */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={() => router.push('/home')}
                    className="w-full bg-blue-500 text-white py-3 rounded-full"
                >
                    Done
                </button>
            </div>
        </div>
    );
} 