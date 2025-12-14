import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import api from "../api/axios";

export default function PlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check user status
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await api.get(`/plans/${id}`);
        setPlan(res.data);
      } catch (error) {
        console.error("Error fetching plan details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id]);

  // 🔥 REAL SUBSCRIBE FUNCTION
  const handleSubscribe = async () => {
    if (!token) {
      alert("Please login to subscribe!");
      navigate("/login");
      return;
    }
    
    if (!window.confirm(`Confirm subscription for ₹${plan.price}?`)) return;

    try {
      
      await api.post("/subscriptions", { planId: plan._id });
      
      alert("Success! Subscription Activated 🎉");
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        alert("You are already subscribed to this plan! ✅");
        window.location.reload();
      } else {
        alert("Subscription Failed. Try again.");
      }
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!plan) return <div className="text-center mt-20">Plan not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header Image Area */}
        <div className="bg-slate-900 text-white p-10 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold mb-2">{plan.title}</h1>
            <p className="text-emerald-400 font-bold text-lg">By {plan.trainer?.name || "Expert Trainer"}</p>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-600/20 to-transparent"></div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-500 text-sm uppercase font-bold">Price</p>
              <p className="text-3xl font-extrabold text-slate-900">₹{plan.price}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm uppercase font-bold text-right">Duration</p>
              <p className="text-xl font-bold text-slate-800">{plan.duration}</p>
            </div>
          </div>

          {/* 🔥 LOGIC: Agar Access hai to DETAILS dikhao, Varna LOCK dikhao */}
          {plan.hasAccess || role === "trainer" ? (
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl animate-fade-in">
              <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                🔓 Full Access Unlocked
              </h3>
              <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-wrap">
                {plan.description}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 p-8 rounded-2xl text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">This content is locked</h3>
              <p className="text-gray-500 mb-6">Subscribe to this plan to view the full workout schedule and diet chart.</p>
              
              <button 
                onClick={handleSubscribe}
                className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-emerald-600 transition shadow-lg transform hover:scale-105"
              >
                Subscribe Now for ₹{plan.price}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}