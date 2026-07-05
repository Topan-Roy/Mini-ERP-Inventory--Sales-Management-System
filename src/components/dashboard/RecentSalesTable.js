export default function RecentSalesTable({ sales }) {
  const salesData = sales || [];

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
            {salesData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-slate-500">No recent sales found.</td>
              </tr>
            ) : salesData.map((sale) => (
              <tr key={sale._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-4 font-medium text-slate-900">{sale.invoiceNo}</td>
                <td className="px-4 py-4 text-slate-600">{sale.customer ? sale.customer.name : 'Walk-in'}</td>
                <td className="px-4 py-4 text-slate-500">{new Date(sale.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-4 text-right font-medium text-slate-900">৳{sale.totalAmount.toLocaleString()}</td>
                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                    Completed
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
