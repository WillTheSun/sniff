import Image from 'next/image';
import { useOnboarding } from '@/app/context/OnboardingContext';

export default function LearnMoreStep() {
    const { onboardingData } = useOnboarding();
    const firstDogName = onboardingData.dogNames?.[0] || 'example dog';

    const headerText = onboardingData.numberOfDogs === 1
        ? `Let's learn a bit more about ${firstDogName}!`
        : "Let's learn a bit more about them!";

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center">
                    <Image
                        src="/sniff_logo.png"
                        alt="Sniff Logo"
                        width={100}
                        height={100}
                    />
                </div>
                <h2 className="text-xl font-medium text-center">
                    {headerText}
                </h2>
            </div>
        </div>
    );
} 