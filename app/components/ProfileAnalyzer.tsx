'use client'

import { useState } from 'react';
import ImageUpload from './ImageUpload';
import AnalysisResults from './AnalysisResults';
import { FaSpinner, FaRedo } from 'react-icons/fa';

interface Analysis {
    score: number;
    red_flags: string[];
    green_flags: string[];
}

export default function ProfileAnalyzer() {
    const [stripImage, setStripImage] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleStripGenerated = (strip: string) => {
        setStripImage(strip);
    };

    const handleAnalyze = async () => {
        if (!stripImage) return;

        setIsLoading(true);
        const payload = { image: stripImage };

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const res = await response.json();
                console.log(res);
                setAnalysis(res.result);
            } else {
                console.error('Analysis failed');
            }
        } catch (error) {
            console.error('Error during analysis:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReanalyze = () => {
        setAnalysis(null);
        setStripImage(null);
    };

    return (
        <div className="w-full max-w-3xl flex-grow flex flex-col p-2 sm:p-4">
            {!analysis && !isLoading && (
                <div className="flex-grow flex flex-col items-center justify-center">
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 text-center">
                        No more guessing games & wasting your energy! Find out who they really are now.
                    </p>
                    <ImageUpload onStripGenerated={handleStripGenerated} />
                    <div className="mt-6 sm:mt-8">
                        <button
                            onClick={handleAnalyze}
                            className="bg-[#FFD700] text-black font-medium py-2 px-4 sm:px-6 rounded-lg shadow-md hover:bg-[#E6C200] text-sm sm:text-base transition duration-300 flex items-center"
                            disabled={!stripImage || isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <FaSpinner className="animate-spin mr-1.5 sm:mr-2 text-lg sm:text-xl" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <span className="mr-1.5 sm:mr-2 text-lg sm:text-xl">🔍</span>
                                    find out now
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {analysis && (
                <>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4 sm:mb-6">Analysis Result</h3>
                    <AnalysisResults analysis={analysis} />
                    <div className="mt-6 sm:mt-8 flex justify-center">
                        <button
                            onClick={handleReanalyze}
                            className="bg-[#F8A488] text-black font-medium py-2 px-4 sm:px-6 rounded-lg shadow-md hover:bg-[#E6C200] text-sm sm:text-base transition duration-300 flex items-center"
                            aria-label="Reanalyze"
                        >
                            <FaRedo className="mr-1.5 sm:mr-2" /> Reanalyze
                        </button>
                    </div>
                </>
            )}

            {isLoading && (
                <div className="flex-grow flex flex-col items-center justify-center">
                    <FaSpinner className="animate-spin text-4xl sm:text-5xl text-[#FFD700] mb-3 sm:mb-4" />
                    <p className="text-lg sm:text-xl font-semibold text-gray-700">Analyzing your image...</p>
                </div>
            )}
        </div>
    );
}
