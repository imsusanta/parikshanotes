'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number; // paise
  lastOrderDate: string;
}

interface OrderSummary {
  orderId: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      _id: 'c1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@gmail.com',
      phone: '9876543210',
      totalOrders: 3,
      totalSpent: 84700, // ₹847.00
      lastOrderDate: new Date().toISOString(),
    },
    {
      _id: 'c2',
      name: 'Neha Verma',
      email: 'neha.verma@yahoo.com',
      phone: '9812345678',
      totalOrders: 1,
      totalSpent: 19900, // ₹199.00
      lastOrderDate: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      _id: 'c3',
      name: 'Rajesh Gupta',
      email: 'rajesh.g@rediffmail.com',
      phone: '9765432109',
      totalOrders: 2,
      totalSpent: 59800, // ₹598.00
      lastOrderDate: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerOrders, setCustomerOrders] = useState<OrderSummary[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setLoadingOrders(true);

    // Simulate database lookup of orders for selected customer email/ID
    setTimeout(() => {
      setCustomerOrders([
        {
          orderId: 'PN-F2E3A1',
          totalAmount: 29900,
          paymentMethod: 'razorpay',
          status: 'pending',
          createdAt: customer.lastOrderDate,
        },
        ...(customer.totalOrders > 1
          ? [
              {
                orderId: 'PN-B4A5C6',
                totalAmount: 24900,
                paymentMethod: 'razorpay',
                status: 'delivered',
                createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
              },
            ]
          : []),
      ]);
      setLoadingOrders(false);
    }, 500);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-display)]">
          Customers List
        </h1>
        <p className="text-sm text-gray-500">
          View customer contacts, order counts, and lifetime value.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer Table */}
        <div className={`p-6 bg-white border border-gray-200 rounded-2xl shadow-sm lg:col-span-${selectedCustomer ? '2' : '3'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 font-semibold">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4 text-center">Orders</th>
                  <th className="py-3 px-4">Spent</th>
                  <th className="py-3 px-4">Last Order</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer._id}
                    onClick={() => handleRowClick(customer)}
                    className={`border-b border-gray-50 hover:bg-gray-50/50 text-gray-700 transition-colors cursor-pointer ${
                      selectedCustomer?._id === customer._id ? 'bg-[#FF9933]/5 hover:bg-[#FF9933]/5' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-semibold text-gray-900">{customer.name}</td>
                    <td className="py-3.5 px-4 font-mono text-xs">{customer.email}</td>
                    <td className="py-3.5 px-4 font-mono text-xs">{customer.phone}</td>
                    <td className="py-3.5 px-4 text-center font-mono">{customer.totalOrders}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold">₹{(customer.totalSpent / 100).toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-500">
                      {new Date(customer.lastOrderDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Drill Down Detail */}
        <AnimatePresence>
          {selectedCustomer && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="lg:col-span-1 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col h-fit"
            >
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Customer Detail</h3>
                  <h2 className="text-lg font-bold text-gray-900 mt-1">{selectedCustomer.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-semibold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-3 text-sm">
                <div>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Email Address</span>
                  <span className="text-gray-900 font-mono text-xs">{selectedCustomer.email}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Phone Number</span>
                  <span className="text-gray-900 font-mono text-xs">{selectedCustomer.phone}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Total Orders</span>
                    <span className="text-lg font-bold text-gray-900 mt-0.5 block">{selectedCustomer.totalOrders}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Total Spent</span>
                    <span className="text-lg font-bold text-gray-900 mt-0.5 block">₹{(selectedCustomer.totalSpent / 100).toFixed(0)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4 flex-1">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Order History</h4>
                {loadingOrders ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-5 h-5 border-2 border-[#FF9933] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {customerOrders.map((order) => (
                      <div key={order.orderId} className="flex justify-between items-center p-3 rounded-xl border border-gray-100 text-xs">
                        <div>
                          <p className="font-mono font-bold text-gray-900">{order.orderId}</p>
                          <p className="text-gray-400 mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 font-mono">₹{(order.totalAmount / 100).toFixed(2)}</p>
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold mt-1 uppercase ${
                            order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
