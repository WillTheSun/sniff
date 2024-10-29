import React from 'react';

const TermsOfService: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
                <p>By accessing or using Sniff, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our service.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">2. Use of Service</h2>
                <p>Sniff is designed to provide information about food safety for dogs. While we strive for accuracy, the service should not replace professional veterinary advice. In case of emergencies or health concerns, always consult your veterinarian.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">3. Information Accuracy</h2>
                <p>While we make every effort to ensure the accuracy of our food safety information, we cannot guarantee that all information is complete or current. The service is provided "as is" without any warranties, and you agree to use it at your own risk.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">4. User Accounts</h2>
                <p>You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">5. Medical Disclaimer</h2>
                <p>Sniff is not a substitute for professional veterinary care. In case of emergency or if you suspect your dog has consumed something harmful, contact your veterinarian immediately. Do not delay seeking professional medical advice based on information from our service.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">6. Changes to Service</h2>
                <p>We reserve the right to modify, suspend, or discontinue any part of the service at any time. We may also update these terms as needed, and continued use of Sniff after such changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at support@sniffapp.com.</p>
            </section>
        </div>
    );
};

export default TermsOfService;
