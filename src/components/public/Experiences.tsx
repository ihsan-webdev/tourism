'use client';

import { motion } from 'framer-motion';
import { Clock, Users, ArrowRight, Waves, Landmark, Mountain, Bird, Utensils, Palmtree } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

const iconMap: { [key: string]: React.ElementType } = {
  Waves,
  Landmark,
  Mountain,
  Bird,
  Utensils,
  Palmtree,
};

export default function Experiences() {
  const { experiences } = useAppStore();
  const featuredExperiences = experiences.filter((e) => e.featured).slice(0, 4);

  return (
    <section className="py-20 md:py-32 bg-light-bg">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-subtitle"
            >
              Unique Experiences
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-dark-bg"
            >
              Activities That <br />
              <span className="text-primary-gold italic">Inspire Adventure</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-md"
          >
            From diving in crystal-clear waters to trekking volcanic landscapes,
            discover experiences that will create lasting memories.
          </motion.p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredExperiences.map((experience, index) => {
            const IconComponent = iconMap[experience.icon] || Mountain;

            return (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/experiences/${experience.slug}`} className="block group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-${index === 0 ? '1544551763-46a013bb70d5' :
                          index === 1 ? '1555993539-1732b0258235' :
                            index === 2 ? '1464822759023-fed622ff2c3b' :
                              '1578662996442-48f60103fc96'
                          }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent" />

                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary-gold flex items-center justify-center">
                      <IconComponent size={24} className="text-dark-bg" />
                    </div>

                    {/* Difficulty Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className={`badge ${experience.difficulty === 'Easy' ? 'badge-green' :
                        experience.difficulty === 'Challenging' ? 'badge-orange' :
                          'badge-gold'
                        }`}>
                        {experience.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-bold text-dark-bg mb-2 group-hover:text-primary-gold transition-colors">
                      {experience.name}
                    </h3>
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                      {experience.shortDescription}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>Max {experience.maxParticipants}</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-sm text-text-secondary">From</span>
                        <p className="text-lg font-bold text-primary-gold">
                          {formatPrice(experience.price)}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-dark-bg flex items-center justify-center group-hover:bg-primary-gold transition-colors">
                        <ArrowRight size={18} className="text-white group-hover:text-dark-bg transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/experiences" className="inline-flex items-center gap-2 text-primary-gold font-semibold hover:gap-4 transition-all">
            View All Experiences
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
