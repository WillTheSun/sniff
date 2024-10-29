import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
                <p className="mb-4">We collect information that you provide directly to us:</p>
                <ul className="list-disc pl-8 mb-4">
                    <li>Account information (email, password)</li>
                    <li>Pet information (breed, age, name)</li>
                    <li>Food search history</li>
                    <li>Usage data and preferences</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
                <p className="mb-4">We use the collected information to:</p>
                <ul className="list-disc pl-8 mb-4">
                    <li>Provide and improve our food safety checking service</li>
                    <li>Personalize your experience</li>
                    <li>Send important updates about our service</li>
                    <li>Analyze usage patterns to improve our database</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">3. Data Storage</h2>
                <p>Your search history and pet information are stored securely in our database. We implement appropriate security measures to protect your personal information.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">4. Information Sharing</h2>
                <p>We do not sell or share your personal information with third parties. We may share anonymous, aggregated data for research or analytical purposes.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-8 mb-4">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Export your data</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">6. Cookies</h2>
                <p>We use cookies to improve your experience and analyze service usage. You can control cookie settings through your browser.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
                <p>For privacy-related questions or concerns, please contact us at privacy@sniffapp.com</p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
