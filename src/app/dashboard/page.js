import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import SalesChart from "@/components/dashboard/SalesChart";
import LowStockTable from "@/components/dashboard/LowStockTable";
import RecentSalesTable from "@/components/dashboard/RecentSalesTable";

export default function DashboardPage() {
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
          value="120" 
          icon={Package} 
          trend="up" 
          trendValue="12%" 
          colorClass="text-blue-600"
          bgColorClass="bg-blue-50"
        />
        <StatCard 
          title="Total Customers" 
          value="85" 
          icon={Users} 
          trend="up" 
          trendValue="4%" 
          colorClass="text-emerald-600"
          bgColorClass="bg-emerald-50"
        />
        <StatCard 
          title="Total Sales (Month)" 
          value="$12,450" 
          icon={ShoppingCart} 
          trend="down" 
          trendValue="2.4%" 
          colorClass="text-purple-600"
          bgColorClass="bg-purple-50"
        />
        <StatCard 
          title="Total Revenue" 
          value="$48,750" 
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
          <SalesChart />
        </div>
        <div>
          <LowStockTable />
        </div>
      </div>

      {/* Bottom Section: Recent Sales */}
      <div>
        <RecentSalesTable />
      </div>
    </div>
  );
}
