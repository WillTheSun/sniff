'use client';

import { useOnboarding } from '../../context/OnboardingContext';

type DogOption = {
    value: number;
    label: string;
};

const DOG_OPTIONS: DogOption[] = [
    { value: 1, label: 'Just one' },
    { value: 2, label: 'I have 2 dogs' },
    { value: 3, label: 'I have 3 dogs' },
    { value: 4, label: 'I have 4 dogs' },
    { value: 5, label: 'I have 5 dogs' },
];

export function DogCountStep() {
    const { onboardingData, updateOnboardingData } = useOnboarding();

    const handleSelect = (dogCount: number) => {
        updateOnboardingData({ numberOfDogs: dogCount });
    };

    return (
        <div className="flex flex-col space-y-4">
            <h1 className="text-xl font-semibold text-gray-900">
                How many dogs do you have?
            </h1>
            <p className="text-sm text-gray-500">
                Sniff supports up to 5 dogs.
            </p>
            <div className="flex flex-col space-y-2">
                {DOG_OPTIONS.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={`p-4 text-left border rounded-lg ${onboardingData.numberOfDogs === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
} 