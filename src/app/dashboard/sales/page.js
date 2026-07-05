"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, ShoppingCart, RefreshCw, Save, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function CreateSalePage() {
  const router = useRouter();
  
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  
  const [saleItems, setSaleItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, custRes] = await Promise.all([
          api.get('/products?limit=100'),
          api.get('/customers?limit=100')
        ]);
        
        if (prodRes.data.success) {
          setProducts(prodRes.data.data.filter(p => p.stockQuantity > 0)); // Only show products in stock
        }
        if (custRes.data.success) {
          setCustomers(custRes.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch initial data", err);
      } finally {
        setLoadingInitial(false);
      }
    };
    fetchData();
  }, []);

  const handleAddItem = () => {
    if (!selectedProductId || quantity < 1) return;

    const product = products.find(p => p._id === selectedProductId);
    if (!product) return;

    // Check if enough stock
    if (quantity > product.stockQuantity) {
      Swal.fire({
        icon: 'warning',
        title: 'Low Stock',
        text: `Only ${product.stockQuantity} items left in stock for ${product.name}`,
        confirmButtonColor: '#4f46e5'
      });
      return;
    }

    // Check if already in cart
    const existingItemIndex = saleItems.findIndex(item => item.product._id === product._id);
    if (existingItemIndex >= 0) {
      const newItems = [...saleItems];
      const newQuantity = newItems[existingItemIndex].quantity + parseInt(quantity);
      if (newQuantity > product.stockQuantity) {
        Swal.fire({
          icon: 'warning',
          title: 'Stock Limit Exceeded',
          text: `Cannot add more. Only ${product.stockQuantity} items in stock.`,
          confirmButtonColor: '#4f46e5'
        });
        return;
      }
      newItems[existingItemIndex].quantity = newQuantity;
      newItems[existingItemIndex].subTotal = newQuantity * product.sellingPrice;
      setSaleItems(newItems);
    } else {
      setSaleItems([...saleItems, {
        product: product,
        quantity: parseInt(quantity),
        unitPrice: product.sellingPrice,
        subTotal: parseInt(quantity) * product.sellingPrice
      }]);
    }

    // Reset selection
    setSelectedProductId("");
    setQuantity(1);
  };

  const handleRemoveItem = (productId) => {
    setSaleItems(saleItems.filter(item => item.product._id !== productId));
  };

  const handleQuantityChange = (productId, delta) => {
    setSaleItems(saleItems.map(item => {
      if (item.product._id === productId) {
        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) return item;
        if (newQuantity > item.product.stockQuantity) {
          Swal.fire({
            icon: 'warning',
            title: 'Maximum Stock',
            text: `You have reached the maximum available stock for this item.`,
            confirmButtonColor: '#4f46e5',
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false
          });
          return item;
        }
        return {
          ...item,
          quantity: newQuantity,
          subTotal: newQuantity * item.unitPrice
        };
      }
      return item;
    }));
  };

  const handleReset = () => {
    setSaleItems([]);
    setSelectedCustomerId("");
    setError("");
  };

  const handleCompleteSale = async () => {
    if (saleItems.length === 0) {
      setError("Please add at least one item to the cart.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const payload = {
        customerId: selectedCustomerId || null, // null for walk-in
        items: saleItems.map(item => ({
          productId: item.product._id,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subTotal: item.subTotal
        })),
        totalAmount: grandTotal
      };

      const response = await api.post('/sales', payload);
      if (response.data.success) {
        // Redirect to invoice page
        router.push(`/dashboard/sales-history/${response.data.data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to complete sale");
      setSubmitting(false);
    }
  };

  const grandTotal = saleItems.reduce((sum, item) => sum + item.subTotal, 0);

  if (loadingInitial) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 flex flex-col h-full max-w-6xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Sale</h1>
        <p className="text-slate-500 mt-1">Record a new transaction and generate an invoice.</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 font-medium text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Form & Table (Takes up 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Add Item Card */}
          <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Select Products</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-6 space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Product <span className="text-red-500">*</span></label>
                <select 
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 appearance-none"
                >
                  <option value="">Select a product...</option>
                  {products.map(p => (
                    <option key={p._id} value={p._id}>
                      {p.name} - ৳{p.sellingPrice} ({p.stockQuantity} in stock)
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-3 space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Quantity <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                />
              </div>
              <div className="sm:col-span-3">
                <button
                  type="button"
                  onClick={handleAddItem}
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
                    <tr key={item.product._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{item.product.name}</td>
                      <td className="px-6 py-4 text-right text-slate-600">৳{item.unitPrice.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center bg-slate-50 border border-slate-200 rounded-lg">
                          <button onClick={() => handleQuantityChange(item.product._id, -1)} className="px-3 py-1 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-l-lg transition-colors">-</button>
                          <span className="px-3 py-1 font-semibold text-slate-900 min-w-[2rem] text-center">{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.product._id, 1)} className="px-3 py-1 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-r-lg transition-colors">+</button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">৳{item.subTotal.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => handleRemoveItem(item.product._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove">
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
                <select 
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 appearance-none"
                >
                  <option value="">Walk-in Customer</option>
                  {customers.map(c => (
                    <option key={c._id} value={c._id}>{c.name} ({c.phone})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Date</label>
                <input
                  type="date"
                  disabled
                  value={new Date().toISOString().split('T')[0]}
                  className="block w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 focus:outline-none transition-all duration-200"
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
                <span className="font-medium text-slate-900">৳{grandTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Tax (0%)</span>
                <span className="font-medium text-slate-900">৳0</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Discount</span>
                <span className="font-medium text-red-600">-৳0</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-base font-bold text-slate-900">Grand Total</span>
                <span className="text-2xl font-bold text-indigo-600">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleCompleteSale}
                disabled={submitting || saleItems.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] disabled:opacity-70 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {submitting ? "Processing..." : "Complete Sale"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 px-4 py-3 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 disabled:opacity-70"
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
