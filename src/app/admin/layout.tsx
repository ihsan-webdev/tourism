'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  LayoutDashboard,
  MapPin,
  Compass,
  Image,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  User
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Destinations', href: '/admin/destinations', icon: MapPin },
  { name: 'Experiences', href: '/admin/experiences', icon: Compass },
  { name: 'Gallery', href: '/admin/gallery', icon: Image },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { admin, logout, sidebarOpen, toggleSidebar, settings } = useAppStore();

  // Check auth
  useEffect(() => {
    if (!admin && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [admin, pathname, router]);

  // If on login page, just render children
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If not authenticated, show loading
  if (!admin) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-gold/30 border-t-primary-gold rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-light-bg">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-dark-bg z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
        {/* Logo */}
        <div className="p-6 border-b border-dark-border">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
              <span className="text-xl font-bold text-dark-bg">NT</span>
            </div>
            <div>
              <h1 className="font-playfair font-bold text-white text-lg">{settings.siteName}</h1>
              <p className="text-white/40 text-xs">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                    ? 'bg-primary-gold text-dark-bg font-medium'
                    : 'text-white/70 hover:bg-dark-surface hover:text-white'
                  }`}
              >
                <link.icon size={20} />
                <span>{link.name}</span>
                {isActive && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-border">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-dark-surface hover:text-white transition-all mb-2"
          >
            <Compass size={20} />
            <span>View Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-72'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-text-secondary">
              <span>Admin</span>
              <ChevronRight size={14} />
              <span className="text-dark-bg font-medium capitalize">
                {pathname === '/admin' ? 'Dashboard' : pathname.split('/').pop()}
              </span>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell size={20} className="text-text-secondary" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent-coral rounded-full" />
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-dark-bg">Admin</p>
                  <p className="text-xs text-text-secondary">{admin.email}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                  <User size={20} className="text-dark-bg" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
