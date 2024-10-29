'use client';

import { useOnboarding } from '../../context/OnboardingContext';

const HEALTH_CONDITIONS = [
    'Allergies/Intolerances',
    'Bladder Stones',
    'Cancer',
    'Colitis',
    'Chronic Kidney Disease',
    'Cushing\'s Disease',
    // Add more conditions as needed
] as const;

export default function HealthConditionsStep() {
    const { currentDogIndex, updateDogDetail, getCurrentDogName, onboardingData } = useOnboarding();
    const dogName = getCurrentDogName();
    const selectedConditions = onboardingData.dogDetails[currentDogIndex]?.healthConditions || [];

    const toggleCondition = (condition: string) => {
        const newConditions = selectedConditions.includes(condition)
            ? selectedConditions.filter(c => c !== condition)
            : [...selectedConditions, condition];

        updateDogDetail(currentDogIndex, 'healthConditions', newConditions);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Does {dogName} have any of these health conditions?</h2>
            <p className="text-gray-600 text-sm">
                The most common ones are listed here. If you need one added, email us!
            </p>
            <div className="space-y-2">
                {HEALTH_CONDITIONS.map((condition) => (
                    <button
                        key={condition}
                        onClick={() => toggleCondition(condition)}
                        className={`w-full text-left p-3 rounded-lg border ${selectedConditions.includes(condition)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-500'
                            } focus:outline-none focus:border-blue-500`}
                    >
                        {condition}
                    </button>
                ))}
            </div>
        </div>
    );
} 