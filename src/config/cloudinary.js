// ==============================================================================
// Cloudinary Client-Side Direct Upload Helper
// ==============================================================================

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

export const isCloudinaryConfigured = () => {
  return Boolean(
    cloudName &&
    uploadPreset &&
    !cloudName.includes('your_cloudinary_cloud_name') &&
    !uploadPreset.includes('your_unsigned_upload_preset')
  );
};

/**
 * Uploads an image file directly to Cloudinary using an unsigned upload preset.
 * 
 * @param {File} file - The file object from <input type="file" />
 * @param {Function} onProgress - Optional callback for upload progress (0 to 100)
 * @returns {Promise<{ url: string, public_id: string }>}
 */
export const uploadToCloudinary = async (file, onProgress = null) => {
  if (!isCloudinaryConfigured()) {
    console.warn('Cloudinary credentials not configured in .env. Falling back to local ObjectURL.');
    return {
      url: URL.createObjectURL(file),
      public_id: 'local_preview_' + Date.now(),
      is_fallback: true
    };
  }

  // Validate file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image size exceeds 10MB limit.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'sunnah_of_life');

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve({
            url: data.secure_url || data.url,
            public_id: data.public_id,
            width: data.width,
            height: data.height,
            format: data.format
          });
        } catch (e) {
          reject(new Error('Failed to parse Cloudinary response.'));
        }
      } else {
        try {
          const errorData = JSON.parse(xhr.responseText);
          reject(new Error(errorData.error?.message || 'Cloudinary upload failed.'));
        } catch (e) {
          reject(new Error(`Cloudinary upload failed with status ${xhr.status}.`));
        }
      }
    };

    xhr.onerror = () => reject(new Error('Network error during image upload.'));
    xhr.send(formData);
  });
};
