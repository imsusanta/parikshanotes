import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: string, folder: string = 'pariksha-notes/images'): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: 'image',
    transformation: [
      { width: 800, height: 1100, crop: 'limit' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  });
  return { url: result.secure_url, publicId: result.public_id };
}

export async function uploadPDF(file: string, folder: string = 'pariksha-notes/pdfs'): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: 'raw',
    access_mode: 'authenticated',
  });
  return { url: result.secure_url, publicId: result.public_id };
}

export async function deleteAsset(publicId: string, resourceType: 'image' | 'raw' = 'image'): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export function getSignedUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    sign_url: true,
    resource_type: 'raw',
    type: 'authenticated',
    expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour
  });
}

export default cloudinary;
