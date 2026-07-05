"use client";

import Link from "next/link";
import { ArrowLeft, Upload, Save, Loader2 } from "lucide-react";
import { useState } from "react";
import api from "@/lib/api";
import RoleGuard from "@/components/RoleGuard";

export default function AddProductPage() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    purchasePrice: "",
    sellingPrice: "",
    stockQuantity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError("Product image is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      data.append("image", imageFile);

      const response = await api.post("/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        window.location.href = "/dashboard/products";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product");
      setLoading(false);
    }
  };

  return (
    <RoleGuard allowedRoles={["Admin", "Manager"]}>
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/products"
          className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Add New Product</h1>
          <p className="text-slate-500 mt-1">Fill in the details below to add a new product to your inventory.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 font-medium text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Form Fields */}
            <div className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Product Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                  placeholder="e.g. Logitech Wireless Mouse"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">SKU <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                    placeholder="e.g. MOU-001"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Category <span className="text-red-500">*</span></label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 appearance-none"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Storage">Storage</option>
                    <option value="Monitor">Monitor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Purchase Price <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-slate-500 sm:text-sm">৳</span>
                    </div>
                    <input
                      type="number"
                      name="purchasePrice"
                      value={formData.purchasePrice}
                      onChange={handleChange}
                      className="block w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Selling Price <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-slate-500 sm:text-sm">৳</span>
                    </div>
                    <input
                      type="number"
                      name="sellingPrice"
                      value={formData.sellingPrice}
                      onChange={handleChange}
                      className="block w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Stock Quantity <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                  placeholder="e.g. 50"
                  required
                />
              </div>

            </div>

            {/* Right Column: Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Product Image <span className="text-red-500">*</span></label>
              
              <div className="mt-2 flex justify-center rounded-2xl border border-dashed border-slate-300 px-6 py-12 bg-slate-50 hover:bg-slate-100/50 transition-colors cursor-pointer relative group overflow-hidden h-[340px]">
                
                {imagePreview ? (
                  <div className="absolute inset-0 w-full h-full">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-4" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button 
                        type="button"
                        onClick={(e) => { e.preventDefault(); document.getElementById('file-upload').click(); }}
                        className="bg-white text-slate-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-50"
                      >
                        Change
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { 
                          e.preventDefault(); 
                          setImagePreview(null); 
                          setImageFile(null); 
                          document.getElementById('file-upload').value = "";
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center flex flex-col items-center justify-center h-full">
                    <div className="p-4 bg-white rounded-full shadow-sm border border-slate-100 mb-4 text-indigo-500 group-hover:scale-110 transition-transform duration-300">
                      <Upload className="mx-auto h-8 w-8" aria-hidden="true" />
                    </div>
                    <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"
                      >
                        <span>Click to upload image</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-slate-500 mt-2">JPG, PNG, GIF up to 5MB</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-8 border-t border-slate-100 flex items-center justify-end gap-4">
            <Link 
              href="/dashboard/products"
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-sm disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
    </RoleGuard>
  );
}
