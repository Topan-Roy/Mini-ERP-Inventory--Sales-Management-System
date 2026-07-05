"use client";

import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-50 rounded-full border border-indigo-100 shadow-sm">
            <AlertCircle className="w-16 h-16 text-indigo-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Page Not Found
        </h1>
        
        <p className="text-lg text-slate-500 mb-8 leading-relaxed">
          The page you are looking for doesn't exist or you don't have permission to access it. 
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          
          <Link 
            href="/dashboard"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Return to Dashboard
          </Link>
        </div>

        <div className="mt-12 text-sm text-slate-400">
          Error 404 &copy; Mini ERP System
        </div>
      </div>
    </div>
  );
}
