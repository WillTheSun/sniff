'use client';

import { useOnboarding } from '../../context/OnboardingContext';

export default function NotesStep() {
    const { currentDogIndex, onboardingData, updateDogDetail, getCurrentDogName } = useOnboarding();
    const dogName = getCurrentDogName();
    const notes = onboardingData.dogDetails[currentDogIndex]?.notes || '';

    const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateDogDetail(currentDogIndex, 'notes', event.target.value);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Any other notes about {dogName}?</h2>
            <p className="text-gray-600 text-sm">
                Diabetes? Allergies? Other health conditions?
            </p>
            <textarea
                value={notes}
                onChange={handleNotesChange}
                placeholder="Type text here..."
                className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
        </div>
    );
} 