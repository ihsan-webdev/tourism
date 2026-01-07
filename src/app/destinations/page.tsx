'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Star, Search } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatPrice, categories } from '@/lib/utils';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function DestinationsPage() {
  const { destinations } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const demoImages = [
    '1537996194471-e657a0bdeaaa',
    '1555993539-1732b0258235',
    '1518548419970-58e3b4079ab2',
    '1573790387438-4da905039392',
    '1544735716-392fe2489ffa',
    '1506905925346-21bda4d32df4',
  ];

  return (
    <main className="min-h-screen bg-light-bg">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-dark-bg/60" />
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4"
          >
            Explore <span className="text-primary-gold italic">Destinations</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 max-w-xl mx-auto px-4"
          >
            Temukan destinasi wisata terbaik di Indonesia
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Cari destinasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {['All', ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${selectedCategory === cat
                    ? 'bg-primary-gold text-dark-bg'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/destinations/${dest.slug}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="relative h-64 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-${demoImages[index % demoImages.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-medium bg-primary-gold text-dark-bg rounded-full">
                          {dest.category}
                        </span>
                      </div>

                      {dest.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 text-xs font-medium bg-accent-coral text-white rounded-full">
                            Featured
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                          <MapPin size={14} />
                          <span>{dest.location}</span>
                        </div>
                        <h3 className="text-xl font-playfair font-bold text-white">
                          {dest.name}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                        {dest.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star size={16} className="text-primary-gold fill-primary-gold" />
                          <span className="font-medium">{dest.rating}</span>
                          <span className="text-text-secondary text-sm">({dest.reviews})</span>
                        </div>
                        <span className="text-lg font-bold text-primary-gold">
                          {formatPrice(dest.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <MapPin size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-text-secondary text-lg">Tidak ada destinasi ditemukan</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
