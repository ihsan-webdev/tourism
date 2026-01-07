'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, Sun, Moon } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Destinations', href: '/destinations' },
  { name: 'Experiences', href: '/experiences' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { settings, darkMode, toggleDarkMode } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-dark-bg text-white py-2">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${settings.contact.phone}`} className="flex items-center gap-2 hover:text-primary-gold transition-colors">
              <Phone size={14} />
              {settings.contact.phone}
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} />
              {settings.contact.address}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-1 hover:text-primary-gold transition-colors"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href={settings.social.instagram} className="hover:text-primary-gold transition-colors">Instagram</a>
            <a href={settings.social.facebook} className="hover:text-primary-gold transition-colors">Facebook</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'top-0 bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'top-0 md:top-10 bg-transparent py-5'
          }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-xl font-bold text-dark-bg">NT</span>
            </div>
            <div className={`hidden sm:block ${isScrolled ? 'text-dark-bg' : 'text-white'}`}>
              <h1 className="text-xl font-playfair font-bold">{settings.siteName}</h1>
              <p className="text-xs opacity-80">{settings.tagline}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-medium transition-colors hover:text-primary-gold group ${isScrolled ? 'text-dark-bg' : 'text-white'
                  }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/admin"
              className={`text-sm font-medium transition-colors ${isScrolled ? 'text-dark-bg hover:text-primary-gold' : 'text-white hover:text-primary-gold'
                }`}
            >
              Admin
            </Link>
            <button className="btn-primary">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 ${isScrolled ? 'text-dark-bg' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-dark-bg pt-24 lg:hidden"
          >
            <nav className="container-custom flex flex-col gap-6 py-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-playfair text-white hover:text-primary-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-6 border-t border-dark-border"
              >
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg text-white hover:text-primary-gold transition-colors"
                >
                  Admin Panel
                </Link>
              </motion.div>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.1 }}
                className="btn-primary mt-4 self-start"
              >
                Book Now
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
