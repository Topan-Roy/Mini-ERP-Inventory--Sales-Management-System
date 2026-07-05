import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({ title, value, icon: Icon, trend, trendValue, colorClass, bgColorClass }) {
  const isPositive = trend === "up";

  return (
    <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
        </div>
        <div className={`p-3 rounded-2xl ${bgColorClass}`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
      </div>
      
      {trendValue && (
        <div className="mt-4 flex items-center gap-2">
          <span 
            className={`flex items-center text-xs font-medium px-2 py-1 rounded-md ${
              isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            }`}
          >
            {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {trendValue}
          </span>
          <span className="text-xs text-slate-400 font-medium">vs last month</span>
        </div>
      )}
    </div>
  );
}
