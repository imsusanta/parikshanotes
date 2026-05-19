'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    codAvailable: true,
    freeDeliveryThreshold: 299, // in rupees for UI
    contactEmail: 'contact@parikshanotes.com',
    announcementText: '🚀 New SSC CGL 2026 Notes Available — Download Now!',
    categories: 'SSC, UPSC, Railway, Banking, State PSC, General'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [savingSettings, setSavingSettings] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('parikshanotes_categories');
      if (saved) {
        setSettings(prev => ({ ...prev, categories: saved }));
      }
    }
  }, []);

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('parikshanotes_categories', settings.categories);
    }
    // Simulate API update
    setTimeout(() => {
      toast.success('Settings updated successfully!');
      setSavingSettings(false);
    }, 800);
  };

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setSavingPassword(true);
    // Simulate API update
    setTimeout(() => {
      toast.success('Admin password updated successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSavingPassword(false);
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-display)]">
          Settings
        </h1>
        <p className="text-sm text-gray-500">
          Configure site-wide preferences and security credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-base font-semibold text-gray-900">General Configuration</h2>
          <p className="text-xs text-gray-500 mt-1">
            Toggle Cash on Delivery, change shipping thresholds, and modify footer contact details.
          </p>
        </div>

        <div className="md:col-span-2">
          <form onSubmit={saveSettings} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
            {/* Toggle COD */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-gray-900 block">Cash on Delivery (COD)</span>
                <span className="text-xs text-gray-500">Allow customers to choose COD for printed orders.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="codAvailable"
                  checked={settings.codAvailable}
                  onChange={(e) => setSettings({ ...settings, codAvailable: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF9933]"></div>
              </label>
            </div>

            {/* Threshold */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Free Delivery Threshold (₹)</label>
              <input
                type="number"
                name="freeDeliveryThreshold"
                value={settings.freeDeliveryThreshold}
                onChange={handleSettingsChange}
                required
                className="w-full max-w-xs px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]/30 focus:border-[#FF9933]"
                placeholder="299"
              />
              <span className="text-xs text-gray-500 mt-1 block">Orders below this will have a flat shipping rate of ₹49.</span>
            </div>

            {/* Contact Email */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleSettingsChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]/30 focus:border-[#FF9933]"
                placeholder="contact@parikshanotes.com"
              />
            </div>

            {/* Announcement text */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Announcement Bar Text</label>
              <textarea
                name="announcementText"
                value={settings.announcementText}
                onChange={handleSettingsChange}
                rows={2}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]/30 focus:border-[#FF9933] resize-none"
                placeholder="Announce new releases, offers, or notifications..."
              />
              <span className="text-xs text-gray-500 mt-1 block">Leave empty to hide the announcement bar at the top of the page.</span>
            </div>

            {/* Exam Categories management */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block font-bold text-gray-800">Active Exam Categories (Comma Separated)</label>
              <input
                type="text"
                name="categories"
                value={settings.categories}
                onChange={handleSettingsChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]/30 focus:border-[#FF9933]"
                placeholder="SSC, UPSC, Railway, Banking, State PSC, General"
              />
              <span className="text-xs text-gray-500 mt-1 block">These are the dynamic filters displayed on the storefront landing page and the Shop search filter list. Edit, add, or remove items to customize the filtering options.</span>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingSettings}
                className="px-6 py-2 rounded-lg bg-[#FF9933] text-white font-semibold text-sm hover:bg-[#E6882E] transition-colors disabled:opacity-50"
              >
                {savingSettings ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-base font-semibold text-gray-900">Admin Password</h2>
          <p className="text-xs text-gray-500 mt-1">
            Update the credentials used to access the administrator panel.
          </p>
        </div>

        <div className="md:col-span-2">
          <form onSubmit={updatePassword} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]/30 focus:border-[#FF9933]"
                placeholder="••••••••"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]/30 focus:border-[#FF9933]"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9933]/30 focus:border-[#FF9933]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingPassword}
                className="px-6 py-2 rounded-lg bg-[#FF9933] text-white font-semibold text-sm hover:bg-[#E6882E] transition-colors disabled:opacity-50"
              >
                {savingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
