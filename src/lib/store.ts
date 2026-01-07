import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AdminUser, Destination, Experience, Testimonial, GalleryItem, SiteSettings } from './types';

// Import data
import destinationsData from '@/data/destinations.json';
import experiencesData from '@/data/experiences.json';
import testimonialsData from '@/data/testimonials.json';
import galleryData from '@/data/gallery.json';
import settingsData from '@/data/settings.json';

interface AppState {
  // Auth
  admin: AdminUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  
  // Data
  destinations: Destination[];
  experiences: Experience[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  settings: SiteSettings;
  
  // CRUD Operations
  addDestination: (destination: Destination) => void;
  updateDestination: (id: string, destination: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;
  
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  
  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  
  updateSettings: (settings: Partial<SiteSettings>) => void;
  
  // UI State
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      admin: null,
      login: (email: string, password: string) => {
        const settings = get().settings;
        if (email === settings.adminCredentials.email && password === settings.adminCredentials.password) {
          set({ admin: { email, isAuthenticated: true } });
          return true;
        }
        return false;
      },
      logout: () => set({ admin: null }),
      
      // Initial Data
      destinations: destinationsData.destinations as Destination[],
      experiences: experiencesData.experiences as Experience[],
      testimonials: testimonialsData.testimonials as Testimonial[],
      gallery: galleryData.gallery as GalleryItem[],
      settings: settingsData as SiteSettings,
      
      // Destination CRUD
      addDestination: (destination) => set((state) => ({
        destinations: [...state.destinations, destination]
      })),
      updateDestination: (id, updates) => set((state) => ({
        destinations: state.destinations.map((d) => 
          d.id === id ? { ...d, ...updates } : d
        )
      })),
      deleteDestination: (id) => set((state) => ({
        destinations: state.destinations.filter((d) => d.id !== id)
      })),
      
      // Experience CRUD
      addExperience: (experience) => set((state) => ({
        experiences: [...state.experiences, experience]
      })),
      updateExperience: (id, updates) => set((state) => ({
        experiences: state.experiences.map((e) => 
          e.id === id ? { ...e, ...updates } : e
        )
      })),
      deleteExperience: (id) => set((state) => ({
        experiences: state.experiences.filter((e) => e.id !== id)
      })),
      
      // Testimonial CRUD
      addTestimonial: (testimonial) => set((state) => ({
        testimonials: [...state.testimonials, testimonial]
      })),
      updateTestimonial: (id, updates) => set((state) => ({
        testimonials: state.testimonials.map((t) => 
          t.id === id ? { ...t, ...updates } : t
        )
      })),
      deleteTestimonial: (id) => set((state) => ({
        testimonials: state.testimonials.filter((t) => t.id !== id)
      })),
      
      // Gallery CRUD
      addGalleryItem: (item) => set((state) => ({
        gallery: [...state.gallery, item]
      })),
      updateGalleryItem: (id, updates) => set((state) => ({
        gallery: state.gallery.map((g) => 
          g.id === id ? { ...g, ...updates } : g
        )
      })),
      deleteGalleryItem: (id) => set((state) => ({
        gallery: state.gallery.filter((g) => g.id !== id)
      })),
      
      // Settings
      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      })),
      
      // UI State
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'tourism-cms-storage',
      partialize: (state) => ({
        admin: state.admin,
        destinations: state.destinations,
        experiences: state.experiences,
        testimonials: state.testimonials,
        gallery: state.gallery,
        settings: state.settings,
        darkMode: state.darkMode,
      }),
    }
  )
);
