'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Star, X, Save, User } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { generateId } from '@/lib/utils';
import { Testimonial } from '@/lib/types';

export default function TestimonialsPage() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial, destinations } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    location: '',
    rating: 5,
    text: '',
    destination: '',
    date: new Date().toISOString().split('T')[0],
    featured: false,
  });

  const filteredTestimonials = testimonials.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        avatar: item.avatar,
        location: item.location,
        rating: item.rating,
        text: item.text,
        destination: item.destination,
        date: item.date,
        featured: item.featured,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        avatar: '/images/testimonials/default.jpg',
        location: '',
        rating: 5,
        text: '',
        destination: destinations[0]?.name || '',
        date: new Date().toISOString().split('T')[0],
        featured: false,
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

    const testimonialData: Testimonial = {
      id: editingItem?.id || generateId(),
      name: formData.name,
      avatar: formData.avatar,
      location: formData.location,
      rating: formData.rating,
      text: formData.text,
      destination: formData.destination,
      date: formData.date,
      featured: formData.featured,
    };

    if (editingItem) {
      updateTestimonial(editingItem.id, testimonialData);
    } else {
      addTestimonial(testimonialData);
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    deleteTestimonial(id);
    setDeleteConfirm(null);
  };

  const avatarImages = [
    '1494790108377-be9c29b29330',
    '1507003211169-0a1dd7228f2d',
    '1438761681033-6461ffad8d80',
    '1472099645785-5658abf4ff4e',
    '1500648767791-00dcc994a43e',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-dark-bg">Testimonials</h1>
          <p className="text-text-secondary">Manage customer reviews and testimonials</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-gold text-dark-bg font-medium rounded-xl hover:shadow-gold transition-all"
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input
          type="text"
          placeholder="Search testimonials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
        />
      </div>

      {/* Testimonials List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            layout
            className="bg-white rounded-2xl p-6 shadow-sm group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full bg-cover bg-center ring-2 ring-primary-gold/20"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-${avatarImages[index % avatarImages.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80')`,
                  }}
                />
                <div>
                  <h3 className="font-semibold text-dark-bg">{testimonial.name}</h3>
                  <p className="text-sm text-text-secondary">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openModal(testimonial)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Edit2 size={16} className="text-text-secondary" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(testimonial.id)}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < testimonial.rating ? 'text-primary-gold fill-primary-gold' : 'text-gray-300'}
                />
              ))}
            </div>

            <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
              "{testimonial.text}"
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xs text-text-secondary">
                {testimonial.destination} • {new Date(testimonial.date).toLocaleDateString('id-ID')}
              </span>
              {testimonial.featured && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Featured
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl">
          <User size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-text-secondary">No testimonials found</p>
        </div>
      )}

      {/* Modal */}
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
              className="w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dark-bg">
                  {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-bg mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-bg mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                      placeholder="e.g., Sydney, Australia"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-bg mb-2">Destination</label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                    >
                      {destinations.map((dest) => (
                        <option key={dest.id} value={dest.name}>{dest.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-bg mb-2">Rating</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                    >
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-bg mb-2">Review Text *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors resize-none"
                    placeholder="Customer's review..."
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
                  <label htmlFor="featured" className="text-sm text-dark-bg">Featured testimonial (show on homepage)</label>
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
                    {editingItem ? 'Update' : 'Add'}
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
                <h3 className="text-xl font-semibold text-dark-bg mb-2">Delete Testimonial?</h3>
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
