'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const categories = ['All', 'Nature', 'Cultural', 'Wildlife', 'Adventure'];

export default function Gallery() {
  const { gallery } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredGallery = selectedCategory === 'All'
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredGallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  // Demo images from Unsplash
  const demoImages = [
    '1537996194471-e657a0bdeaaa',
    '1555993539-1732b0258235',
    '1518548419970-58e3b4079ab2',
    '1573790387438-4da905039392',
    '1544735716-392fe2489ffa',
    '1506905925346-21bda4d32df4',
    '1528127269322-539801943592',
    '1464822759023-fed622ff2c3b',
  ];

  return (
    <section className="py-20 md:py-32 bg-light-bg">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-subtitle"
          >
            Gallery
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-dark-bg"
          >
            Captured <span className="text-primary-gold italic">Moments</span>
          </motion.h2>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                  ? 'bg-primary-gold text-dark-bg shadow-gold'
                  : 'bg-white text-text-secondary hover:bg-primary-gold/10'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={`group relative overflow-hidden rounded-xl cursor-pointer ${index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                onClick={() => openLightbox(index)}
              >
                <div className={`${index === 0 || index === 5 ? 'h-[400px]' : 'h-[200px]'
                  }`}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-${demoImages[index % demoImages.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-dark-bg/0 group-hover:bg-dark-bg/40 transition-colors duration-300" />

                  {/* Hover Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4">
                      <ZoomIn size={20} className="text-dark-bg" />
                    </div>
                    <p className="text-white font-semibold text-center px-4">{item.title}</p>
                    <p className="text-white/70 text-sm">{item.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && filteredGallery[currentImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark-bg/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <X size={24} className="text-white" />
            </button>

            {/* Navigation */}
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight size={24} className="text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full h-[60vh] bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-${demoImages[currentImageIndex % demoImages.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')`,
                }}
              />
              <div className="text-center mt-4">
                <p className="text-white text-xl font-playfair font-bold">{filteredGallery[currentImageIndex]?.title}</p>
                <p className="text-white/60">{filteredGallery[currentImageIndex]?.location}</p>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60">
              {currentImageIndex + 1} / {filteredGallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
