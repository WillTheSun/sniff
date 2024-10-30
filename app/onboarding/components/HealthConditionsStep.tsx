'use client';

import { useOnboarding } from '@/app/context/OnboardingContext';
import { useState } from 'react';

const HEALTH_CONDITIONS = [
    'Arthritis',
    'Diabetes',
    'Heart Disease',
    'Allergies',
    'Epilepsy',
    'Cancer',
    'Obesity',
    'Kidney Disease',
    'Dental Disease',
    'Hypothyroidism',
    'Cushing’s Disease',
    'Addison’s Disease',
    'Liver Disease',
    'Pancreatitis',
    'Bloat',
    'Parvovirus',
    'Distemper',
    'Lyme Disease',
    'Rabies',
    'Kennel Cough',
    'Fleas',
    'Ticks',
    'Worms',
    'Ear Infections',
    'Urinary Tract Infections',
    'Skin Infections',
    'Eye Infections',
    'Respiratory Infections',
    'Gastrointestinal Issues'
];

export default function HealthConditionsStep() {
    const { currentDogIndex, updateDogDetail, getCurrentDogName } = useOnboarding();
    const dogName = getCurrentDogName();
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

    const handleConditionToggle = (condition: string) => {
        setSelectedConditions(prev => {
            const newConditions = prev.includes(condition)
                ? prev.filter(c => c !== condition)
                : [...prev, condition];

            // Update the dog's health conditions in context as a comma-separated string
            updateDogDetail(currentDogIndex, 'healthConditions', newConditions.join(', '));
            return newConditions;
        });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Does {dogName} have any of these health conditions?</h2>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {HEALTH_CONDITIONS.map((condition) => (
                    <button
                        key={condition}
                        onClick={() => handleConditionToggle(condition)}
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