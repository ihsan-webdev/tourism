'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { generateId } from '@/lib/utils';
import { GalleryItem } from '@/lib/types';

export default function GalleryPage() {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: 'Nature',
    location: '',
    featured: false,
  });

  const galleryCategories = ['All', 'Nature', 'Cultural', 'Wildlife', 'Adventure'];

  const filteredGallery = gallery.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const openModal = (item?: GalleryItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        image: item.image,
        category: item.category,
        location: item.location,
        featured: item.featured,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        image: '/images/gallery/default.jpg',
        category: 'Nature',
        location: '',
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

    const galleryData: GalleryItem = {
      id: editingItem?.id || generateId(),
      title: formData.title,
      image: formData.image,
      category: formData.category,
      location: formData.location,
      featured: formData.featured,
    };

    if (editingItem) {
      updateGalleryItem(editingItem.id, galleryData);
    } else {
      addGalleryItem(galleryData);
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    deleteGalleryItem(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-dark-bg">Gallery</h1>
          <p className="text-text-secondary">Manage your photo gallery</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-gold text-dark-bg font-medium rounded-xl hover:shadow-gold transition-all"
        >
          <Plus size={18} />
          Add Photo
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search gallery..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${selectedCategory === cat
                ? 'bg-primary-gold text-dark-bg'
                : 'bg-white text-text-secondary hover:bg-gray-100'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredGallery.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-${demoImages[index % demoImages.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')`,
                }}
              />
              <div className="absolute inset-0 bg-dark-bg/0 group-hover:bg-dark-bg/50 transition-colors" />

              {/* Hover Actions */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openModal(item)}
                  className="p-3 rounded-full bg-white/90 hover:bg-white transition-colors"
                >
                  <ImageIcon size={18} className="text-dark-bg" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(item.id)}
                  className="p-3 rounded-full bg-white/90 hover:bg-white transition-colors"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-dark-bg/80 to-transparent">
                <p className="text-white text-sm font-medium truncate">{item.title}</p>
                <p className="text-white/70 text-xs">{item.location}</p>
              </div>

              {/* Featured Badge */}
              {item.featured && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary-gold text-dark-bg">
                    Featured
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredGallery.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl">
          <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-text-secondary">No photos found</p>
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
              className="w-full max-w-lg bg-white rounded-2xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-dark-bg">
                  {editingItem ? 'Edit Photo' : 'Add New Photo'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-dark-bg mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                    placeholder="Photo title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-bg mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                    >
                      {galleryCategories.filter(c => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-bg mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-gold transition-colors"
                      placeholder="e.g., Bali"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-primary-gold focus:ring-primary-gold"
                  />
                  <label htmlFor="featured" className="text-sm text-dark-bg">Featured photo</label>
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
                <h3 className="text-xl font-semibold text-dark-bg mb-2">Delete Photo?</h3>
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
