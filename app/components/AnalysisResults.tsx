import React from 'react';
import { FaTrafficLight } from 'react-icons/fa';

interface Analysis {
    safe: string;
    explanation: string;
    score: number;
    red_flags: string[];
    green_flags: string[];
}

const getScoreLabel = (score: number) => {
    if (score <= 1) return { label: 'Safe', color: 'text-green-600' };
    if (score <= 2) return { label: 'Low Risk', color: 'text-green-500' };
    if (score <= 3) return { label: 'Be Cautious', color: 'text-yellow-500' };
    if (score <= 4) return { label: 'High Alert', color: 'text-orange-500' };
    return { label: 'Danger', color: 'text-red-600' };
};

const getTrafficLightColors = (score: number) => {
    const colors = Array(5).fill({ color: 'gray', opacity: 0.3 });
    const activeColor = score <= 2 ? 'green' : score <= 4 ? 'yellow' : 'red';
    for (let i = 0; i < score; i++) {
        colors[i] = { color: activeColor, opacity: 1 };
    }
    return colors;
};

export default function AnalysisResults({ analysis }: { analysis: Analysis }) {
    return (
        <div className="w-full mb-4">
            {/* Add the safe/unsafe message at the top */}
            <div className="mb-4 text-lg font-medium text-center">
                {analysis.safe}
            </div>

            <div className="mb-4 text-gray-700 text-center">
                {analysis.explanation}
            </div>

            {/* Red Flag Score Display */}
            <div className="flex items-center justify-between mb-4 sm:mb-6 bg-gray-100 p-3 sm:p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                        {getTrafficLightColors(analysis.score).map(({ color, opacity }, index) => (
                            <div key={index} className="relative">
                                <FaTrafficLight className="text-xl sm:text-2xl text-gray-400" style={{ opacity }} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div
                                        style={{
                                            width: '0.3rem',
                                            height: '0.3rem',
                                            borderRadius: '9999px',
                                            backgroundColor: color,
                                            opacity
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <span className="text-base sm:text-lg font-bold text-gray-800">{analysis.score}/5</span>
                </div>
                <span className={`text-base sm:text-lg font-bold ${getScoreLabel(analysis.score).color}`}>
                    {getScoreLabel(analysis.score).label}
                </span>
            </div>

            {/* Red Flags */}
            <div className="mt-4 sm:mt-6 bg-[#F8A488] bg-opacity-10 p-4 sm:p-5 rounded-lg shadow-md">
                <h4 className="text-xl sm:text-2xl font-bold text-[#D0021B] mb-3 sm:mb-4">Red Flags</h4>
                <ul className="list-none pl-0 space-y-1 sm:space-y-2">
                    {analysis.red_flags.slice(0, 3).map((flag, index) => (
                        <li key={index} className="flex items-start text-[#D0021B] text-sm sm:text-base">
                            <span className="mr-2 text-base sm:text-lg flex-shrink-0 mt-0.5">🚩</span>
                            <span className="mt-0.5">{flag}</span>
                        </li>
                    ))}
                </ul>
                {analysis.red_flags.length > 3 && (
                    <p className="text-xs sm:text-sm text-[#D0021B] mt-2 italic">
                        {analysis.red_flags.length - 3} more red flag{analysis.red_flags.length - 3 > 1 ? 's' : ''} hidden
                    </p>
                )}
            </div>

            {/* Green Flags */}
            <div className="mt-4 sm:mt-6 bg-[#f6f9f6] p-4 sm:p-5 rounded-lg shadow-md">
                <h4 className="text-xl sm:text-2xl font-bold text-[#2ECC40] mb-3 sm:mb-4">Green Flags</h4>
                <ul className="list-none pl-0 space-y-1 sm:space-y-2">
                    {analysis.green_flags.map((flag, index) => (
                        <li key={index} className="flex items-start text-[#2ECC40] text-sm sm:text-base">
                            <span className="mr-2 text-base sm:text-lg flex-shrink-0 mt-1">✅</span>
                            <span className="mt-0.5">{flag}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
