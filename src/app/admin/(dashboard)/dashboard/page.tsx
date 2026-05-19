'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DashboardStats {
  totalRevenue: number;
  ordersToday: number;
  pendingOrders: number;
  totalProducts: number;
}

interface RecentOrder {
  _id: string;
  orderId: string;
  customerName: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 1245000, // ₹12,450.00
    ordersToday: 5,
    pendingOrders: 3,
    totalProducts: 12,
  });

  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([
    {
      _id: '1',
      orderId: 'PN-F2E3A1',
      customerName: 'Aarav Sharma',
      totalAmount: 29900,
      paymentMethod: 'razorpay',
      paymentStatus: 'paid',
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      orderId: 'PN-D9A8E7',
      customerName: 'Neha Verma',
      totalAmount: 19900,
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      status: 'pending',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      _id: '3',
      orderId: 'PN-A7B8C9',
      customerName: 'Rajesh Gupta',
      totalAmount: 34900,
      paymentMethod: 'razorpay',
      paymentStatus: 'paid',
      status: 'confirmed',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setRecentOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
    );
    // In production, send a PATCH request to /api/admin/orders
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-display)]">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500">
          Real-time metrics, revenue, and active orders.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Revenue',
            value: `₹${(stats.totalRevenue / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
            icon: '💰',
            color: 'bg-emerald-50 text-emerald-600',
          },
          {
            title: 'Orders Today',
            value: stats.ordersToday,
            icon: '📈',
            color: 'bg-blue-50 text-blue-600',
          },
          {
            title: 'Pending Orders',
            value: stats.pendingOrders,
            icon: '⏳',
            color: 'bg-amber-50 text-amber-600',
          },
          {
            title: 'Total Products',
            value: stats.totalProducts,
            icon: '📚',
            color: 'bg-indigo-50 text-indigo-600',
          },
        ].map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block">
                {item.title}
              </span>
              <span className="text-2xl font-bold text-gray-900 mt-2 block">
                {item.value}
              </span>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${item.color}`}>
              {item.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sales Trend Chart & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
            Revenue Trend (Last 7 Days)
          </h2>
          <div className="h-64 flex items-end justify-between gap-4 pt-6">
            {/* Custom SVG line/bar chart for perfect rendering */}
            {[4500, 7200, 5100, 9300, 11000, 8500, 12450].map((val, idx) => {
              const heightPct = `${(val / 15000) * 100}%`;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full bg-orange-100 hover:bg-[#FF9933]/20 rounded-t-md transition-all relative group" style={{ height: heightPct }}>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-20">
                      ₹{val.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">Day {idx + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info panel */}
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <a
                href="/admin/products"
                className="block text-center py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                ➕ Add New Product
              </a>
              <a
                href="/admin/orders"
                className="block text-center py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                📦 View All Orders
              </a>
              <a
                href="/admin/settings"
                className="block text-center py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                ⚙️ Manage Settings
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">COD Policy</h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Currently, Cash on Delivery is enabled. You can toggle this policy in site settings.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-6">
          Recent 10 Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 font-semibold">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50/50 text-gray-700 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">{order.orderId}</td>
                  <td className="py-3.5 px-4">{order.customerName}</td>
                  <td className="py-3.5 px-4 font-mono">₹{(order.totalAmount / 100).toFixed(2)}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
                      order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {order.paymentMethod.toUpperCase()} — {order.paymentStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.orderId, e.target.value)}
                      className="px-2 py-1 rounded bg-gray-100 text-xs font-semibold text-gray-700 border-none outline-none focus:ring-1 focus:ring-[#FF9933]/50 cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <a href={`/admin/orders?id=${order.orderId}`} className="text-[#FF9933] hover:underline font-semibold text-xs">
                      Details →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
