"use client";

import { Bell, Search, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
      {/* Mobile Menu Toggle & Search */}
      <div className="flex items-center gap-6 flex-1">
        <button className="lg:hidden text-slate-500 hover:text-slate-700 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
            placeholder="Search anything..."
          />
        </div>
      </div>

      {/* Right Side: Notifications & Profile */}
      <div className="flex items-center gap-6">
        <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
        
        <button className="flex items-center gap-3 text-left">
          <img 
            src="https://i.pravatar.cc/150?img=11" 
            alt="Admin User" 
            className="w-10 h-10 rounded-full object-cover border-2 border-slate-100"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-700">Admin User</p>
            <p className="text-xs text-slate-500">admin@minierp.com</p>
          </div>
        </button>
      </div>
    </header>
  );
}
