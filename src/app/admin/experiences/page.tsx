'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Clock, Users, X, Save } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatPrice, generateId, slugify, categories, difficulties } from '@/lib/utils';
import { Experience } from '@/lib/types';

export default function ExperiencesPage() {
  const { experiences, addExperience, updateExperience, deleteExperience } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Experience | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    image: '',
    icon: 'Mountain',
    price: 0,
    duration: '',
    difficulty: 'Easy' as const,
    maxParticipants: 10,
    included: '',
    category: 'Adventure',
    featured: false,
  });

  const filteredExperiences = experiences.filter((exp) =>
    exp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (item?: Experience) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        shortDescription: item.shortDescription,
        image: item.image,
        icon: item.icon,
        price: item.price,
        duration: item.duration,
        difficulty: item.difficulty,
        maxParticipants: item.maxParticipants,
        included: item.included.join(', '),
        category: item.category,
        featured: item.featured,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        shortDescription: '',
        image: '/images/experiences/default.jpg',
        icon: 'Mountain',
        price: 0,
        duration: '',
        difficulty: 'Easy',
        maxParticipants: 10,
        included: '',
        category: 'Adventure',
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

    const experienceData: Experience = {
      id: editingItem?.id || generateId(),
      name: formData.name,
      slug: slugify(formData.name),
      description: formData.description,
      shortDescription: formData.shortDescription,
      image: formData.image,
      icon: formData.icon,
      price: formData.price,
      duration: formData.duration,
      difficulty: formData.difficulty,
      maxParticipants: formData.maxParticipants,
      included: formData.included.split(',').map(i => i.trim()).filter(Boolean),
      category: formData.category,
      featured: formData.featured,
      createdAt: editingItem?.createdAt || new Date().toISOString(),
    };

    if (editingItem) {
      updateExperience(editingItem.id, experienceData);
    } else {
      addExperience(experienceData);
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    deleteExperience(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-dark-bg">Experiences</h1>
          <p className="text-text-secondary">Manage your tourism experiences and activities</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-gold text-dark-bg font-medium rounded-xl hover:shadow-gold transition-all"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input
          type="text"
          placeholder="Search experiences..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
        />
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((exp) => (
          <motion.div
            key={exp.id}
            layout
            className="bg-white rounded-2xl shadow-sm overflow-hidden group"
          >
            <div
              className="h-40 bg-cover bg-center relative"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent" />
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openModal(exp)}
                  className="p-2 rounded-lg bg-white/90 hover:bg-white transition-colors"
                >
                  <Edit2 size={16} className="text-dark-bg" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(exp.id)}
                  className="p-2 rounded-lg bg-white/90 hover:bg-white transition-colors"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-dark-bg">{exp.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${exp.featured ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                  {exp.featured ? 'Featured' : 'Regular'}
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">{exp.shortDescription}</p>
              <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {exp.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} />
                  Max {exp.maxParticipants}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${exp.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    exp.difficulty === 'Challenging' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                  }`}>
                  {exp.difficulty}
                </span>
                <span className="font-bold text-primary-gold">{formatPrice(exp.price)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredExperiences.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl">
          <p className="text-text-secondary">No experiences found</p>
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
              className="w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dark-bg">
                  {editingItem ? 'Edit Experience' : 'Add New Experience'}
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
                    />
                  </div>
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-bg mb-2">Short Description</label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-bg mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-bg mb-2">Price (IDR)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-bg mb-2">Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                      placeholder="e.g., Full Day"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-bg mb-2">Difficulty</label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                    >
                      {difficulties.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-bg mb-2">What's Included (comma separated)</label>
                  <input
                    type="text"
                    value={formData.included}
                    onChange={(e) => setFormData({ ...formData, included: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                    placeholder="e.g., Guide, Equipment, Lunch"
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
                  <label htmlFor="featured" className="text-sm text-dark-bg">Featured experience</label>
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
                <h3 className="text-xl font-semibold text-dark-bg mb-2">Delete Experience?</h3>
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
