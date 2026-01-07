'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  MapPin,
  Compass,
  Image,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function AdminDashboard() {
  const { destinations, experiences, gallery, testimonials, settings } = useAppStore();

  const stats = [
    {
      name: 'Total Destinations',
      value: destinations.length,
      icon: MapPin,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      change: '+12%',
      href: '/admin/destinations'
    },
    {
      name: 'Experiences',
      value: experiences.length,
      icon: Compass,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      change: '+8%',
      href: '/admin/experiences'
    },
    {
      name: 'Gallery Items',
      value: gallery.length,
      icon: Image,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      change: '+24%',
      href: '/admin/gallery'
    },
    {
      name: 'Testimonials',
      value: testimonials.length,
      icon: MessageSquare,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      change: '+15%',
      href: '/admin/testimonials'
    },
  ];

  const quickActions = [
    { name: 'Add Destination', icon: MapPin, href: '/admin/destinations' },
    { name: 'Add Experience', icon: Compass, href: '/admin/experiences' },
    { name: 'Upload Photos', icon: Image, href: '/admin/gallery' },
    { name: 'Site Settings', icon: TrendingUp, href: '/admin/settings' },
  ];

  const recentDestinations = destinations.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-dark-bg">
            Welcome Back, Admin! 👋
          </h1>
          <p className="text-text-secondary mt-1">
            Here&apos;s what&apos;s happening with your tourism website today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/destinations"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-gold text-dark-bg font-medium rounded-xl hover:shadow-gold transition-all"
          >
            <Plus size={18} />
            Add New
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <div className={`${stat.bgColor} rounded-2xl p-6 hover:shadow-lg transition-all group`}>
                <div className="flex items-start justify-between">
                  <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    {stat.change}
                    <TrendingUp size={14} />
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-dark-bg">{stat.value}</p>
                  <p className="text-text-secondary text-sm mt-1">{stat.name}</p>
                </div>
                <div className="mt-4 flex items-center text-sm text-primary-gold font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View All
                  <ArrowUpRight size={14} className="ml-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Destinations */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-dark-bg text-lg">Recent Destinations</h2>
            <Link href="/admin/destinations" className="text-primary-gold text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentDestinations.map((dest) => (
              <div key={dest.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div
                  className="w-16 h-16 rounded-xl bg-cover bg-center flex-shrink-0"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1537996194471-e657a0bdeaaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')`,
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-dark-bg truncate">{dest.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-text-secondary mt-1">
                    <MapPin size={14} />
                    <span>{dest.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${dest.featured ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                    {dest.featured ? 'Featured' : 'Regular'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-semibold text-dark-bg text-lg">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary-gold hover:bg-primary-gold/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-primary-gold/20 flex items-center justify-center transition-colors">
                  <action.icon size={20} className="text-text-secondary group-hover:text-primary-gold transition-colors" />
                </div>
                <span className="font-medium text-dark-bg">{action.name}</span>
                <ArrowUpRight size={16} className="ml-auto text-text-secondary group-hover:text-primary-gold transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Site Stats */}
      <div className="bg-dark-bg rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Site Statistics</h2>
            <p className="text-white/60">Overview of your website performance</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-gold">{settings.stats.destinations}+</div>
              <p className="text-white/60 text-sm mt-1">Destinations</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-gold">{(settings.stats.happyTravelers / 1000).toFixed(0)}K+</div>
              <p className="text-white/60 text-sm mt-1">Travelers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-gold">{settings.stats.tours}+</div>
              <p className="text-white/60 text-sm mt-1">Tours</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-gold">{settings.stats.awards}+</div>
              <p className="text-white/60 text-sm mt-1">Awards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
