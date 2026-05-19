'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface OrderItem {
  productId: string;
  title: string;
  format: string;
  price: number; // paise
  quantity: number;
}

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address?: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  totalAmount: number; // paise
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderType: 'pdf' | 'printed' | 'mixed';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  createdAt: string;
}

const DEMO_ORDERS: Order[] = [
  {
    _id: 'o1',
    orderId: 'PN-F2E3A1',
    customerName: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    phone: '9876543210',
    totalAmount: 29900,
    paymentMethod: 'razorpay',
    paymentStatus: 'paid',
    orderType: 'mixed',
    status: 'pending',
    createdAt: new Date().toISOString(),
    items: [
      { productId: '1', title: 'SSC CGL Complete Maths Notes', format: 'Both', price: 29900, quantity: 1 }
    ],
    address: {
      line1: 'House 123, Sector 4',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001'
    }
  },
  {
    _id: 'o2',
    orderId: 'PN-D9A8E7',
    customerName: 'Neha Verma',
    email: 'neha.verma@yahoo.com',
    phone: '9812345678',
    totalAmount: 19900,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderType: 'printed',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    items: [
      { productId: '2', title: 'UPSC Prelims Indian Polity', format: 'Printed', price: 19900, quantity: 1 }
    ],
    address: {
      line1: '45, VIP Road',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226001'
    }
  },
  {
    _id: 'o3',
    orderId: 'PN-A7B8C9',
    customerName: 'Rajesh Gupta',
    email: 'rajesh.g@rediffmail.com',
    phone: '9765432109',
    totalAmount: 34900,
    paymentMethod: 'razorpay',
    paymentStatus: 'paid',
    orderType: 'pdf',
    status: 'delivered',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    items: [
      { productId: '3', title: 'Railway Group D GK + GS', format: 'PDF', price: 34900, quantity: 1 }
    ]
  }
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(DEMO_ORDERS);
  const [selectedTab, setSelectedTab] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState('');

  const filteredOrders = selectedTab === 'All'
    ? orders
    : orders.filter(o => o.status.toLowerCase() === selectedTab.toLowerCase());

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder?.orderId === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
    toast.success(`Order status updated to ${newStatus.toUpperCase()}`);
  };

  const handleSaveTracking = (orderId: string) => {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, trackingNumber: trackingInput } : o));
    if (selectedOrder?.orderId === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, trackingNumber: trackingInput } : null);
    }
    toast.success('Tracking number saved');
    setTrackingInput('');
  };

  const resendDownloadLink = (email: string) => {
    toast.success(`Download link resent to ${email}`);
  };

  const exportToCSV = () => {
    const headers = ['Order ID', 'Customer', 'Email', 'Amount', 'Type', 'Status', 'Date'];
    const rows = orders.map(o => [
      o.orderId,
      o.customerName,
      o.email,
      `₹${(o.totalAmount / 100).toFixed(2)}`,
      o.orderType.toUpperCase(),
      o.status.toUpperCase(),
      new Date(o.createdAt).toLocaleDateString('en-IN')
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ParikshaNotes_Orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Orders exported successfully');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-display)]">
            Orders List
          </h1>
          <p className="text-sm text-gray-500">
            Track customer payments, download links, and dispatch states.
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-[#FF9933] text-white font-semibold text-sm rounded-xl hover:bg-[#E6882E] transition-colors flex items-center gap-2 shadow-sm"
        >
          📥 Export to CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto border-b border-gray-200 pb-1.5 scrollbar-hide">
        {['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 font-medium text-sm rounded-lg whitespace-nowrap transition-colors ${
              selectedTab === tab
                ? 'bg-[#FF9933]/15 text-[#FF9933]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 font-semibold">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => setSelectedOrder(order)}
                  className="border-b border-gray-50 hover:bg-gray-50/50 text-gray-700 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">{order.orderId}</td>
                  <td className="py-3.5 px-4">{order.customerName}</td>
                  <td className="py-3.5 px-4 max-w-[200px] truncate">
                    {order.items.map(item => `${item.title} (x${item.quantity})`).join(', ')}
                  </td>
                  <td className="py-3.5 px-4 font-mono">₹{(order.totalAmount / 100).toFixed(2)}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      order.orderType === 'pdf' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                      {order.orderType.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 text-gray-900 border border-gray-100"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">
                    Order details: {selectedOrder.orderId}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-semibold p-1"
                >
                  ✕
                </button>
              </div>

              {/* Status Update Controls */}
              <div className="p-4 bg-gray-50 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1 block">Update Status</label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateStatus(selectedOrder.orderId, e.target.value as Order['status'])}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                {selectedOrder.orderType !== 'pdf' && (
                  <div>
                    <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1 block">Tracking Reference</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add Tracking ID"
                        value={trackingInput || selectedOrder.trackingNumber || ''}
                        onChange={(e) => setTrackingInput(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                      <button
                        onClick={() => handleSaveTracking(selectedOrder.orderId)}
                        className="px-3 py-2 bg-gray-900 text-white font-semibold text-xs rounded-lg hover:bg-gray-800"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
                {selectedOrder.orderType === 'pdf' && (
                  <div className="flex items-end">
                    <button
                      onClick={() => resendDownloadLink(selectedOrder.email)}
                      className="w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs rounded-lg transition-colors"
                    >
                      📧 Resend Download Link
                    </button>
                  </div>
                )}
              </div>

              {/* Customer details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customer Info</h3>
                  <p className="font-bold text-gray-850">{selectedOrder.customerName}</p>
                  <p className="text-gray-500 font-mono text-xs mt-0.5">{selectedOrder.email}</p>
                  <p className="text-gray-500 font-mono text-xs mt-0.5">{selectedOrder.phone}</p>
                </div>
                {selectedOrder.address && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedOrder.address.line1}<br />
                      {selectedOrder.address.city}, {selectedOrder.address.state}<br />
                      Pincode: <strong>{selectedOrder.address.pincode}</strong>
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Summary */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Items Ordered</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 p-3 rounded-lg border border-gray-50 text-xs">
                      <div className="w-12 h-16 rounded bg-gray-50 flex items-center justify-center text-xl">📚</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{item.title}</p>
                        <span className="inline-block text-[9px] px-1 py-0.5 rounded bg-gray-100 text-gray-600 mt-1">{item.format}</span>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-gray-400">Qty: {item.quantity}</p>
                          <p className="font-bold text-gray-900 font-mono">₹{(item.price * item.quantity / 100).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer pricing */}
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider block">Payment Method</span>
                  <span className="text-xs font-semibold text-gray-700 uppercase mt-0.5 block">
                    {selectedOrder.paymentMethod} — {selectedOrder.paymentStatus}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 uppercase tracking-wider block">Grand Total</span>
                  <span className="text-xl font-bold text-gray-900 font-[family-name:var(--font-mono)] mt-0.5 block">
                    ₹{(selectedOrder.totalAmount / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
