'use client';

import { useOnboarding } from '../../context/OnboardingContext';

export default function FinalSummaryStep() {
    const { onboardingData } = useOnboarding();
    const { dogNames, dogDetails } = onboardingData;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Great! Here's a summary of your dogs</h2>
            <div className="space-y-8">
                {dogNames.map((dogName, index) => {
                    const details = dogDetails[index];
                    if (!details) return null;

                    return (
                        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold mb-4">{dogName}</h3>
                            <div className="space-y-2">
                                <InfoRow label="Breed" value={details.breed} />
                                <InfoRow label="Gender" value={details.gender} />
                                <InfoRow label="Age" value={details.age} />
                                <InfoRow label="Weight" value={details.weight} />

                                {details.healthConditions.length > 0 && (
                                    <div>
                                        <span className="font-medium">Health Conditions: </span>
                                        <span>{details.healthConditions.join(', ')}</span>
                                    </div>
                                )}

                                {details.allergies.length > 0 && (
                                    <div>
                                        <span className="font-medium">Allergies: </span>
                                        <span>{details.allergies.join(', ')}</span>
                                    </div>
                                )}

                                {details.notes && (
                                    <div>
                                        <span className="font-medium">Additional Notes: </span>
                                        <span>{details.notes}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className="text-gray-600 mt-6">
                You can edit these details anytime from your profile settings.
            </p>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    if (!value) return null;
    return (
        <div>
            <span className="font-medium">{label}: </span>
            <span>{value}</span>
        </div>
    );
} 