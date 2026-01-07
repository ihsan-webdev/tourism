'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function Testimonials() {
  const { testimonials } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredTestimonials = testimonials.filter((t) => t.featured);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };

  const currentTestimonial = featuredTestimonials[currentIndex];

  if (!currentTestimonial) return null;

  return (
    <section className="py-20 md:py-32 bg-light-cream overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-subtitle"
            >
              Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-dark-bg mb-12"
            >
              What Our <span className="text-primary-gold italic">Travelers</span><br />
              Say About Us
            </motion.h2>

            {/* Quote Icon */}
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full bg-primary-gold/20 flex items-center justify-center">
                <Quote size={32} className="text-primary-gold" />
              </div>
            </div>

            {/* Testimonial Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl md:text-2xl text-dark-bg leading-relaxed mb-8 font-light italic">
                  &quot;{currentTestimonial.text}&quot;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-16 h-16 rounded-full bg-cover bg-center ring-4 ring-primary-gold/20"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-${currentIndex === 0 ? '1494790108377-be9c29b29330' :
                        currentIndex === 1 ? '1507003211169-0a1dd7228f2d' :
                          '1438761681033-6461ffad8d80'
                        }?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')`,
                    }}
                  />
                  <div>
                    <h4 className="font-bold text-dark-bg text-lg">{currentTestimonial.name}</h4>
                    <p className="text-text-secondary">{currentTestimonial.location}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < currentTestimonial.rating ? 'text-primary-gold fill-primary-gold' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border-2 border-dark-border flex items-center justify-center hover:bg-primary-gold hover:border-primary-gold hover:text-dark-bg transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border-2 border-dark-border flex items-center justify-center hover:bg-primary-gold hover:border-primary-gold hover:text-dark-bg transition-all"
              >
                <ChevronRight size={24} />
              </button>
              <span className="ml-4 text-text-secondary">
                {currentIndex + 1} / {featuredTestimonials.length}
              </span>
            </div>
          </div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Image */}
              <div
                className="aspect-square rounded-2xl bg-cover bg-center overflow-hidden"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                }}
              >
                <div className="absolute inset-0 bg-primary-gold/20" />
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-8 -right-8 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-accent-teal flex items-center justify-center">
                    <Star size={20} className="text-white fill-white" />
                  </div>
                  <div>
                    <p className="font-bold text-dark-bg">4.9/5</p>
                    <p className="text-xs text-text-secondary">Average Rating</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-8 -left-8 bg-dark-bg rounded-xl p-4 shadow-lg"
              >
                <p className="text-3xl font-bold text-primary-gold">25K+</p>
                <p className="text-sm text-white/70">Happy Customers</p>
              </motion.div>
            </div>

            {/* Decorative Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-dashed border-primary-gold/20 rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
