"use client";

import { useState } from "react";
import { Plus, Trash2, ShoppingCart, RefreshCw, Save } from "lucide-react";

export default function CreateSalePage() {
  const [saleItems, setSaleItems] = useState([
    { id: 1, product: "Logitech Wireless Mouse", price: 65, quantity: 2, subTotal: 130 },
  ]);

  return (
    <div className="space-y-6 flex flex-col h-full max-w-6xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Sale</h1>
        <p className="text-slate-500 mt-1">Record a new transaction and generate an invoice.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Form & Table (Takes up 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Add Item Card */}
          <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Select Products</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-6 space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Product <span className="text-red-500">*</span></label>
                <select className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 appearance-none">
                  <option value="">Select a product...</option>
                  <option value="1">Logitech Wireless Mouse ($65.00)</option>
                  <option value="2">HP Mechanical Keyboard ($90.00)</option>
                  <option value="3">Kingston SSD 256GB ($42.00)</option>
                </select>
              </div>
              <div className="sm:col-span-3 space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Quantity <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                />
              </div>
              <div className="sm:col-span-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 rounded-xl font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Cart Table Card */}
          <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-indigo-600" />
                Sale Items
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50/80">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Product Name</th>
                    <th className="px-6 py-4 font-semibold text-right">Unit Price</th>
                    <th className="px-6 py-4 font-semibold text-center">Quantity</th>
                    <th className="px-6 py-4 font-semibold text-right">Sub Total</th>
                    <th className="px-6 py-4 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {saleItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{item.product}</td>
                      <td className="px-6 py-4 text-right text-slate-600">${item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center bg-slate-50 border border-slate-200 rounded-lg">
                          <button className="px-3 py-1 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-l-lg transition-colors">-</button>
                          <span className="px-3 py-1 font-semibold text-slate-900 min-w-[2rem] text-center">{item.quantity}</span>
                          <button className="px-3 py-1 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-r-lg transition-colors">+</button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">${item.subTotal.toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {saleItems.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                        No items added yet. Please add products to the cart.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Customer & Summary (Takes up 1/3) */}
        <div className="space-y-6">
          
          {/* Customer Selection Card */}
          <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Customer Details</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Select Customer <span className="text-red-500">*</span></label>
                <select className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 appearance-none">
                  <option value="">Walk-in Customer</option>
                  <option value="1">Rahim Uddin</option>
                  <option value="2">Karim Hossain</option>
                  <option value="3">Jamal Khan</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Date</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between items-center text-slate-600">
                <span>Subtotal ({saleItems.length} items)</span>
                <span className="font-medium text-slate-900">$130.00</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Tax (0%)</span>
                <span className="font-medium text-slate-900">$0.00</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Discount</span>
                <span className="font-medium text-red-600">-$0.00</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-base font-bold text-slate-900">Grand Total</span>
                <span className="text-2xl font-bold text-indigo-600">$130.00</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Save className="w-5 h-5" />
                Complete Sale
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 px-4 py-3 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Order
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
