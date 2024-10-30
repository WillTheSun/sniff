'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type OnboardingData = {
    numberOfDogs: number;
    dogNames: string[];
    dogDetails: {
        [dogIndex: number]: {
            breed: string;
            gender: 'male' | 'female';
            weight: string;
            healthConditions: string[];
            allergies: string[];
            age: string;
            notes: string;
        }
    };
};

interface OnboardingContextType {
    currentStep: number;
    currentDogIndex: number;
    onboardingData: OnboardingData;
    updateOnboardingData: (data: Partial<OnboardingData>) => void;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
    totalSteps: number;
    getCurrentDogName: () => string;
    updateDogDetail: (dogIndex: number, field: keyof OnboardingData['dogDetails'][number], value: string | string[] | null) => void;
    resetOnboardingState: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [currentDogIndex, setCurrentDogIndex] = useState(0);
    const [onboardingData, setOnboardingData] = useState<OnboardingData>(() => {
        // Load initial data from localStorage if available
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('dogData');
            return saved ? JSON.parse(saved) : {
                numberOfDogs: 0,
                dogNames: [],
                dogDetails: {},
            };
        }
        return {
            numberOfDogs: 0,
            dogNames: [],
            dogDetails: {},
        };
    });

    // Save dog data whenever it changes
    useEffect(() => {
        localStorage.setItem('dogData', JSON.stringify(onboardingData));
    }, [onboardingData]);

    const getCurrentDogName = () => {
        return onboardingData.dogNames[currentDogIndex] || '';
    };

    const updateOnboardingData = (data: Partial<OnboardingData>) => {
        setOnboardingData(prev => ({ ...prev, ...data }));
    };

    const goToNextStep = () => {
        if (currentStep <= 3) {
            setCurrentStep(prev => prev + 1);
        } else {
            if (currentStep === 10) {
                if (currentDogIndex < onboardingData.numberOfDogs - 1) {
                    setCurrentDogIndex(prev => prev + 1);
                    setCurrentStep(4);
                } else {
                    // Go to final summary step
                    setCurrentStep(11);
                }
            } else {
                setCurrentStep(prev => prev + 1);
            }
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            if (currentStep === 11) {
                // Going back from final step to last dog's last step
                setCurrentStep(10);
            } else if (currentStep === 4 && currentDogIndex > 0) {
                setCurrentDogIndex(prev => prev - 1);
                setCurrentStep(10);
            } else {
                setCurrentStep(prev => prev - 1);
            }
        }
    };

    const updateDogDetail = (dogIndex: number, field: keyof OnboardingData['dogDetails'][number], value: string | string[] | null) => {
        setOnboardingData(prev => ({
            ...prev,
            dogDetails: {
                ...prev.dogDetails,
                [dogIndex]: {
                    ...prev.dogDetails[dogIndex],
                    [field]: value
                }
            }
        }));
    };

    const resetOnboardingState = () => {
        setCurrentStep(1);
        setCurrentDogIndex(0);
    };

    return (
        <OnboardingContext.Provider
            value={{
                currentStep,
                currentDogIndex,
                onboardingData,
                updateOnboardingData,
                goToNextStep,
                goToPreviousStep,
                totalSteps: 3 + (onboardingData.numberOfDogs * 7) + 1,
                getCurrentDogName,
                updateDogDetail,
                resetOnboardingState,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
}

export function useOnboarding() {
    const context = useContext(OnboardingContext);
    if (context === undefined) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
} 