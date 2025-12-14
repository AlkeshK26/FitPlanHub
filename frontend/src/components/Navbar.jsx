import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300">
              <span className="text-white font-black text-xl">F</span>
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tight">
              FitPlan<span className="text-emerald-500">Hub</span>
            </span>
          </Link>

          
          <div className="hidden md:flex items-center space-x-8 font-semibold text-slate-600">
            <Link to="/" className="hover:text-emerald-600 transition">Home</Link>
            
            {token ? (
              <>
                <Link to="/feed" className="hover:text-emerald-600 transition">Explore</Link>
                <Link to="/profile" className="hover:text-emerald-600 transition">Profile</Link> 
                {role === "trainer" && (
                  <Link to="/dashboard" className="text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full hover:bg-emerald-100 transition">Dashboard</Link>
                )}
                <button onClick={handleLogout} className="text-red-500 hover:text-red-600 font-bold transition">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-emerald-600 transition">Login</Link>
                <Link to="/signup" className="bg-slate-900 text-white px-6 py-2.5 rounded-full shadow-lg hover:bg-emerald-600 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}