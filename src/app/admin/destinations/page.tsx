'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Edit2, Trash2, Star, MapPin, X, Save
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatPrice, generateId, slugify, categories } from '@/lib/utils';
import { Destination } from '@/lib/types';

export default function DestinationsPage() {
  const { destinations, addDestination, updateDestination, deleteDestination } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Destination | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    shortDescription: '',
    image: '',
    rating: 4.5,
    reviews: 0,
    price: 0,
    category: 'Beach',
    featured: false,
    highlights: '',
  });

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openModal = (item?: Destination) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        location: item.location,
        description: item.description,
        shortDescription: item.shortDescription,
        image: item.image,
        rating: item.rating,
        reviews: item.reviews,
        price: item.price,
        category: item.category,
        featured: item.featured,
        highlights: item.highlights.join(', '),
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        location: '',
        description: '',
        shortDescription: '',
        image: '/images/destinations/default.jpg',
        rating: 4.5,
        reviews: 0,
        price: 0,
        category: 'Beach',
        featured: false,
        highlights: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const destinationData: Destination = {
      id: editingItem?.id || generateId(),
      name: formData.name,
      slug: slugify(formData.name),
      location: formData.location,
      description: formData.description,
      shortDescription: formData.shortDescription,
      image: formData.image,
      gallery: editingItem?.gallery || [],
      rating: formData.rating,
      reviews: formData.reviews,
      price: formData.price,
      category: formData.category,
      featured: formData.featured,
      highlights: formData.highlights.split(',').map(h => h.trim()).filter(Boolean),
      createdAt: editingItem?.createdAt || new Date().toISOString(),
    };

    if (editingItem) {
      updateDestination(editingItem.id, destinationData);
    } else {
      addDestination(destinationData);
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    deleteDestination(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-dark-bg">Destinations</h1>
          <p className="text-text-secondary">Manage your tourism destinations</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-gold text-dark-bg font-medium rounded-xl hover:shadow-gold transition-all"
        >
          <Plus size={18} />
          Add Destination
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Destination</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden lg:table-cell">Rating</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell">Price</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDestinations.map((dest) => (
                <tr key={dest.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1537996194471-e657a0bdeaaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80')`,
                        }}
                      />
                      <div>
                        <p className="font-medium text-dark-bg">{dest.name}</p>
                        <div className="flex items-center gap-1 text-sm text-text-secondary">
                          <MapPin size={12} />
                          <span>{dest.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {dest.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-primary-gold fill-primary-gold" />
                      <span className="font-medium">{dest.rating}</span>
                      <span className="text-text-secondary text-sm">({dest.reviews})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="font-medium text-dark-bg">{formatPrice(dest.price)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${dest.featured ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                      {dest.featured ? 'Featured' : 'Regular'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(dest)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-text-secondary hover:text-primary-gold"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(dest.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors text-text-secondary hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-text-secondary">No destinations found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dark-bg">
                  {editingItem ? 'Edit Destination' : 'Add New Destination'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-bg mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                      placeholder="e.g., Raja Ampat"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-bg mb-2">Location *</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                      placeholder="e.g., Papua Barat"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-bg mb-2">Short Description *</label>
                  <input
                    type="text"
                    required
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                    placeholder="Brief tagline for the destination"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-bg mb-2">Full Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors resize-none"
                    placeholder="Detailed description of the destination"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-bg mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-bg mb-2">Price (IDR)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-bg mb-2">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-bg mb-2">Highlights (comma separated)</label>
                  <input
                    type="text"
                    value={formData.highlights}
                    onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                    placeholder="e.g., Diving, Snorkeling, Photography"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-primary-gold focus:ring-primary-gold"
                  />
                  <label htmlFor="featured" className="text-sm text-dark-bg">Featured destination (show on homepage)</label>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-gold text-dark-bg font-medium hover:shadow-gold transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    {editingItem ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={32} className="text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-dark-bg mb-2">Delete Destination?</h3>
                <p className="text-text-secondary mb-6">This action cannot be undone.</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
