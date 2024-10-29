'use client';

import { useOnboarding } from '../../context/OnboardingContext';

const ALLERGENS = [
    'Beef',
    'Chicken',
    'Corn',
    'Dairy',
    'Eggs',
    'Fish',
    // Add more allergens as needed
];

export default function AllergiesStep() {
    const { currentDogIndex, onboardingData, updateDogDetail, getCurrentDogName } = useOnboarding();
    const dogName = getCurrentDogName();
    const selectedAllergies = onboardingData.dogDetails[currentDogIndex]?.allergies || [];

    const toggleAllergy = (allergen: string) => {
        const newAllergies = selectedAllergies.includes(allergen)
            ? selectedAllergies.filter(a => a !== allergen)
            : [...selectedAllergies, allergen];

        updateDogDetail(currentDogIndex, 'allergies', newAllergies);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">What is {dogName} allergic/intolerant to?</h2>
            <p className="text-gray-600 text-sm">
                We discuss health ingredients later in depth. What else are they allergic/intolerant to?
            </p>
            <div className="space-y-2">
                {ALLERGENS.map((allergen) => (
                    <button
                        key={allergen}
                        onClick={() => toggleAllergy(allergen)}
                        className={`w-full text-left p-3 rounded-lg border ${selectedAllergies.includes(allergen)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-500'
                            } focus:outline-none focus:border-blue-500`}
                    >
                        {allergen}
                    </button>
                ))}
            </div>
        </div>
    );
} 