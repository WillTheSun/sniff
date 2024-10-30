'use client';

import { useOnboarding } from '@/app/context/OnboardingContext';
import { useState } from 'react';

const ALLERGY_OPTIONS = [
    'Pollen',
    'Dust Mites',
    'Mold',
    'Fleas',
    'Food Allergies',
    'Grass',
    'Weeds',
    'Trees',
    'Perfumes',
    'Cleaning Products',
    'Smoke',
    'Feathers',
    'Dander',
    'Insect Bites',
    'Medications',
    'Latex',
    'Wool',
    'Fabric Softeners',
    'Shampoos',
    'Rubber'
];

export default function AllergiesStep() {
    const { currentDogIndex, updateDogDetail, getCurrentDogName } = useOnboarding();
    const dogName = getCurrentDogName();
    const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

    const handleAllergyToggle = (allergy: string) => {
        setSelectedAllergies(prev => {
            const newAllergies = prev.includes(allergy)
                ? prev.filter(a => a !== allergy)
                : [...prev, allergy];

            // Update the dog's allergies in context as a comma-separated string
            updateDogDetail(currentDogIndex, 'allergies', newAllergies.join(', '));
            return newAllergies;
        });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Does {dogName} have any of these allergies?</h2>
            <p className="text-gray-600 text-sm">
                Select from common allergies or enter a custom allergy.
            </p>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {ALLERGY_OPTIONS.map((allergy) => (
                    <button
                        key={allergy}
                        onClick={() => handleAllergyToggle(allergy)}
                        className={`w-full text-left p-3 rounded-lg border ${selectedAllergies.includes(allergy)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-500'
                            } focus:outline-none focus:border-blue-500`}
                    >
                        {allergy}
                    </button>
                ))}
            </div>
        </div>
    );
} 