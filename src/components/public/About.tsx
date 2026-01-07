'use client';

import { motion } from 'framer-motion';
import { Award, Users, Globe, Heart } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function About() {
  const { settings } = useAppStore();

  const features = [
    {
      icon: Globe,
      title: 'Local Expertise',
      description: 'Our guides are locals who know every hidden gem and secret spot across Indonesia.',
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized as the best tourism agency with 45+ international awards.',
    },
    {
      icon: Users,
      title: 'Small Groups',
      description: 'Intimate experiences with small group sizes for personalized attention.',
    },
    {
      icon: Heart,
      title: 'Sustainable Travel',
      description: 'We are committed to eco-friendly practices and supporting local communities.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-dark-bg text-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden">
              <div
                className="aspect-[4/5] bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/50 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-8 -right-8 md:right-8 glass-dark rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-gold flex items-center justify-center animate-pulse-gold">
                  <span className="text-2xl font-bold text-dark-bg">15+</span>
                </div>
                <div>
                  <p className="font-bold text-lg">Years of Experience</p>
                  <p className="text-white/60 text-sm">Creating unforgettable journeys</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute -top-8 -left-8 w-32 h-32 border-4 border-primary-gold/30 rounded-2xl -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-subtitle">About Us</span>
            <h2 className="section-title mb-6">
              Creating <span className="text-primary-gold italic">Memories</span><br />
              Since 2009
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              {settings.description} We believe travel is about more than just visiting places —
              it's about experiencing cultures, making connections, and creating stories
              that last a lifetime.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-gold/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon size={24} className="text-primary-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{feature.title}</h4>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="btn-primary">
              Learn More About Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
