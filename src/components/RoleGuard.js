"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2, ShieldX } from "lucide-react";

/**
 * RoleGuard - Wraps a page and only allows access to users with specified roles.
 * If the user's role is not in allowedRoles, they see an "Unauthorized" message.
 */
export default function RoleGuard({ allowedRoles, children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user) return null;

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="flex flex-col h-full items-center justify-center min-h-[500px] gap-4">
        <div className="p-5 bg-red-50 rounded-full">
          <ShieldX className="w-16 h-16 text-red-400" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h2>
          <p className="text-slate-500 max-w-sm">
            আপনার এই পেজে প্রবেশের অনুমতি নেই।<br/>
            শুধুমাত্র <span className="font-semibold text-indigo-600">{allowedRoles.join(", ")}</span> এই পেজটি দেখতে পারবেন।
          </p>
          <p className="mt-2 text-sm text-red-500 font-medium">
            Your current role: {user.role}
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="mt-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
