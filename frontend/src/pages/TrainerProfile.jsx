import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import PlanCard from "../components/PlanCard";

export default function TrainerProfile() {
  const { id } = useParams(); 
  const [trainer, setTrainer] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPlans = await api.get("/plans");
        
        const trainerPlans = resPlans.data.filter(p => p.trainer?._id === id);
        setPlans(trainerPlans);

        if (trainerPlans.length > 0) {
           setTrainer(trainerPlans[0].trainer);
        } else {
           setTrainer({ name: "Trainer", _id: id }); 
        }

      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleFollow = async () => {
    try {
      await api.post(`/follow/${id}`);
      setIsFollowing(!isFollowing); // Toggle UI immediately
      alert(isFollowing ? "Unfollowed!" : "Followed Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating follow status");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-10 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
           <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {trainer?.name?.charAt(0).toUpperCase() || "T"}
           </div>
           <div>
              <h1 className="text-3xl font-extrabold text-slate-900">{trainer?.name || "Trainer Profile"}</h1>
              <p className="text-emerald-600 font-medium">Certified Fitness Coach</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span>🏋️ {plans.length} Plans Created</span>
                <span>⭐ Top Rated</span>
              </div>
           </div>
        </div>
        
        <button 
          onClick={handleFollow}
          className={`px-8 py-3 rounded-full font-bold shadow-md transition transform hover:scale-105 ${
            isFollowing 
            ? "bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200" 
            : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          {isFollowing ? "Unfollow" : "Follow +"}
        </button>
      </div>

      {/* Plans Grid */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-1 bg-emerald-500 rounded-full"></div>
        <h2 className="text-2xl font-bold text-slate-800">Plans by {trainer?.name}</h2>
      </div>

      {plans.length === 0 ? (
        <p className="text-gray-500">This trainer hasn't created any plans yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(plan => (
             <PlanCard key={plan._id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
}