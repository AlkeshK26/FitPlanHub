import { useEffect, useState } from "react";
import api from "../api/axios";
import PlanCard from "../components/PlanCard";

export default function Feed() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get("/plans");
        setPlans(res.data);
      } catch (error) {
        console.error("Error fetching feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">Premium Selection</h2>
          <p className="mt-1 text-4xl font-extrabold text-slate-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Discover Your Next Goal
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Browse exclusive fitness plans created by top certified trainers.
          </p>
        </div>

        {plans.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-slate-400 text-lg">No plans available right now.</p>
            <p className="text-slate-400 text-sm">Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan._id} plan={plan} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}