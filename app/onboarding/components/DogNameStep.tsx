'use client';

import { useOnboarding } from '../../context/OnboardingContext';
import { useState, useEffect } from 'react';

type DogNames = { [key: number]: string };

export function DogNameStep() {
    const { onboardingData, updateOnboardingData } = useOnboarding();
    const [names, setNames] = useState<DogNames>({});
    const numberOfDogs = onboardingData.numberOfDogs || 0;

    useEffect(() => {
        const initialNames: DogNames = {};
        for (let i = 0; i < numberOfDogs; i++) {
            initialNames[i] = '';
        }
        setNames(initialNames);
    }, [numberOfDogs]);

    const handleChange = (index: number, value: string) => {
        const newNames = { ...names, [index]: value };
        setNames(newNames);
        updateOnboardingData({ dogNames: Object.values(newNames) });
    };

    const title = numberOfDogs === 1
        ? "What is your dog's name?"
        : "What are their names?";

    return (
        <div className="flex flex-col space-y-4">
            <h1 className="text-xl font-semibold text-gray-900">
                {title}
            </h1>
            <p className="text-sm text-gray-500">
                So we know how to refer to them!
            </p>
            <div className="flex flex-col space-y-3">
                {Array.from({ length: numberOfDogs }).map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`ex. ${['Luna', 'Max', 'Bella', 'Charlie'][index] || 'Luna'}`}
                        value={names[index] || ''}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))}
            </div>
        </div>
    );
} 