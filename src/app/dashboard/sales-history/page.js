"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, Eye, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import api from "@/lib/api";

export default function SalesHistoryPage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/sales?page=${page}&limit=10&search=${search}`);
      if (response.data.success) {
        setSales(response.data.data);
        setTotalPages(response.data.meta.totalPages);
        setTotalItems(response.data.meta.total);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch sales history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchSales();
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sales History</h1>
          <p className="text-slate-500 mt-1">View and manage all past transactions and invoices.</p>
        </div>
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
              placeholder="Search by Invoice No..."
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
                <th className="px-6 py-4 font-semibold">Invoice No</th>
                <th className="px-6 py-4 font-semibold">Customer Name</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Total Amount</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sales.length === 0 && !loading && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    No sales found.
                  </td>
                </tr>
              )}
              {sales.map((sale) => (
                <tr key={sale._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                      {sale.invoiceNo}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{sale.customer ? sale.customer.name : 'Walk-in Customer'}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(sale.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border bg-emerald-50 text-emerald-600 border-emerald-100">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 text-right">৳{sale.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/sales-history/${sale._id}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1.5 font-medium text-xs border border-indigo-100">
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </Link>
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
            Total <span className="font-medium text-slate-900">{totalItems}</span> sales
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
