"use client";

import { Bell, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const roleColors = {
  Admin: "bg-red-100 text-red-700",
  Manager: "bg-amber-100 text-amber-700",
  Employee: "bg-emerald-100 text-emerald-700",
};

export default function Header() {
  const { user } = useAuth();
  const role = user?.role || "Employee";

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
      {/* Search */}
      <div className="flex items-center gap-6 flex-1">
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
        
        {user && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm border-2 border-indigo-100 flex-shrink-0">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">{user.name}</p>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${roleColors[role]}`}>
                {role}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
