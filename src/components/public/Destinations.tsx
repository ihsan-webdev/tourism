'use client';

import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function Destinations() {
  const { destinations } = useAppStore();
  const featuredDestinations = destinations.filter((d) => d.featured).slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 md:py-32 bg-light-cream">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-subtitle"
          >
            Top Destinations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-dark-bg"
          >
            Explore Indonesia&apos;s <br />
            <span className="text-primary-gold italic">Hidden Gems</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-2xl mx-auto mt-4"
          >
            Discover breathtaking destinations across the Indonesian archipelago,
            from pristine beaches to ancient temples and volcanic landscapes.
          </motion.p>
        </div>

        {/* Destinations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-2xl ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
            >
              <Link href={`/destinations/${destination.slug}`}>
                <div className={`relative ${index === 0 ? 'h-[500px]' : 'h-[240px]'}`}>
                  {/* Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-${index === 0 ? '1537996194471-e657a0bdeaaa' :
                        index === 1 ? '1555993539-1732b0258235' :
                          index === 2 ? '1518548419970-58e3b4079ab2' :
                            '1573790387438-4da905039392'
                        }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent opacity-80" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-gold">
                      {destination.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                      <MapPin size={14} />
                      <span>{destination.location}</span>
                    </div>
                    <h3 className={`font-playfair font-bold text-white mb-2 ${index === 0 ? 'text-3xl' : 'text-xl'
                      }`}>
                      {destination.name}
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-primary-gold">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                        <span className="text-white/60 text-sm">({destination.reviews})</span>
                      </div>
                      <span className="text-white font-semibold">
                        {formatPrice(destination.price)}
                      </span>
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                    <ArrowRight size={24} className="text-dark-bg" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/destinations" className="btn-primary inline-flex items-center gap-2 group">
            View All Destinations
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
