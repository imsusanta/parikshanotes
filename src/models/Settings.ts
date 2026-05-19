import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettings extends Document {
  codAvailable: boolean;
  freeDeliveryThreshold: number; // paise
  contactEmail: string;
  announcementText: string;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    codAvailable: { type: Boolean, default: true },
    freeDeliveryThreshold: { type: Number, default: 29900 }, // ₹299 in paise
    contactEmail: { type: String, default: 'contact@pariksha notes.com' },
    announcementText: { type: String, default: '🚀 New SSC CGL 2026 Notes Available — Download Now!' },
  },
  {
    timestamps: true,
  }
);

const Settings: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
