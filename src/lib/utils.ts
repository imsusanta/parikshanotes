/**
 * Generate URL-friendly slug from text
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Format price from paise to INR display string
 * e.g., 29900 → "₹299.00"
 */
export function formatPrice(paise: number): string {
  return `₹${(paise / 100).toFixed(0)}`;
}

/**
 * Generate unique order ID: PN-XXXXXX
 */
export function generateOrderId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'PN-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Consistent API response shape
 */
export function apiResponse(
  success: boolean,
  message: string,
  data?: unknown,
  error?: string
) {
  return {
    success,
    message,
    ...(data !== undefined && { data }),
    ...(error && { error }),
  };
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Exam categories constant
 */
export const EXAM_CATEGORIES = [
  'SSC',
  'UPSC',
  'Railway',
  'Banking',
  'State PSC',
  'General',
] as const;

export type ExamCategory = (typeof EXAM_CATEGORIES)[number];

/**
 * Order statuses
 */
export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

/**
 * Product formats
 */
export const PRODUCT_FORMATS = ['PDF', 'Printed', 'Both'] as const;
export type ProductFormat = (typeof PRODUCT_FORMATS)[number];
