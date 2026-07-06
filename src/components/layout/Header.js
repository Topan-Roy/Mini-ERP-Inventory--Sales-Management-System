"use client";

import { useState, useEffect } from "react";
import { Bell, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const roleColors = {
  Admin: "bg-red-100 text-red-700",
  Manager: "bg-amber-100 text-amber-700",
  Employee: "bg-emerald-100 text-emerald-700",
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function Header() {
  const { user } = useAuth();
  const role = user?.role || "Employee";
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = now
    ? now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "--:--:--";

  const formattedDate = now
    ? now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
      {/* Left: Greeting + Date/Time */}
      <div className="flex items-center gap-4 flex-1">
        <div className="hidden md:flex flex-col">
          <p className="text-base font-bold text-slate-800 leading-tight">
            {getGreeting()}{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! 👋
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{formattedDate}</p>
        </div>

        <div className="hidden lg:flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 px-3 py-1.5 rounded-xl">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-semibold tabular-nums tracking-wide">{formattedTime}</span>
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
