'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, ArrowUp, Heart } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function Footer() {
  const { settings } = useAppStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    destinations: [
      { name: 'Raja Ampat', href: '/destinations/raja-ampat' },
      { name: 'Bali', href: '/destinations/bali' },
      { name: 'Komodo Island', href: '/destinations/komodo-island' },
      { name: 'Borobudur', href: '/destinations/borobudur' },
      { name: 'Bromo', href: '/destinations/bromo' },
    ],
    experiences: [
      { name: 'Diving Adventure', href: '/experiences/diving-adventure' },
      { name: 'Cultural Tours', href: '/experiences/cultural-heritage-tour' },
      { name: 'Volcano Trekking', href: '/experiences/volcano-trekking' },
      { name: 'Island Hopping', href: '/experiences/island-hopping' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: settings.social.instagram, label: 'Instagram' },
    { icon: Facebook, href: settings.social.facebook, label: 'Facebook' },
    { icon: Twitter, href: settings.social.twitter, label: 'Twitter' },
    { icon: Youtube, href: settings.social.youtube, label: 'Youtube' },
  ];

  return (
    <footer className="bg-dark-bg text-white">
      {/* Newsletter Section */}
      <div className="border-b border-dark-border">
        <div className="container-custom py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
                Subscribe to Our <span className="text-primary-gold italic">Newsletter</span>
              </h3>
              <p className="text-white/60">
                Get the latest travel tips, destination guides, and exclusive offers.
              </p>
            </div>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-dark-surface border border-dark-border text-white placeholder:text-white/40 focus:outline-none focus:border-primary-gold transition-colors"
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-xl font-bold text-dark-bg">NT</span>
              </div>
              <div>
                <h4 className="text-xl font-playfair font-bold">{settings.siteName}</h4>
                <p className="text-sm text-white/60">{settings.tagline}</p>
              </div>
            </Link>
            <p className="text-white/60 mb-6 max-w-xs">
              {settings.description}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-surface flex items-center justify-center hover:bg-primary-gold hover:text-dark-bg transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h5 className="font-bold mb-4 text-primary-gold uppercase text-sm tracking-wider">Destinations</h5>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h5 className="font-bold mb-4 text-primary-gold uppercase text-sm tracking-wider">Experiences</h5>
            <ul className="space-y-3">
              {footerLinks.experiences.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-bold mb-4 text-primary-gold uppercase text-sm tracking-wider">Company</h5>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-bold mb-4 text-primary-gold uppercase text-sm tracking-wider">Support</h5>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-dark-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center">
              <Phone size={20} className="text-primary-gold" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Call Us</p>
              <a href={`tel:${settings.contact.phone}`} className="font-medium hover:text-primary-gold transition-colors">
                {settings.contact.phone}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center">
              <Mail size={20} className="text-primary-gold" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Email Us</p>
              <a href={`mailto:${settings.contact.email}`} className="font-medium hover:text-primary-gold transition-colors">
                {settings.contact.email}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center">
              <MapPin size={20} className="text-primary-gold" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Visit Us</p>
              <p className="font-medium">{settings.contact.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-border">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm text-center md:text-left">
            © {new Date().getFullYear()} {settings.siteName}. Made with <Heart size={14} className="inline text-red-500 fill-red-500" /> in Indonesia
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/60 hover:text-primary-gold transition-colors"
          >
            <span className="text-sm">Back to Top</span>
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
