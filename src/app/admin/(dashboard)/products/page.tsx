'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXAM_CATEGORIES, PRODUCT_FORMATS, slugify } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  title: string;
  slug: string;
  examCategory: string;
  subject: string;
  format: 'PDF' | 'Printed' | 'Both';
  price: number; // paise
  originalPrice?: number; // paise
  description: string;
  coverImage: string;
  pdfUrl?: string;
  previewImages: string[];
  inStock: boolean;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    _id: 'p1',
    title: 'SSC CGL Complete Maths Notes',
    slug: 'ssc-cgl-maths',
    examCategory: 'SSC',
    subject: 'Mathematics',
    format: 'Both',
    price: 29900,
    originalPrice: 49900,
    description: 'Complete mathematics notes covering all topics for SSC CGL Tier 1 and Tier 2.',
    coverImage: '',
    previewImages: [],
    inStock: true
  },
  {
    _id: 'p2',
    title: 'UPSC Prelims Indian Polity',
    slug: 'upsc-polity',
    examCategory: 'UPSC',
    subject: 'Polity',
    format: 'PDF',
    price: 19900,
    originalPrice: 29900,
    description: 'Comprehensive static polity syllabus with current updates for Civil Services Prelims.',
    coverImage: '',
    previewImages: [],
    inStock: true
  }
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    examCategory: 'General',
    subject: '',
    format: 'Both' as 'PDF' | 'Printed' | 'Both',
    price: '',
    originalPrice: '',
    description: '',
    coverImage: '',
    pdfUrl: '',
    previewImages: [] as string[],
    inStock: true
  });

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      slug: '',
      examCategory: 'General',
      subject: '',
      format: 'Both',
      price: '',
      originalPrice: '',
      description: '',
      coverImage: '',
      pdfUrl: '',
      previewImages: [],
      inStock: true
    });
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      slug: product.slug,
      examCategory: product.examCategory,
      subject: product.subject,
      format: product.format,
      price: (product.price / 100).toString(),
      originalPrice: product.originalPrice ? (product.originalPrice / 100).toString() : '',
      description: product.description,
      coverImage: product.coverImage,
      pdfUrl: product.pdfUrl || '',
      previewImages: product.previewImages,
      inStock: product.inStock
    });
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: slugify(val)
    }));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const pricePaise = Math.round(parseFloat(formData.price) * 100);
    const origPricePaise = formData.originalPrice ? Math.round(parseFloat(formData.originalPrice) * 100) : undefined;

    if (editingProduct) {
      // Edit
      setProducts(prev => prev.map(p => p._id === editingProduct._id ? {
        ...p,
        title: formData.title,
        slug: formData.slug,
        examCategory: formData.examCategory,
        subject: formData.subject,
        format: formData.format,
        price: pricePaise,
        originalPrice: origPricePaise,
        description: formData.description,
        coverImage: formData.coverImage,
        pdfUrl: formData.pdfUrl,
        previewImages: formData.previewImages,
        inStock: formData.inStock
      } : p));
      toast.success('Product updated successfully');
    } else {
      // Add
      const newProduct: Product = {
        _id: Math.random().toString(36).substring(2, 9),
        title: formData.title,
        slug: formData.slug,
        examCategory: formData.examCategory,
        subject: formData.subject,
        format: formData.format,
        price: pricePaise,
        originalPrice: origPricePaise,
        description: formData.description,
        coverImage: formData.coverImage,
        pdfUrl: formData.pdfUrl,
        previewImages: formData.previewImages,
        inStock: formData.inStock
      };
      setProducts(prev => [...prev, newProduct]);
      toast.success('Product added successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      setProducts(prev => prev.filter(p => p._id !== deleteId));
      toast.success('Product deleted successfully');
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-display)]">
            Products List
          </h1>
          <p className="text-sm text-gray-500">
            Publish and manage study notes, price tiers, and inventory stock.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#FF9933] text-white font-semibold text-sm rounded-xl hover:bg-[#E6882E] transition-colors flex items-center gap-2 shadow-sm"
        >
          ➕ Add New Product
        </button>
      </div>

      {/* Product Table Card */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 font-semibold">
                <th className="py-3 px-4">Cover</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50/50 text-gray-700 transition-colors">
                  <td className="py-3 px-4">
                    <div className="w-10 h-12 rounded bg-gray-100 flex items-center justify-center text-sm border border-gray-200 overflow-hidden">
                      {product.coverImage ? (
                        <img src={product.coverImage} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        '📖'
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{product.title}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      {product.examCategory}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-orange-50 text-[#FF9933]">
                      {product.format}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">₹{(product.price / 100).toFixed(0)}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold ${
                      product.inStock ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-xs transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(product._id)}
                      className="text-red-600 hover:text-red-800 font-semibold text-xs transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 text-gray-900 border border-gray-100"
            >
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">
                  {editingProduct ? 'Edit Notes Product' : 'Add New Notes Product'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-semibold p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
                      placeholder="e.g. UPSC Prelims Indian Polity"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Slug (Editable) *</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Exam Category *</label>
                    <select
                      value={formData.examCategory}
                      onChange={(e) => setFormData({ ...formData, examCategory: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm cursor-pointer bg-white"
                    >
                      {EXAM_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Subject *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
                      placeholder="e.g. Polity"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Format *</label>
                    <select
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value as 'PDF' | 'Printed' | 'Both' })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm cursor-pointer bg-white"
                    >
                      {PRODUCT_FORMATS.map(fmt => <option key={fmt} value={fmt}>{fmt}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
                      placeholder="299"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Original Strikethrough Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
                      placeholder="499"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
                    placeholder="Enter comprehensive syllabus or study details..."
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <span className="text-sm font-semibold text-gray-900 block">Inventory Status</span>
                    <span className="text-xs text-gray-500">Toggle whether this product is available for purchase.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF9933]"></div>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#FF9933] text-white font-semibold text-sm rounded-lg hover:bg-[#E6882E]"
                  >
                    Save Notes Product
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteId(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-6 text-gray-900 border border-gray-100"
            >
              <div className="text-center">
                <span className="text-3xl">⚠️</span>
                <h3 className="text-lg font-bold mt-3 text-gray-900 font-[family-name:var(--font-display)]">
                  Delete Product
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Are you sure you want to permanently delete this product? This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2 bg-red-600 text-white font-semibold text-sm rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
