import { useState, useEffect } from 'react';
import { X, Plus, Trash2, CheckCircle, Package } from 'lucide-react';
import { CATEGORIES, SEASONS } from '../../data/products';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';

const BADGES = ['Bestseller', 'Top Pick', 'Featured', 'Popular', 'New', 'Hot', 'Research'];
const CATEGORY_LIST = Object.values(CATEGORIES);
const SEASON_LIST = Object.values(SEASONS);

const defaultForm = {
  name: '',
  category: 'Vegetable Crops',
  crop_type: 'Tomato',
  season: 'Kharif',
  maturity_days_min: 45,
  maturity_days_max: 90,
  badge: 'Popular',
  description: '',
  image_url: '/products/ubuntu_glory.png',
  specs: [],
  is_featured: false,
};

export default function VarietyFormModal({ isOpen, onClose, editingVariety, onSaved }) {
  const [formData, setFormData] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingVariety) {
      setFormData({
        name: editingVariety.name || '',
        category: editingVariety.category || 'Vegetable Crops',
        crop_type: editingVariety.subCategory || editingVariety.crop_type || 'Tomato',
        season: editingVariety.season || 'Kharif',
        maturity_days_min: editingVariety.maturity_days_min || 45,
        maturity_days_max: editingVariety.maturity_days_max || 90,
        badge: editingVariety.badge || 'Popular',
        description: editingVariety.description || '',
        image_url: editingVariety.image || editingVariety.image_url || '/products/ubuntu_glory.png',
        specs: Array.isArray(editingVariety.specs) ? editingVariety.specs : [],
        is_featured: Boolean(editingVariety.featured || editingVariety.is_featured),
      });
    } else {
      setFormData(defaultForm);
    }
  }, [editingVariety, isOpen]);

  if (!isOpen) return null;

  const handleAddSpec = () => {
    setFormData({
      ...formData,
      specs: [...formData.specs, { label: '', value: '' }],
    });
  };

  const handleRemoveSpec = (index) => {
    setFormData({
      ...formData,
      specs: formData.specs.filter((_, i) => i !== index),
    });
  };

  const handleSpecChange = (index, field, val) => {
    const updated = formData.specs.map((spec, i) => {
      if (i === index) return { ...spec, [field]: val };
      return spec;
    });
    setFormData({ ...formData, specs: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.crop_type || !formData.description) {
      toast.error('Please enter variety name, crop type, and description');
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      toast.success(editingVariety ? 'Variety updated locally' : 'Variety created locally');
      onSaved();
      onClose();
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: formData.name,
        category: formData.category,
        crop_type: formData.crop_type,
        season: formData.season,
        maturity_days_min: Number(formData.maturity_days_min),
        maturity_days_max: Number(formData.maturity_days_max),
        badge: formData.badge,
        description: formData.description,
        image_url: formData.image_url,
        specs: formData.specs,
        is_featured: formData.is_featured,
        updated_at: new Date().toISOString(),
      };

      if (editingVariety && editingVariety.id) {
        const { error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', editingVariety.id);
        if (error) throw error;
        toast.success('Seed variety updated successfully!');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([payload]);
        if (error) throw error;
        toast.success('New seed variety added successfully!');
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error('Save variety error:', err);
      toast.error(err.message || 'Failed to save variety');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 border border-gray-100 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-green-100 text-green-800 flex items-center justify-center font-bold text-lg">
              🌱
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 font-display">
                {editingVariety ? 'Edit Seed Variety' : 'Add New Seed Variety'}
              </h2>
              <p className="text-xs text-gray-500">Manage catalog variety details & specs live</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Variety Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Ubuntu Tomato King"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Crop Type</label>
              <input
                type="text"
                required
                placeholder="e.g. Tomato, Cotton, Okra"
                value={formData.crop_type}
                onChange={(e) => setFormData({ ...formData, crop_type: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white"
              >
                {CATEGORY_LIST.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Sowing Season</label>
              <select
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white"
              >
                {SEASON_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Badge</label>
              <select
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white"
              >
                {BADGES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Maturity Min (Days)</label>
              <input
                type="number"
                value={formData.maturity_days_min}
                onChange={(e) => setFormData({ ...formData, maturity_days_min: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Maturity Max (Days)</label>
              <input
                type="number"
                value={formData.maturity_days_max}
                onChange={(e) => setFormData({ ...formData, maturity_days_max: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Image URL / Path</label>
            <input
              type="text"
              required
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Variety Description</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300"
            />
          </div>

          {/* Dynamic Technical Specs Editor */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-gray-700 text-xs uppercase tracking-wider">
                Technical Agronomic Specs
              </label>
              <button
                type="button"
                onClick={handleAddSpec}
                className="px-2.5 py-1 rounded-lg bg-green-100 text-green-800 text-xs font-bold flex items-center gap-1"
              >
                <Plus size={12} /> Add Spec
              </button>
            </div>

            {formData.specs.map((spec, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                <input
                  type="text"
                  placeholder="Spec Label"
                  value={spec.label || ''}
                  onChange={(e) => handleSpecChange(idx, 'label', e.target.value)}
                  className="w-1/2 px-2.5 py-1 text-xs rounded-lg border border-gray-300 bg-white"
                />
                <input
                  type="text"
                  placeholder="Spec Value"
                  value={spec.value || ''}
                  onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                  className="w-1/2 px-2.5 py-1 text-xs rounded-lg border border-gray-300 bg-white"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(idx)}
                  className="p-1 text-red-500 hover:bg-red-100 rounded-lg"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="w-4 h-4 text-green-600 rounded-sm"
            />
            <label htmlFor="is_featured" className="text-xs font-semibold text-gray-800 cursor-pointer">
              Mark as Featured Variety on Home Page
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-green-700 hover:bg-green-800 text-white shadow-md flex items-center gap-2"
            >
              {saving ? 'Saving...' : editingVariety ? 'Save Changes' : 'Add Variety'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
