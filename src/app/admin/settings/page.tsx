'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube, BarChart3 } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function SettingsPage() {
  const { settings, updateSettings } = useAppStore();
  const [formData, setFormData] = useState({
    siteName: settings.siteName,
    tagline: settings.tagline,
    description: settings.description,
    phone: settings.contact.phone,
    email: settings.contact.email,
    address: settings.contact.address,
    instagram: settings.social.instagram,
    facebook: settings.social.facebook,
    twitter: settings.social.twitter,
    youtube: settings.social.youtube,
    heroTitle: settings.hero.title,
    heroSubtitle: settings.hero.subtitle,
    heroCtaText: settings.hero.ctaText,
    statsDestinations: settings.stats.destinations,
    statsTravelers: settings.stats.happyTravelers,
    statsTours: settings.stats.tours,
    statsAwards: settings.stats.awards,
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateSettings({
      siteName: formData.siteName,
      tagline: formData.tagline,
      description: formData.description,
      contact: {
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
      },
      social: {
        instagram: formData.instagram,
        facebook: formData.facebook,
        twitter: formData.twitter,
        youtube: formData.youtube,
      },
      hero: {
        ...settings.hero,
        title: formData.heroTitle,
        subtitle: formData.heroSubtitle,
        ctaText: formData.heroCtaText,
      },
      stats: {
        destinations: formData.statsDestinations,
        happyTravelers: formData.statsTravelers,
        tours: formData.statsTours,
        awards: formData.statsAwards,
      },
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-dark-bg">Settings</h1>
          <p className="text-text-secondary">Manage your website configuration</p>
        </div>
        {saved && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium"
          >
            ✓ Settings saved successfully!
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Globe size={20} className="text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-dark-bg">General Settings</h2>
                <p className="text-sm text-text-secondary">Basic website information</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark-bg mb-2">Site Name</label>
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-bg mb-2">Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-bg mb-2">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Settings */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Phone size={20} className="text-green-600" />
              </div>
              <div>
                <h2 className="font-semibold text-dark-bg">Contact Information</h2>
                <p className="text-sm text-text-secondary">How customers can reach you</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark-bg mb-2">
                  <Phone size={14} className="inline mr-2" />
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-bg mb-2">
                  <Mail size={14} className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-bg mb-2">
                <MapPin size={14} className="inline mr-2" />
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Instagram size={20} className="text-purple-600" />
              </div>
              <div>
                <h2 className="font-semibold text-dark-bg">Social Media</h2>
                <p className="text-sm text-text-secondary">Your social media profiles</p>
              </div>
            </div>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-bg mb-2">
                <Instagram size={14} className="inline mr-2" />
                Instagram
              </label>
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-bg mb-2">
                <Facebook size={14} className="inline mr-2" />
                Facebook
              </label>
              <input
                type="url"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-bg mb-2">
                <Twitter size={14} className="inline mr-2" />
                Twitter
              </label>
              <input
                type="url"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-bg mb-2">
                <Youtube size={14} className="inline mr-2" />
                YouTube
              </label>
              <input
                type="url"
                value={formData.youtube}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Hero Settings */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Globe size={20} className="text-orange-600" />
              </div>
              <div>
                <h2 className="font-semibold text-dark-bg">Hero Section</h2>
                <p className="text-sm text-text-secondary">Customize the homepage hero</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark-bg mb-2">Hero Title</label>
                <input
                  type="text"
                  value={formData.heroTitle}
                  onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-bg mb-2">CTA Button Text</label>
                <input
                  type="text"
                  value={formData.heroCtaText}
                  onChange={(e) => setFormData({ ...formData, heroCtaText: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-bg mb-2">Hero Subtitle</label>
              <input
                type="text"
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Stats Settings */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-gold/20 flex items-center justify-center">
                <BarChart3 size={20} className="text-primary-gold" />
              </div>
              <div>
                <h2 className="font-semibold text-dark-bg">Statistics</h2>
                <p className="text-sm text-text-secondary">Numbers displayed on the website</p>
              </div>
            </div>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-bg mb-2">Destinations</label>
              <input
                type="number"
                value={formData.statsDestinations}
                onChange={(e) => setFormData({ ...formData, statsDestinations: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-bg mb-2">Happy Travelers</label>
              <input
                type="number"
                value={formData.statsTravelers}
                onChange={(e) => setFormData({ ...formData, statsTravelers: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-bg mb-2">Tours</label>
              <input
                type="number"
                value={formData.statsTours}
                onChange={(e) => setFormData({ ...formData, statsTours: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-bg mb-2">Awards</label>
              <input
                type="number"
                value={formData.statsAwards}
                onChange={(e) => setFormData({ ...formData, statsAwards: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-gradient-gold text-dark-bg font-medium rounded-xl hover:shadow-gold transition-all"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
