import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-white">
      
      {/*  HERO SECTION (With Background Image) */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            alt="Gym Background"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-slate-900"></div>
        </div>

        {/* Content Box */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 backdrop-blur-md text-emerald-300 font-semibold text-sm tracking-wide uppercase">
            🚀 The #1 Fitness App
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
            Sculpt Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Dream Body
            </span>
          </h1>

          <p className="mt-4 text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Access elite workout plans, track your nutrition, and join a
            community of transformers. Your journey to greatness starts with a
            single rep.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform hover:scale-105 hover:-translate-y-1"
            >
              Start Your Free Trial
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              Login Account
            </Link>
          </div>

          {/* Floating Stats */}
          <div className="mt-12 flex justify-center gap-8 text-white/80">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">10k+</p>
              <p className="text-xs uppercase tracking-wider">Active Users</p>
            </div>
            <div className="w-px bg-white/20 h-10"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-xs uppercase tracking-wider">Pro Plans</p>
            </div>
          </div>
        </div>
      </div>

      {/*  FEATURES SECTION (Grid Cards)  */}
      <div className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-emerald-600 font-bold tracking-wide uppercase text-sm">
              Why Choose Us
            </h2>
            <p className="mt-2 text-4xl font-black text-slate-900">
              Everything you need to succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 🔥 Feature 1: Custom Plans (LINK TO PROFILE ADDED) */}
            <Link
              to="/profile"
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-2 group block cursor-pointer"
            >
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:rotate-6 transition-transform">
                🔥
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition">
                Custom Plans
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Access your unlocked diet and workout plans created specifically for you by expert trainers.
              </p>
            </Link>

            {/* Feature 2: Track Progress (Static) */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:rotate-6 transition-transform">
                📊
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Track Progress
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Visualize your journey with advanced analytics. Track weight,
                calories, and lifting stats.
              </p>
            </div>

            {/* Feature 3: Nutrition Guide (Link to Nutrition Page) */}
            <Link
              to="/nutrition"
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-2 group block cursor-pointer"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:rotate-6 transition-transform">
                🥗
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition">
                Nutrition Guide
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Don't just train, eat right. Click here to view a complete
                list of proteins, carbs, and healthy fats.
              </p>
            </Link>

          </div>
        </div>
      </div>

      {/*  VISUAL SECTION (Motivation)*/}
      <div className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          {/* Text Side */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
              Train with the <br />{" "}
              <span className="text-emerald-600">Best Experts</span>
            </h2>
            <p className="text-lg text-gray-500 mb-8">
              Stop guessing what to do at the gym. Follow step-by-step video
              guides from certified trainers. Whether you want to lose fat or
              build muscle, we have a plan for you.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Verified Trainers",
                "Video Demonstrations",
                "24/7 Support",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-slate-700 font-bold"
                >
                  <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/feed"
              className="text-emerald-600 font-bold text-lg hover:underline decoration-2 underline-offset-4"
            >
              Explore Available Plans &rarr;
            </Link>
          </div>

          {/* Image Grid Side */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
                className="rounded-2xl shadow-xl w-full h-64 object-cover transform translate-y-8 hover:-translate-y-2 transition-transform duration-500"
                alt="Trainer"
              />
              <img
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"
                className="rounded-2xl shadow-xl w-full h-64 object-cover hover:-translate-y-2 transition-transform duration-500"
                alt="Workout"
              />
            </div>
            {/* Decorative Blur Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400 rounded-full blur-[100px] -z-10 opacity-30"></div>
          </div>
        </div>
      </div>

      {/*  CALL TO ACTION */}
      <div className="bg-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-slate-900 z-0"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to Transform?
          </h2>
          <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
            Join 10,000+ users who are building their dream physique with
            FitPlanHub. Cancel anytime.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-emerald-700 px-10 py-4 rounded-full font-black text-lg shadow-xl hover:bg-gray-100 hover:scale-105 transition-transform"
          >
            Get Started For Free
          </Link>
        </div>
      </div>
    </div>
  );
}