import Link from "next/link";
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

// Mock Data
const customers = [
  { id: 1, name: "Rahim Uddin", phone: "01711-111111", email: "rahim@gmail.com", address: "Dhaka", totalPurchase: "৳15,450" },
  { id: 2, name: "Karim Hossain", phone: "01822-222222", email: "karim@gmail.com", address: "Chittagong", totalPurchase: "৳8,200" },
  { id: 3, name: "Jamal Khan", phone: "01733-333333", email: "jamal@gmail.com", address: "Sylhet", totalPurchase: "৳12,050" },
  { id: 4, name: "Rifat Ahmed", phone: "01644-444444", email: "rifat@gmail.com", address: "Khulna", totalPurchase: "৳3,600" },
  { id: 5, name: "Imran Hossain", phone: "01955-555555", email: "imran@gmail.com", address: "Rajshahi", totalPurchase: "৳21,900" },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customers</h1>
          <p className="text-slate-500 mt-1">Manage your customer relationships and history.</p>
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
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm"
              placeholder="Search customers by name, phone or email..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer Name</th>
                <th className="px-6 py-4 font-semibold">Phone Number</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Address</th>
                <th className="px-6 py-4 font-semibold">Total Purchase</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600 font-bold border border-indigo-100">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="font-medium text-slate-900">{customer.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{customer.phone}</td>
                  <td className="px-6 py-4 text-slate-500">{customer.email}</td>
                  <td className="px-6 py-4 text-slate-500">{customer.address}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{customer.totalPurchase}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/dashboard/customers/edit/${customer.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
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
            Showing <span className="font-medium text-slate-900">1</span> to <span className="font-medium text-slate-900">5</span> of <span className="font-medium text-slate-900">85</span> customers
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-medium flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium flex items-center justify-center">2</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium flex items-center justify-center">3</button>
            <span className="text-slate-400 px-1"><MoreHorizontal className="w-4 h-4" /></span>
            <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium flex items-center justify-center">17</button>
            <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
