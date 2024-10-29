'use client';

import { useOnboarding } from '@/app/context/OnboardingContext';

const BREED_OPTIONS = [
    'Affenpinscher',
    'Afghan Hound',
    'Airedale Terrier',
    'Akita',
    'Alaskan Malamute',
    'American Bulldog',
];

export default function BreedStep() {
    const { currentDogIndex, updateDogDetail, getCurrentDogName } = useOnboarding();
    const dogName = getCurrentDogName();

    const handleBreedChange = (breed: string) => {
        updateDogDetail(currentDogIndex, 'breed', breed);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">What breed is {dogName}?</h2>
            <p className="text-gray-600 text-sm">
                If this breed can&apos;t be found on breed, select multiple options.
            </p>
            <div className="space-y-2">
                {BREED_OPTIONS.map((breed) => (
                    <button
                        key={breed}
                        onClick={() => handleBreedChange(breed)}
                        className={`w-full text-left p-3 rounded-lg border ${dogName === breed
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-500'
                            } focus:outline-none focus:border-blue-500`}
                    >
                        {breed}
                    </button>
                ))}
            </div>
        </div>
    );
} 