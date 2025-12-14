import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      alert("Error signing up");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* RIGHT SIDE: Visuals (Swapped side for variety) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden order-2">
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-600/80 to-slate-900/90 z-10"></div>
        <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Gym"
        />
        <div className="relative z-20 text-center px-10">
            <h2 className="text-5xl font-black text-white mb-4">Start Your Journey</h2>
            <p className="text-blue-200 text-lg">Create your plan. Achieve your goals.</p>
        </div>
      </div>

      {/* LEFT SIDE: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 animate-fade-in order-1">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-slate-800 mb-2">Create Account</h1>
            <p className="text-gray-500">Join FitPlanHub today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                <input type="text" placeholder="xyz" className="w-full px-5 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none transition-all"
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                <input type="email" placeholder="you@example.com" className="w-full px-5 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none transition-all"
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-5 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none transition-all"
                    onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button type="button" 
                    onClick={() => setForm({...form, role: "user"})}
                    className={`py-3 rounded-xl font-bold border-2 transition-all ${form.role === "user" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-400"}`}>
                    I'm a User
                </button>
                <button type="button" 
                    onClick={() => setForm({...form, role: "trainer"})}
                    className={`py-3 rounded-xl font-bold border-2 transition-all ${form.role === "trainer" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-400"}`}>
                    I'm a Trainer
                </button>
            </div>

            <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 hover:shadow-lg transition-all mt-4">
                Sign Up Now
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500">
            Already have an account? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}