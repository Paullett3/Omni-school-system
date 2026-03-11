/* Admin Dashboard - The high-level overview */
export default function AdminDashboard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-schoolPrimary">
      <h1 className="text-2xl font-bold text-slate-800">Admin Overview</h1>
      <p className="text-slate-500">Welcome to the Omni School Management Control Center.</p>
      
      {/* Colorful Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-indigo-50 rounded-lg">
          <p className="text-indigo-600 font-semibold">Total Students</p>
          <p className="text-3xl font-bold text-slate-800">1,240</p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-lg">
          <p className="text-emerald-600 font-semibold">Teachers Active</p>
          <p className="text-3xl font-bold text-slate-800">84</p>
        </div>
      </div>
    </div>
  );
}