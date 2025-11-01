import cloudinary from './cloudinary';

export async function cloudinaryDelete(public_id: string): Promise<void> {
  await cloudinary.uploader.destroy(public_id);
}
