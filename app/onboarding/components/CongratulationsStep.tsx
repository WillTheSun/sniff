'use client';

import { useEffect, useState } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import { useOnboarding } from '../../context/OnboardingContext';

const TASKS = [
    'Customizing dietary plans',
    'Personalizing ingredient insights',
    'Setting meal recipes'
];

export default function CongratulationsStep() {
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showFinal, setShowFinal] = useState(false);

    useEffect(() => {
        TASKS.forEach((task, index) => {
            setTimeout(() => {
                setCompletedTasks(prev => [...prev, task]);
                if (index === TASKS.length - 1) {
                    setTimeout(() => {
                        setIsLoading(false);
                        setShowFinal(true);
                    }, 500);
                }
            }, (index + 1) * 1000);
        });
    }, []);

    if (showFinal) {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 pt-8">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-center">Congratulations!</h2>
                <p className="text-sm text-gray-500 text-center">
                    You&apos;re ready to start checking foods for your dogs.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-6 pt-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                {isLoading ? (
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                    <CheckIcon className="w-8 h-8 text-blue-500" />
                )}
            </div>

            <h2 className="text-xl font-semibold text-center">Creating profiles</h2>
            <p className="text-sm text-gray-500 text-center">This should only take a few seconds</p>

            <div className="space-y-3 w-full max-w-xs">
                {TASKS.map((task) => (
                    <div
                        key={task}
                        className={`flex items-center space-x-3 transition-opacity duration-300 ${completedTasks.includes(task) ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <CheckIcon className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">{task}</span>
                    </div>
                ))}
            </div>
        </div>
    );
} 