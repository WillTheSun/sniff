'use client';

import { OnboardingProvider } from '../context/OnboardingContext';
import { DogCountStep } from './components/DogCountStep';
import { DogNameStep } from './components/DogNameStep';
import { useOnboarding } from '../context/OnboardingContext';
import * as Progress from '@radix-ui/react-progress';
import LearnMoreStep from './components/LearnMoreStep';
import BreedStep from './components/BreedStep';
import GenderStep from './components/GenderStep';
import WeightStep from './components/WeightStep';
import HealthConditionsStep from './components/HealthConditionsStep';
import AllergiesStep from './components/AllergiesStep';
import AgeStep from './components/AgeStep';
import NotesStep from './components/NotesStep';
import FinalSummaryStep from './components/FinalSummaryStep';
import CongratulationsStep from './components/CongratulationsStep';

function OnboardingSteps() {
    const {
        currentStep,
        currentDogIndex,
        totalSteps,
        goToPreviousStep,
        goToNextStep,
        completeOnboarding
    } = useOnboarding();

    const progressPercentage = ((currentStep - 1 + (currentDogIndex * 3)) / totalSteps) * 100;

    return (
        <div className="relative flex flex-col min-h-[80vh] h-full">
            <div className="flex items-center h-10">
                {currentStep > 1 && (
                    <button
                        onClick={goToPreviousStep}
                        className="p-2 text-gray-600 hover:text-gray-900"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                )}
                <Progress.Root
                    className="relative overflow-hidden bg-gray-200 rounded-full w-32 h-1 mx-auto"
                    value={progressPercentage}
                >
                    <Progress.Indicator
                        className="bg-blue-500 w-full h-full transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${100 - progressPercentage}%)` }}
                    />
                </Progress.Root>
            </div>
            <div className="flex-grow pt-4">
                {(() => {
                    switch (currentStep) {
                        case 1:
                            return <CongratulationsStep />;
                            return <DogCountStep />;
                        case 2:
                            return <DogNameStep />;
                        case 3:
                            return <LearnMoreStep />;
                        case 4:
                            return <BreedStep />;
                        case 5:
                            return <GenderStep />;
                        case 6:
                            return <WeightStep />;
                        case 7:
                            return <HealthConditionsStep />;
                        case 8:
                            return <AllergiesStep />;
                        case 9:
                            return <AgeStep />;
                        case 10:
                            return <NotesStep />;
                        case 11:
                            return <CongratulationsStep />;
                        default:
                            return null;
                    }
                })()}
            </div>
            <div className="fixed bottom-4 left-0 right-0 bg-white p-4">
                <div className="max-w-md mx-auto flex gap-3">
                    {currentStep > 1 && (
                        <button
                            onClick={goToPreviousStep}
                            className="flex-1 bg-white text-blue-500 border border-blue-500 rounded-full py-3 px-4 hover:bg-blue-50"
                        >
                            Back
                        </button>
                    )}
                    <button
                        onClick={currentStep === 11 ? completeOnboarding : goToNextStep}
                        className={`flex-1 "bg-blue-500 hover:bg-blue-600" text-white rounded-full py-3 px-4`}
                    >
                        {currentStep === 11 ? 'Start Checking' : 'Continue'}
                    </button>
                </div>
            </div>
            <div className="h-24" />
        </div>
    );
}

export default function OnboardingPage() {
    return (
        <OnboardingProvider>
            <div className="min-h-screen bg-white">
                <div className="max-w-md mx-auto pt-8 px-4">
                    <OnboardingSteps />
                </div>
            </div>
        </OnboardingProvider>
    );
} 