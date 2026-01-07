'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function AdminLogin() {
  const router = useRouter();
  const { login } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = login(email, password);

    if (success) {
      router.push('/admin');
    } else {
      setError('Email atau password salah. Gunakan admin@tourism.com / Admin123!');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-bg/95 to-dark-bg" />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="glass-dark rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-dark-bg">NT</span>
            </div>
            <h1 className="text-2xl font-playfair font-bold text-white">Admin Panel</h1>
            <p className="text-white/60 mt-2">Masuk untuk mengelola konten website</p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 flex items-start gap-3"
            >
              <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tourism.com"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-dark-surface border border-dark-border text-white placeholder:text-white/30 focus:outline-none focus:border-primary-gold transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-dark-surface border border-dark-border text-white placeholder:text-white/30 focus:outline-none focus:border-primary-gold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-dark-border bg-dark-surface text-primary-gold focus:ring-primary-gold focus:ring-offset-dark-bg"
                />
                <span className="text-white/60 text-sm">Ingat saya</span>
              </label>
              <a href="#" className="text-primary-gold text-sm hover:underline">
                Lupa password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-gold text-dark-bg font-bold text-lg flex items-center justify-center gap-2 hover:shadow-gold-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-dark-bg/30 border-t-dark-bg rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} />
                  Masuk
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-dark-border">
            <p className="text-white/40 text-sm text-center mb-3">Demo Credentials:</p>
            <div className="bg-dark-surface rounded-lg p-4 text-center">
              <p className="text-white/70 text-sm">
                <span className="text-white/40">Email:</span> admin@tourism.com
              </p>
              <p className="text-white/70 text-sm">
                <span className="text-white/40">Password:</span> Admin123!
              </p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <p className="text-center mt-6 text-white/40">
          <a href="/" className="hover:text-primary-gold transition-colors">
            ← Kembali ke Website
          </a>
        </p>
      </motion.div>
    </div>
  );
}
