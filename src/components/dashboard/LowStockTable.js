import Link from "next/link";
import { ArrowRight } from "lucide-react";

const lowStockData = [
  { id: 1, product: "Wireless Mouse", sku: "MS-001", stock: 2, status: "Low Stock" },
  { id: 2, product: "Keyboard", sku: "KB-002", stock: 1, status: "Low Stock" },
  { id: 3, product: "SSD 256GB", sku: "SSD-256", stock: 4, status: "Low Stock" },
  { id: 4, product: "USB Cable", sku: "USB-017", stock: 3, status: "Low Stock" },
];

export default function LowStockTable() {
  return (
    <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">Low Stock Products</h3>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
            <tr>
              <th className="px-4 py-3 font-semibold rounded-l-lg">Product</th>
              <th className="px-4 py-3 font-semibold">SKU</th>
              <th className="px-4 py-3 font-semibold text-center">Stock</th>
              <th className="px-4 py-3 font-semibold text-right rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {lowStockData.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-4 font-medium text-slate-900">{item.product}</td>
                <td className="px-4 py-4 text-slate-500">{item.sku}</td>
                <td className="px-4 py-4 text-center font-bold text-slate-900">{item.stock}</td>
                <td className="px-4 py-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-100 text-center">
        <Link href="/dashboard/products" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
          View all low stock products
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
