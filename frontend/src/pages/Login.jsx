import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate(res.data.role === "trainer" ? "/dashboard" : "/feed");
    } catch (error) {
      console.error(error); 
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* LEFT SIDE: Visuals */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 to-slate-900/90 z-10"></div>
        <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Fitness"
        />
        <div className="relative z-20 text-center px-10">
            <h2 className="text-5xl font-black text-white mb-4">Transform Your Body</h2>
            <p className="text-emerald-200 text-lg">Join the elite community of fitness enthusiasts.</p>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 animate-fade-in">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-slate-800 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Enter your details to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input 
                    type="email" 
                    placeholder="you@example.com"
                    className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
            </div>

            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform active:scale-95">
                Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500">
            Don't have an account? <Link to="/signup" className="text-emerald-600 font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}