"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Plus, Filter, Edit, Trash2, Eye, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

export default function ProductsPage() {
  const { user } = useAuth();
  const isAdminOrManager = user?.role === "Admin" || user?.role === "Manager";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProducts = async (currentPage = page, currentSearch = search) => {
    setLoading(true);
    try {
      const response = await api.get('/products', {
        params: {
          page: currentPage,
          limit: 10,
          search: currentSearch
        }
      });
      if (response.data.success) {
        setProducts(response.data.data);
        setTotalPages(response.data.meta.totalPages);
        setTotalItems(response.data.meta.total);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (page !== 1) {
        setPage(1);
      } else {
        fetchProducts(1, search);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchProducts(page, search);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (page !== 1) {
      setPage(1);
    } else {
      fetchProducts(1, search);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this product deletion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await api.delete(`/products/${id}`);
        if (response.data.success) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Product has been deleted.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          fetchProducts();
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response?.data?.message || "Failed to delete product",
        });
      }
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Products</h1>
          <p className="text-slate-500 mt-1">Manage your inventory and product catalog.</p>
        </div>
        
        {isAdminOrManager && (
          <Link 
            href="/dashboard/products/add" 
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </Link>
        )}
      </div>

      {/* Filters & Table Card */}
      <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col flex-1 overflow-hidden">
        
        {/* Filters Bar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <form onSubmit={handleSearch} className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm"
              placeholder="Search products by name, SKU..."
            />
          </form>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button onClick={handleSearch} className="bg-slate-100 px-4 py-2.5 rounded-xl font-medium text-slate-700 hover:bg-slate-200">
              Search
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1 relative min-h-[300px]">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
               <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : null}
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">SKU</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Buy Price</th>
                <th className="px-6 py-4 font-semibold">Sell Price</th>
                <th className="px-6 py-4 font-semibold text-center">Stock</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.length === 0 && !loading && (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-slate-500">
                    No products found. Add a new product to get started.
                  </td>
                </tr>
              )}
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0">
                        <img src={`http://localhost:5000${product.productImage}`} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="font-medium text-slate-900 max-w-[200px] truncate" title={product.name}>{product.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{product.sku}</td>
                  <td className="px-6 py-4 text-slate-500">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">৳{product.purchasePrice}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">৳{product.sellingPrice}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-slate-700">{product.stockQuantity}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                      product.stockQuantity > 5 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {product.stockQuantity > 5 ? 'In Stock' : 'Low Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {isAdminOrManager && (
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/dashboard/products/edit/${product._id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(product._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Total <span className="font-medium text-slate-900">{totalItems}</span> products
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-slate-700 px-2">Page {page} of {totalPages || 1}</span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
