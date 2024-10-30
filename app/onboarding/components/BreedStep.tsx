'use client';

import { useOnboarding } from '@/app/context/OnboardingContext';
import { useState } from 'react';

const BREED_OPTIONS = [
    'Labrador Retriever',
    'French Bulldog',
    'Golden Retriever',
    'German Shepherd',
    'Poodle',
    'Bulldog',
    'Rottweiler',
    'Beagle',
    'Dachshund',
    'Yorkshire Terrier',
    'Boxer',
    'Chihuahua',
    'Siberian Husky',
    'Shih Tzu',
    'Great Dane',
    'Doberman Pinscher',
    'Miniature Schnauzer',
    'Bernese Mountain Dog',
    'Cavalier King Charles Spaniel',
    'Border Collie',
    'Australian Shepherd',
    'Pembroke Welsh Corgi',
    'Cocker Spaniel',
    'Pomeranian',
    'Belgian Malinois',
    'Newfoundland',
    'Maltese',
    'Shetland Sheepdog',
    'Boston Terrier',
    'Havanese'
];

export default function BreedStep() {
    const { currentDogIndex, updateDogDetail, getCurrentDogName } = useOnboarding();
    const dogName = getCurrentDogName();
    const [customBreed, setCustomBreed] = useState('');
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

    const handleBreedToggle = (breed: string) => {
        setSelectedBreeds(prev => {
            const newBreeds = prev.includes(breed)
                ? prev.filter(b => b !== breed)
                : [...prev, breed];

            // Update the dog's breed in context as a comma-separated string
            updateDogDetail(currentDogIndex, 'breed', newBreeds.join(', '));
            return newBreeds;
        });
    };

    const handleCustomBreedSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (customBreed.trim()) {
            const newBreeds = [...selectedBreeds, customBreed.trim()];
            setSelectedBreeds(newBreeds);
            updateDogDetail(currentDogIndex, 'breed', newBreeds.join(', '));
            setCustomBreed('');
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">What breed is {dogName}?</h2>
            <p className="text-gray-600 text-sm">
                Select from common breeds or enter a custom breed.
            </p>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {BREED_OPTIONS.map((breed) => (
                    <button
                        key={breed}
                        onClick={() => handleBreedToggle(breed)}
                        className={`w-full text-left p-3 rounded-lg border ${selectedBreeds.includes(breed)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-500'
                            } focus:outline-none focus:border-blue-500`}
                    >
                        {breed}
                    </button>
                ))}
            </div>
            <form onSubmit={handleCustomBreedSubmit} className="mt-4">
                <input
                    type="text"
                    value={customBreed}
                    onChange={(e) => setCustomBreed(e.target.value)}
                    placeholder="Enter custom breed"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </form>
        </div>
    );
} 