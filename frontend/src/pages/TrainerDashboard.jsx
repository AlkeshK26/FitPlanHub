import { useState, useEffect } from "react";
import api from "../api/axios";

export default function TrainerDashboard() {
  const [stats, setStats] = useState({
    totalPlans: 0,
    followers: 0,
    totalEarnings: 0,
    subscribers: []
  });
  
  const [form, setForm] = useState({ title: "", description: "", price: "", duration: "" });
  
  const [loading, setLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get("/analytics/trainer/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Create New Plan Function
  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      await api.post("/plans", form);
      alert("Plan Created Successfully! 🎉");
      
      // Form Reset
      setForm({ title: "", description: "", price: "", duration: "" });
      
      // Refresh Stats
      fetchDashboardData(); 
    } catch (error) {
      console.error("Create error:", error);
      alert("Failed to create plan");
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Earnings Card */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Total Earnings</p>
            <h2 className="text-4xl font-extrabold mt-2">₹{stats.totalEarnings}</h2>
          </div>
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-emerald-500/20 to-transparent"></div>
        </div>

        {/* Subscribers Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Active Subscribers</p>
          <h2 className="text-4xl font-extrabold text-emerald-600 mt-2">{stats.subscribers.length}</h2>
        </div>

        {/* Total Plans Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Plans Created</p>
          <h2 className="text-4xl font-extrabold text-blue-600 mt-2">{stats.totalPlans}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. CREATE PLAN FORM (Left Side) */}
        <div className="lg:col-span-1 h-fit sticky top-24">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Create New Plan</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Plan Title</label>
                <input 
                  className="w-full mt-1 p-3 bg-gray-50 rounded-lg border outline-none focus:ring-2 focus:ring-emerald-500" 
                  placeholder="e.g. 30 Day Shred" required
                  value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Price (₹)</label>
                    <input type="number" className="w-full mt-1 p-3 bg-gray-50 rounded-lg border outline-none focus:ring-2 focus:ring-emerald-500" placeholder="999" required
                    value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Duration</label>
                    <input className="w-full mt-1 p-3 bg-gray-50 rounded-lg border outline-none focus:ring-2 focus:ring-emerald-500" placeholder="4 Weeks" required
                    value={form.duration} onChange={(e) => setForm({...form, duration: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                <textarea className="w-full mt-1 p-3 bg-gray-50 rounded-lg border outline-none h-24 focus:ring-2 focus:ring-emerald-500" placeholder="Details about workout..." required
                  value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
              </div>

              <button disabled={createLoading} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg transform active:scale-95">
                {createLoading ? "Creating..." : "Launch Plan 🚀"}
              </button>
            </form>
          </div>
        </div>

        {/* 3. SUBSCRIBERS LIST (Right Side) */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Recent Subscribers</h2>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                    {stats.subscribers.length} Users
                </span>
            </div>

            {stats.subscribers.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-gray-400">No subscribers yet. Share your plans to get started! 🚀</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                    <tr>
                      <th className="p-4">User</th>
                      <th className="p-4">Plan</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats.subscribers.map((sub) => (
                      <tr key={sub._id} className="hover:bg-gray-50 transition">
                        <td className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xs">
                                    {sub.user?.name?.charAt(0) || "U"}
                                </div>
                                <span className="font-bold text-slate-700">{sub.user?.name || "User"}</span>
                            </div>
                        </td>
                        <td className="p-4 text-emerald-600 font-medium">{sub.plan?.title}</td>
                        <td className="p-4 font-bold text-slate-900">₹{sub.plan?.price}</td>
                        <td className="p-4 text-sm text-gray-400">{sub.user?.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}