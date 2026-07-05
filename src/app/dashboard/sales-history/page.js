import Link from "next/link";
import { Search, Filter, Eye, ChevronLeft, ChevronRight, MoreHorizontal, Calendar } from "lucide-react";

// Mock Data
const salesHistory = [
  { id: 1, invoice: "INV-001", customer: "Rahim Uddin", total: "৳1,950", date: "01 Jul 2025", createdBy: "Admin", status: "Completed" },
  { id: 2, invoice: "INV-002", customer: "Karim Hossain", total: "৳2,450", date: "01 Jul 2025", createdBy: "Manager", status: "Completed" },
  { id: 3, invoice: "INV-003", customer: "Jamal Khan", total: "৳3,750", date: "30 Jun 2025", createdBy: "Admin", status: "Completed" },
  { id: 4, invoice: "INV-004", customer: "Rifat Ahmed", total: "৳1,200", date: "29 Jun 2025", createdBy: "Employee", status: "Completed" },
  { id: 5, invoice: "INV-005", customer: "Imran Hossain", total: "৳2,600", date: "28 Jun 2025", createdBy: "Admin", status: "Refunded" },
];

export default function SalesHistoryPage() {
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
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm"
              placeholder="Search by Invoice No. or Customer..."
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
              <input 
                type="date"
                className="appearance-none w-full bg-white border border-slate-200 text-slate-700 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm font-medium"
              />
            </div>
            <div className="relative flex-1 sm:flex-none">
              <select className="appearance-none w-full bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm font-medium">
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="refunded">Refunded</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <Filter className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-semibold">Invoice No</th>
                <th className="px-6 py-4 font-semibold">Customer Name</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Created By</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Total Amount</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {salesHistory.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                      {sale.invoice}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{sale.customer}</td>
                  <td className="px-6 py-4 text-slate-500">{sale.date}</td>
                  <td className="px-6 py-4 text-slate-500">{sale.createdBy}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                      sale.status === 'Completed' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 text-right">{sale.total}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/sales-history/${sale.invoice}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1.5 font-medium text-xs border border-indigo-100">
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
            Showing <span className="font-medium text-slate-900">1</span> to <span className="font-medium text-slate-900">5</span> of <span className="font-medium text-slate-900">120</span> sales
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-medium flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium flex items-center justify-center">2</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium flex items-center justify-center">3</button>
            <span className="text-slate-400 px-1"><MoreHorizontal className="w-4 h-4" /></span>
            <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium flex items-center justify-center">24</button>
            <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
