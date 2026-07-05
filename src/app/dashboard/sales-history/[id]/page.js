"use client";

import Link from "next/link";
import { ArrowLeft, Printer, Download, ShieldCheck, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function SaleDetailsPage() {
  const params = useParams();
  const invoiceId = params?.id;

  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await api.get(`/sales/${invoiceId}`);
        if (response.data.success) {
          setSale(response.data.data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch invoice details");
      } finally {
        setLoading(false);
      }
    };
    if (invoiceId) fetchSale();
  }, [invoiceId]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !sale) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 font-medium">
          {error || "Invoice not found"}
        </div>
      </div>
    );
  }

  const customerName = sale.customer ? sale.customer.name : "Walk-in Customer";
  const customerEmail = sale.customer?.email || "N/A";
  const customerPhone = sale.customer?.phone || "N/A";
  const customerAddress = sale.customer?.address || "N/A";

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/sales-history"
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Invoice Details</h1>
            <p className="text-slate-500 mt-1">View or print invoice {sale.invoiceNo}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => window.print()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Printer className="w-4 h-4" />
            Print Invoice
          </button>
        </div>
      </div>

      {/* Invoice Card (Printable Area) */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden" id="invoice-print-area">
        
        {/* Invoice Header */}
        <div className="p-8 sm:p-12 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col sm:flex-row justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-900 tracking-tight">Mini ERP</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                123 Business Avenue, Suite 100<br/>
                Dhaka, Bangladesh 1212<br/>
                contact@minierp.com<br/>
                +880 1234-567890
              </p>
            </div>
            <div className="sm:text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider mb-4">
                Completed
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{sale.invoiceNo}</h2>
              <p className="text-slate-500 text-sm">Issue Date: <span className="font-semibold text-slate-700">{new Date(sale.createdAt).toLocaleDateString()}</span></p>
            </div>
          </div>
        </div>

        {/* Invoice Customer Info */}
        <div className="p-8 sm:p-12 border-b border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Billed To</h3>
              <p className="font-bold text-slate-900 text-lg mb-1">{customerName}</p>
              <p className="text-slate-500 text-sm leading-relaxed">
                {customerEmail}<br/>
                {customerPhone}<br/>
                {customerAddress}
              </p>
            </div>
            <div className="sm:text-right">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Payment Info</h3>
              <p className="font-bold text-slate-900 mb-1">Cash on Delivery</p>
              <p className="text-slate-500 text-sm">Processed automatically</p>
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="p-8 sm:p-12">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-semibold rounded-l-lg">#</th>
                  <th className="px-4 py-3 font-semibold">Product Description</th>
                  <th className="px-4 py-3 font-semibold text-right">Price</th>
                  <th className="px-4 py-3 font-semibold text-center">Qty</th>
                  <th className="px-4 py-3 font-semibold text-right rounded-r-lg">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sale.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-5 text-slate-500">{index + 1}</td>
                    <td className="px-4 py-5 font-bold text-slate-900">{item.product ? item.product.name : 'Unknown Product'}</td>
                    <td className="px-4 py-5 text-right text-slate-600">৳{(item.price || 0).toLocaleString()}</td>
                    <td className="px-4 py-5 text-center font-medium text-slate-700">{item.quantity}</td>
                    <td className="px-4 py-5 text-right font-bold text-slate-900">৳{((item.price || 0) * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invoice Totals */}
          <div className="mt-8 flex justify-end">
            <div className="w-full sm:w-1/2 lg:w-1/3 space-y-3">
              <div className="flex justify-between items-center text-sm text-slate-600 px-4">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">৳{sale.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-slate-600 px-4">
                <span>Tax (0%)</span>
                <span className="font-medium text-slate-900">৳0</span>
              </div>
              <div className="pt-4 border-t border-slate-200 flex justify-between items-center px-4">
                <span className="text-lg font-bold text-slate-900">Grand Total</span>
                <span className="text-2xl font-bold text-indigo-600">৳{sale.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Invoice Footer */}
        <div className="bg-slate-900 p-6 text-center text-slate-400 text-sm">
          <p>Thank you for your business!</p>
          <p className="mt-1 text-xs opacity-60">If you have any questions concerning this invoice, please contact support.</p>
        </div>

      </div>

      {/* Print styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-print-area, #invoice-print-area * {
            visibility: visible;
          }
          #invoice-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none;
            box-shadow: none;
            border-radius: 0;
          }
        }
      `}} />

    </div>
  );
}
