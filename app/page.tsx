'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { Session } from "next-auth"
import FAQ from './components/FAQ';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from './components/Button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-white">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto">
        <Header isScrolled={isScrolled} session={session} />
        <Content />
        <FAQSection />
      </div>
      <Footer />
    </main>
  );
}

function Header({ isScrolled, session }: { isScrolled: boolean; session: Session | null }) {
  const router = useRouter();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            Sniff
          </h1>
          <nav className="flex space-x-2">
            <Button onClick={() => router.push('/signup?mode=login&redirect=/home')} variant="secondary">
              log in
            </Button>
            <Button onClick={() => router.push('/onboarding?redirect=/home')}>
              sign up
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Content() {
  const router = useRouter();

  return (
    <section className="mt-24 text-center flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Protect your dog from harmful foods</h2>
      <p className="text-base text-gray-600 mb-6 max-w-2xl mx-auto">
        Sniff is your dogs personal food checker.
      </p>
      <Button
        onClick={() => router.push('/onboarding?redirect=/home')}
        className="py-2 px-6 text-base"
        useRegularFont
      >
        Get Started
      </Button>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="w-full mt-12 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">FAQs</h2>
      <FAQ />
    </section>
  );
}

function Footer() {
  const router = useRouter();

  return (
    <footer className="w-full mt-12 mb-8 text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Keep your dog safe with Sniff
        </h2>
        <p className="text-lg text-gray-600 mb-6">Check any food or ingredient in seconds to protect your furry friend.</p>
        <Button
          onClick={() => router.push('/onboarding')}
          className="py-2 px-6 mb-8"
          useRegularFont
        >
          Try Sniff for free
        </Button>
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500 order-2 md:order-1">
            © 2024 Sniff. All rights reserved.
          </p>
          <p className="text-sm order-1 md:order-2">
            <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 hover:underline mr-2">
              privacy
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="/terms-of-service" className="text-blue-600 hover:text-blue-800 hover:underline ml-2">
              t.o.s.
            </Link>
          </p>
          <div className="flex space-x-4 order-3">
            <a href="https://instagram.com/willthesun" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">
              <FaInstagram size={24} />
            </a>
            <a href="https://twitter.com/wilsun007" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.linkedin.com/in/willthesun" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
