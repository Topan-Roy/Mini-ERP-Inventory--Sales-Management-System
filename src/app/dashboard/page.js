"use client";

import { useEffect, useState } from "react";
import { Package, Users, ShoppingCart, DollarSign, Loader2 } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import SalesChart from "@/components/dashboard/SalesChart";
import LowStockTable from "@/components/dashboard/LowStockTable";
import RecentSalesTable from "@/components/dashboard/RecentSalesTable";
import api from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/dashboard');
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back, here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Products" 
          value={stats?.totalProducts?.toString() || "0"} 
          icon={Package} 
          trend="up" 
          trendValue="12%" 
          colorClass="text-blue-600"
          bgColorClass="bg-blue-50"
        />
        <StatCard 
          title="Total Customers" 
          value={stats?.totalCustomers?.toString() || "0"} 
          icon={Users} 
          trend="up" 
          trendValue="4%" 
          colorClass="text-emerald-600"
          bgColorClass="bg-emerald-50"
        />
        <StatCard 
          title="Total Sales (Count)" 
          value={stats?.totalSalesCount?.toString() || "0"} 
          icon={ShoppingCart} 
          trend="up" 
          trendValue="2.4%" 
          colorClass="text-purple-600"
          bgColorClass="bg-purple-50"
        />
        <StatCard 
          title="Total Revenue" 
          value={`৳${stats?.totalSalesAmount?.toLocaleString() || "0"}`} 
          icon={DollarSign} 
          trend="up" 
          trendValue="18%" 
          colorClass="text-amber-600"
          bgColorClass="bg-amber-50"
        />
      </div>

      {/* Middle Section: Chart & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={stats?.salesChartData} />
        </div>
        <div>
          <LowStockTable products={stats?.lowStockProducts} />
        </div>
      </div>

      {/* Bottom Section: Recent Sales */}
      <div>
        <RecentSalesTable sales={stats?.recentSales} />
      </div>
    </div>
  );
}
