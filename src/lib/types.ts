// Types for the tourism CMS

export interface Destination {
  id: string;
  name: string;
  slug: string;
  location: string;
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  price: number;
  category: string;
  featured: boolean;
  highlights: string[];
  createdAt: string;
}

export interface Experience {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  icon: string;
  price: number;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Intermediate' | 'Challenging';
  maxParticipants: number;
  included: string[];
  category: string;
  featured: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  text: string;
  destination: string;
  date: string;
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
  location: string;
  featured: boolean;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  social: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  stats: {
    destinations: number;
    happyTravelers: number;
    tours: number;
    awards: number;
  };
  adminCredentials: {
    email: string;
    password: string;
  };
}

export interface AdminUser {
  email: string;
  isAuthenticated: boolean;
}
