'use client'

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import { foodSafetyCheckPrompt } from './prompt';
export default function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [showOverlay, setShowOverlay] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoading, setIsLoading] = useState(false);

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
        startCamera();
        return () => {
            if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
                audio: false
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            setError('Unable to access camera. Please try again.');
            console.error('Error accessing camera:', err);
        }
    };

    const capturePhoto = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        setIsLoading(true);
        const video = videoRef.current;
        const canvas = canvasRef.current;

        // Set canvas size to match video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the video frame to canvas
        const context = canvas.getContext('2d');
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert to base64
        const imageData = canvas.toDataURL('image/jpeg');

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imageData, prompt: foodSafetyCheckPrompt }),
            });

            const data = await response.json();
            console.log(data);

            // Store the image data in localStorage temporarily
            localStorage.setItem('analysisImage', imageData);
            router.push(`/analysis?data=${encodeURIComponent(JSON.stringify(data.result))}`);
        } catch (err) {
            console.error('Error analyzing image:', err);
            setError('Failed to analyze image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-black flex flex-col items-center">
            <canvas ref={canvasRef} className="hidden" />
            {error ? (
                <div className="text-white text-center">
                    <p className="mb-4">{error}</p>
                    <Button onClick={() => router.back()} variant="secondary">
                        Go Back
                    </Button>
                </div>
            ) : (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="h-[100dvh] w-auto"
                    />
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
                    <div className="absolute bottom-8 flex gap-4">
                        <Button onClick={() => router.back()} variant="secondary">
                            Cancel
                        </Button>
                        <button
                            className="w-16 h-16 rounded-full border-4 border-white bg-white/20 hover:bg-white/30 transition-colors relative"
                            onClick={capturePhoto}
                            aria-label="Capture photo"
                            disabled={isLoading}
                        >
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
} 