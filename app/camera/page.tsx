'use client'

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';

export default function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [showOverlay, setShowOverlay] = useState(false);

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

    return (
        <div className="bg-black flex flex-col items-center">
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
                            className="w-16 h-16 rounded-full border-4 border-white bg-white/20 hover:bg-white/30 transition-colors"
                            onClick={() => { }}
                            aria-label="Capture photo"
                        />
                    </div>
                </>
            )}
        </div>
    );
} 