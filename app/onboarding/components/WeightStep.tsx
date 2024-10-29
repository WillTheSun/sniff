'use client';

import { useOnboarding } from '../../context/OnboardingContext';

const WEIGHT_RANGES = [
    { label: '0-10 lbs', description: '(Small breed puppies, toy breeds)' },
    { label: '11-20 lbs', description: '(Small breeds)' },
    { label: '21-30 lbs', description: '(Medium/small breeds)' },
    { label: '31-40 lbs', description: '(Medium breeds)' },
    { label: '41-50 lbs', description: '(Medium/large breeds)' },
];

export default function WeightStep() {
    const { currentDogIndex, onboardingData, updateDogDetail, getCurrentDogName } = useOnboarding();
    const dogName = getCurrentDogName();
    const selectedWeight = onboardingData.dogDetails[currentDogIndex]?.weight;

    const handleWeightSelect = (weight: string) => {
        updateDogDetail(currentDogIndex, 'weight', weight);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">How much does {dogName} weigh?</h2>
            <div className="space-y-2">
                {WEIGHT_RANGES.map((range) => (
                    <button
                        key={range.label}
                        onClick={() => handleWeightSelect(range.label)}
                        className={`w-full text-left p-3 rounded-lg border ${selectedWeight === range.label
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-500'
                            } focus:outline-none focus:border-blue-500`}
                    >
                        <div className="font-medium">{range.label}</div>
                        <div className="text-sm text-gray-500">{range.description}</div>
                    </button>
                ))}
            </div>
        </div>
    );
} 