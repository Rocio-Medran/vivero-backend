import cloudinary from './cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import stream from 'stream';

export interface CloudinaryUploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  resource_type: string;
  format?: string;
  bytes?: number;
}

export function uploadBufferToCloudinary(buffer: Buffer, folder: string): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const passthrough = new stream.PassThrough();
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Cloudinary result vacío'));
        resolve({
          url: result.url,
          secure_url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type,
            format: result.format,
            bytes: result.bytes
        });
      }
    );
    passthrough.end(buffer);
    passthrough.pipe(uploadStream);
  });
}
