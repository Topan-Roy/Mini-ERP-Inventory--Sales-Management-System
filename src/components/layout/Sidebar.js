"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  LogOut,
  ShieldCheck,
  History,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// All navigation items with role restrictions
const allNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["Admin", "Manager", "Employee"] },
  { name: "Products", href: "/dashboard/products", icon: Package, roles: ["Admin", "Manager", "Employee"] },
  { name: "Customers", href: "/dashboard/customers", icon: Users, roles: ["Admin", "Manager"] },
  { name: "Sales", href: "/dashboard/sales", icon: ShoppingCart, roles: ["Admin", "Manager", "Employee"] },
  { name: "Sales History", href: "/dashboard/sales-history", icon: History, roles: ["Admin", "Manager", "Employee"] },
];

const roleColors = {
  Admin: "text-red-400",
  Manager: "text-amber-400",
  Employee: "text-emerald-400",
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const role = user?.role || "Employee";

  // Filter nav items based on role
  const navItems = allNavItems.filter(item => item.roles.includes(role));

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 border-r border-slate-800">
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800/60">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-white tracking-tight block">Mini ERP</span>
            <span className={`text-[10px] font-medium tracking-widest uppercase ${roleColors[role] || "text-slate-400"}`}>
              {role}
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {navItems.map((item) => {
          const isActive = 
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600/10 text-indigo-400 font-medium"
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-slate-800/60 space-y-3">
        {user && (
          <div className="px-4 py-3 rounded-xl bg-slate-800/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
