import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, AlertCircle, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadToCloudinary, isCloudinaryConfigured } from '../../config/cloudinary';

const CloudinaryUpload = ({ onUploadSuccess, label = 'Attach Screenshot or Image (Optional)' }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset previous states
    setError(null);
    setProgress(0);

    // Create local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      setUploading(true);
      const result = await uploadToCloudinary(file, (p) => setProgress(p));
      setUploadedUrl(result.url);
      if (onUploadSuccess) {
        onUploadSuccess(result.url);
      }
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      setError(err.message || 'Failed to upload image to Cloudinary.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setUploadedUrl(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onUploadSuccess) onUploadSuccess('');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
          {label}
        </label>
        
        {!isCloudinaryConfigured() && (
          <span className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded font-mono font-bold">
            Cloudinary: Using Local Preview
          </span>
        )}
      </div>

      {!preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl p-5 text-center cursor-pointer transition bg-slate-50/50 dark:bg-slate-900/40 hover:bg-emerald-50/20"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/png, image/jpeg, image/webp, image/gif"
            className="hidden"
          />
          <UploadCloud className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Click to upload an image or screenshot
          </p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
            PNG, JPG, WEBP up to 10MB
          </p>
        </div>
      ) : (
        <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 flex items-center gap-4">
          <img
            src={preview}
            alt="Upload Preview"
            className="w-16 h-16 rounded-xl object-cover border border-slate-100 dark:border-slate-800 shrink-0"
          />

          <div className="flex-1 min-w-0">
            {uploading ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span className="flex items-center gap-1">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading to Cloudinary...
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-200 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : uploadedUrl ? (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Image Uploaded Successfully!
                </div>
                <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                  {uploadedUrl}
                </p>
              </div>
            ) : error ? (
              <div className="text-xs text-red-600 flex items-center gap-1 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
