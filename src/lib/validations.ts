import { z } from 'zod';

// Product validation
export const productSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  slug: z.string().min(3).max(200),
  examCategory: z.enum(['SSC', 'UPSC', 'Railway', 'Banking', 'State PSC', 'General']),
  subject: z.string().min(2, 'Subject is required').max(100),
  format: z.enum(['PDF', 'Printed', 'Both']),
  price: z.number().int().positive('Price must be a positive number'),
  originalPrice: z.number().int().positive().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  coverImage: z.string().url('Invalid cover image URL'),
  pdfUrl: z.string().url().optional().nullable(),
  previewImages: z.array(z.string().url()).max(3).default([]),
  inStock: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;

// Checkout validation — PDF order
export const pdfCheckoutSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  items: z.array(
    z.object({
      productId: z.string(),
      title: z.string(),
      format: z.string(),
      price: z.number().int().positive(),
      quantity: z.number().int().positive().default(1),
    })
  ).min(1, 'At least one item is required'),
});

// Checkout validation — Printed order
export const printedCheckoutSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  address: z.object({
    line1: z.string().min(5, 'Address is required').max(200),
    city: z.string().min(2, 'City is required').max(100),
    state: z.string().min(2, 'State is required').max(100),
    pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode'),
  }),
  items: z.array(
    z.object({
      productId: z.string(),
      title: z.string(),
      format: z.string(),
      price: z.number().int().positive(),
      quantity: z.number().int().positive(),
    })
  ).min(1, 'At least one item is required'),
  paymentMethod: z.enum(['razorpay', 'cod']),
});

// Payment verification
export const paymentVerifySchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  orderId: z.string(),
});

// Order tracking
export const trackOrderSchema = z.object({
  query: z.string().min(3, 'Enter Order ID or Email'),
});

// Settings validation
export const settingsSchema = z.object({
  codAvailable: z.boolean().optional(),
  freeDeliveryThreshold: z.number().int().positive().optional(),
  contactEmail: z.string().email().optional(),
  announcementText: z.string().max(200).optional(),
});

// Admin login
export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
