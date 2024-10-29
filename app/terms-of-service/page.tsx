import React from 'react';

const TermsOfService: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
                <p>By accessing or using vibe check mate, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our service.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">2. Use of Service</h2>
                <p>You agree to use vibe check mate only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else&apos;s use and enjoyment of the service.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
                <p>You are responsible for safeguarding the login methods that you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">4. Content</h2>
                <p>Our service allows you to create, link, and share certain information, text, graphics, or other material. You are responsible for the content that you create or share from the service, including its legality, reliability, and appropriateness.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">5. Termination</h2>
                <p>We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">6. Changes</h2>
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at wilsun007@gmail.com.</p>
            </section>
        </div>
    );
};

export default TermsOfService;
