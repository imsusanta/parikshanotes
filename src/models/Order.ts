import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
  productId: string;
  title: string;
  format: string;
  price: number; // paise
  quantity: number;
}

export interface IAddress {
  line1: string;
  city: string;
  state: string;
  pincode: string;
}

export interface IOrder extends Document {
  orderId: string; // PN-XXXXXX
  customerName: string;
  email: string;
  phone?: string;
  address?: IAddress;
  items: IOrderItem[];
  totalAmount: number; // paise
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  orderType: 'pdf' | 'printed' | 'mixed';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  downloadToken?: string;
  downloadExpiry?: Date;
  downloadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: String, required: true },
    title: { type: String, required: true },
    format: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

const AddressSchema = new Schema<IAddress>(
  {
    line1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: AddressSchema },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['razorpay', 'cod'],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    orderType: {
      type: String,
      required: true,
      enum: ['pdf', 'printed', 'mixed'],
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    trackingNumber: { type: String },
    downloadToken: { type: String },
    downloadExpiry: { type: Date },
    downloadCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({ orderId: 1 });
OrderSchema.index({ email: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
