import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  slug: string;
  examCategory: string;
  subject: string;
  format: 'PDF' | 'Printed' | 'Both';
  price: number; // in paise
  originalPrice?: number; // in paise
  description: string;
  coverImage: string;
  pdfUrl?: string;
  previewImages: string[];
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    examCategory: {
      type: String,
      required: true,
      enum: ['SSC', 'UPSC', 'Railway', 'Banking', 'State PSC', 'General'],
    },
    subject: { type: String, required: true, trim: true },
    format: {
      type: String,
      required: true,
      enum: ['PDF', 'Printed', 'Both'],
    },
    price: { type: Number, required: true }, // stored in paise
    originalPrice: { type: Number },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    pdfUrl: { type: String },
    previewImages: [{ type: String }],
    inStock: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ examCategory: 1, subject: 1 });
ProductSchema.index({ slug: 1 });
ProductSchema.index({ price: 1 });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
