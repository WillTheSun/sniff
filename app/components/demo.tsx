import React from 'react';
import AnalysisResults from './AnalysisResults';

const mockAnalysis = {
    score: 3,
    red_flags: [
        "Potential misrepresentation: pictures may be overly curated or edited",
        "Possibly risky behaviors: high focus on nightlife and partying",
        "Superficiality: mentions luxurious items and experiences frequently",
        "Focus on appearance and materialism...",
        "Overly idealized expectations...",
    ],
    green_flags: [
        "Adventurous and well-traveled: pictures from various locations indicate an interest in exploring the world",
    ],
};

export default function Demo() {
    return (
        <div className="w-full max-w-3xl relative mt-8">
            <div className="relative overflow-hidden">
                <AnalysisResults analysis={mockAnalysis} />
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-45deg]">
                        <span className="text-gray-400 text-[120px] sm:text-[150px] font-bold opacity-30">
                            SAMPLE SAMPLE SAMPLE
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
