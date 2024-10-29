import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
                <p>Welcome to our privacy policy. This policy describes how we collect, use, and protect your personal information.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
                <p>We do not collect screenshot or dating profile information.</p>
                <p>We collect only information when you create an account, including your name, email address, and other personal information.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
                <p>We use your information to provide, maintain, and improve our services, as well as to communicate with you about our services.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
                <p>You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your data.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">6. Changes to This Policy</h2>
                <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
                <p>If you have any questions about this privacy policy, please contact us at wilsun007@gmail.com.</p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
