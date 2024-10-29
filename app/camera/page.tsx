'use client'

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { foodSafetyCheckPrompt, responseFormat } from './prompt';
import { ArrowLeftIcon, ImageIcon } from '@radix-ui/react-icons';
import { useOnboarding } from '../context/OnboardingContext';

export default function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [showOverlay, setShowOverlay] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFrozen, setIsFrozen] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const { onboardingData } = useOnboarding();

    useEffect(() => {
        const hasSeenWarning = localStorage.getItem('hasSeenCameraWarning');
        if (!hasSeenWarning) {
            setShowOverlay(true);
        }
    }, []);

    const handleOverlayClose = () => {
        localStorage.setItem('hasSeenCameraWarning', 'true');
        setShowOverlay(false);
    };

    useEffect(() => {
        const initCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' },
                    audio: false
                });

                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                setError('Unable to access camera. Please try again.');
                console.error('Error accessing camera:', err);
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                stopCamera();
            }
        };

        const handlePageHide = () => {
            stopCamera();
        };

        const handleBeforeUnload = () => {
            stopCamera();
        };

        const handleBlur = () => {
            stopCamera();
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('pagehide', handlePageHide);
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('blur', handleBlur);

        initCamera();

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('pagehide', handlePageHide);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('blur', handleBlur);

            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        };
    }, []);

    const analyzeImage = async (imageData: string) => {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: imageData,
                prompt: foodSafetyCheckPrompt + JSON.stringify(onboardingData),
                responseFormat: responseFormat
            }),
        });

        return await response.json();
    };

    const capturePhoto = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        setIsFrozen(true);
        setIsLoading(true);

        try {
            const data = await analyzeImage(imageData);

            localStorage.setItem('analysisImage', imageData);
            localStorage.setItem('analysisData', JSON.stringify(data));

            await stopCamera();
            router.push('/analysis');
        } catch (err) {
            console.error('Error analyzing image:', err);
            setError('Failed to analyze image. Please try again.');
            setCapturedImage(null);
            setIsFrozen(false);
        } finally {
            setIsLoading(false);
        }
    };

    const openGallery = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (event) => {
                const imageData = event.target?.result as string;
                setCapturedImage(imageData);
                setIsFrozen(true);
                setIsLoading(true);

                try {
                    const data = await analyzeImage(imageData);
                    localStorage.setItem('analysisImage', imageData);
                    localStorage.setItem('analysisData', JSON.stringify(data));

                    await stopCamera();
                    router.push('/analysis');
                } catch (err) {
                    console.error('Error analyzing image:', err);
                    setError('Failed to analyze image. Please try again.');
                    setCapturedImage(null);
                    setIsFrozen(false);
                } finally {
                    setIsLoading(false);
                }
            };
            reader.readAsDataURL(file);
        };

        input.click();
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    };

    return (
        <div className="bg-black flex flex-col items-center relative h-[100dvh]">
            <canvas ref={canvasRef} className="hidden" />
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
                {capturedImage ? (
                    <img
                        src={capturedImage}
                        alt="Captured"
                        className={`min-h-full min-w-full object-cover ${isFrozen ? 'brightness-50' : ''}`}
                    />
                ) : (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="min-h-full min-w-full object-cover"
                    />
                )}
            </div>
            <div className="absolute top-0 left-0 right-0">
                <div className="w-full flex items-center justify-between p-4 pt-4">
                    <button
                        onClick={() => {
                            stopCamera();
                            router.back();
                        }}
                        className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        aria-label="Go back"
                    >
                        <ArrowLeftIcon className="w-5 h-5 text-white" />
                    </button>
                    <h1 className="text-white text-lg font-medium">
                        Scan Food
                    </h1>
                    <button
                        onClick={openGallery}
                        className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        aria-label="Open gallery"
                    >
                        <ImageIcon className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            {showOverlay && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 max-w-xs w-full">
                        <h2 className="text-center font-semibold mb-2">REMEMBER</h2>
                        <p className="text-center text-sm mb-4">
                            This app may not always be fully accurate. Always double-check ingredients and consult your vet if unsure. Never feed your dog anything not confirmed as safe.
                        </p>
                        <button
                            onClick={handleOverlayClose}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium"
                        >
                            I Understand
                        </button>
                    </div>
                </div>
            )}
            <div className="absolute bottom-8 flex justify-center">
                <button
                    className="w-16 h-16 rounded-full border-4 border-white bg-white/20 hover:bg-white/30 transition-colors"
                    onClick={capturePhoto}
                    aria-label="Capture photo"
                    disabled={isLoading}
                />
            </div>
        </div>
    );
} 