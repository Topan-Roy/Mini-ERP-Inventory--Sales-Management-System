"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import api from "@/lib/api";
import RoleGuard from "@/components/RoleGuard";
import Swal from "sweetalert2";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/customers?page=${page}&limit=10&search=${search}`);
      if (response.data.success) {
        setCustomers(response.data.data);
        setTotalPages(response.data.meta.totalPages);
        setTotalItems(response.data.meta.total);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCustomers();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this customer deletion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await api.delete(`/customers/${id}`);
        if (response.data.success) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Customer has been deleted.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          fetchCustomers();
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response?.data?.message || "Failed to delete customer",
        });
      }
    }
  };

  return (
    <RoleGuard allowedRoles={["Admin", "Manager"]}>
    <div className="space-y-6 flex flex-col h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customers</h1>
          <p className="text-slate-500 mt-1">Manage your customer database and purchase history.</p>
        </div>
        
        <Link 
          href="/dashboard/customers/add" 
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="w-5 h-5" />
          Add Customer
        </Link>
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
              placeholder="Search by name, phone or email..."
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
                <th className="px-6 py-4 font-semibold">Customer Name</th>
                <th className="px-6 py-4 font-semibold">Phone Number</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Address</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.length === 0 && !loading && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    No customers found. Add a new customer to get started.
                  </td>
                </tr>
              )}
              {customers.map((customer) => (
                <tr key={customer._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-indigo-100 flex-shrink-0 flex items-center justify-center border border-indigo-200">
                        <span className="text-indigo-700 font-bold text-sm">
                          {customer.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="font-medium text-slate-900">{customer.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{customer.phone}</td>
                  <td className="px-6 py-4 text-slate-500">{customer.email || 'N/A'}</td>
                  <td className="px-6 py-4 text-slate-500 max-w-[200px] truncate" title={customer.address}>{customer.address || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/dashboard/customers/edit/${customer._id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(customer._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Total <span className="font-medium text-slate-900">{totalItems}</span> customers
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
    </RoleGuard>
  );
}
