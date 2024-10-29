'use client';

import { useOnboarding } from '../../context/OnboardingContext';
import Image from 'next/image';

export function WelcomeStep() {
    const { onboardingData } = useOnboarding();
    const { numberOfDogs, dogNames } = onboardingData;

    const displayText = numberOfDogs === 1 && dogNames?.[0]
        ? `Let's learn a bit more about ${dogNames[0]}!`
        : "Let's learn a bit more about them!";

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <Image
                    src="/sniff_logo.png"
                    alt="Sniff Logo"
                    width={40}
                    height={40}
                    className="text-white"
                />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 text-center">
                {displayText}
            </h1>
        </div>
    );
} 