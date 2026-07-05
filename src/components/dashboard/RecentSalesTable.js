export default function RecentSalesTable() {
  const salesData = [
    { invoice: "INV-001", customer: "Rahim Uddin", date: "01 Jul 2025", total: "৳1,950", status: "Completed" },
    { invoice: "INV-002", customer: "Karim Hossain", date: "01 Jul 2025", total: "৳2,450", status: "Completed" },
    { invoice: "INV-003", customer: "Jamal Hossain", date: "30 Jun 2025", total: "৳3,750", status: "Completed" },
  ];

  return (
    <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">Recent Sales</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
            <tr>
              <th className="px-4 py-3 font-semibold rounded-l-lg">Invoice</th>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold text-right">Total</th>
              <th className="px-4 py-3 font-semibold text-center rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-4 font-medium text-slate-900">{sale.invoice}</td>
                <td className="px-4 py-4 text-slate-600">{sale.customer}</td>
                <td className="px-4 py-4 text-slate-500">{sale.date}</td>
                <td className="px-4 py-4 text-right font-medium text-slate-900">{sale.total}</td>
                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                    {sale.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
