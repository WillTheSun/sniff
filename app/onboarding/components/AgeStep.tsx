'use client';

import { useOnboarding } from '../../context/OnboardingContext';

const AGE_OPTIONS = [
    '0-6 months',
    '6 months - 1 year',
    '1 year old',
    '2 years old',
    '3 years old',
    '4 years old',
    '5 years old'
];

export default function AgeStep() {
    const { currentDogIndex, onboardingData, updateDogDetail, getCurrentDogName } = useOnboarding();
    const dogName = getCurrentDogName();
    const selectedAge = onboardingData.dogDetails[currentDogIndex]?.age;

    const handleAgeSelect = (age: string) => {
        updateDogDetail(currentDogIndex, 'age', age);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">How old is {dogName}?</h2>
            <p className="text-gray-600 text-sm">
                This helps us keep their details accurate as they age.
            </p>
            <div className="space-y-2">
                {AGE_OPTIONS.map((age) => (
                    <button
                        key={age}
                        onClick={() => handleAgeSelect(age)}
                        className={`w-full text-left p-3 rounded-lg border ${selectedAge === age
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-500'
                            } focus:outline-none focus:border-blue-500`}
                    >
                        {age}
                    </button>
                ))}
            </div>
        </div>
    );
} 