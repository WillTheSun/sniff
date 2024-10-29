'use client';

import { useOnboarding } from '../../context/OnboardingContext';

export default function GenderStep() {
    const { currentDogIndex, onboardingData, updateDogDetail, getCurrentDogName } = useOnboarding();
    const dogName = getCurrentDogName();
    const selectedGender = onboardingData.dogDetails[currentDogIndex]?.gender;

    const handleGenderSelect = (gender: 'male' | 'female') => {
        updateDogDetail(currentDogIndex, 'gender', gender);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">What gender is {dogName}?</h2>
            <div className="space-y-3">
                {(['male', 'female'] as const).map((gender) => (
                    <button
                        key={gender}
                        onClick={() => handleGenderSelect(gender)}
                        className={`w-full text-left p-3 rounded-lg border ${selectedGender === gender
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-500'
                            } focus:outline-none focus:border-blue-500`}
                    >
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
} 