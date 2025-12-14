import { useEffect, useState } from "react";
import api from "../api/axios";
import PlanCard from "../components/PlanCard";

export default function UserProfile() {
  const [profileData, setProfileData] = useState({
    user: { name: "", email: "" },
    activePlans: []
  });
  const [loading, setLoading] = useState(true);

  // Editing State
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const role = localStorage.getItem("role") || "User";

  // 1. Data Fetching
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setProfileData(res.data);
      setNewName(res.data.user.name); // Edit ke liye naam set kar lo
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateName = async () => {
    try {
      const res = await api.put("/auth/update-profile", { name: newName });
      
      setProfileData(prev => ({ ...prev, user: { ...prev.user, name: res.data.name } }));
      setIsEditing(false);
      alert("Profile Updated Successfully! ✅");
    } catch (error) {
      console.error(error); // 🔥 Ye line add karte hi Red Line gayab ho jayegi
      alert("Failed to update profile");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
    </div>
  );

  const { user, activePlans } = profileData;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* === HEADER SECTION (Editable) === */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-10 border border-gray-100">
          <div className="bg-slate-900 h-32 relative">
             <div className="absolute -bottom-12 left-8">
                <div className="w-24 h-24 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-white text-3xl font-bold shadow-lg uppercase">
                  {user.name ? user.name.charAt(0) : "U"}
                </div>
             </div>
          </div>
          
          <div className="pt-16 pb-8 px-8 flex flex-col md:flex-row justify-between items-end gap-4">
            <div className="w-full">
              
              {/* EDIT LOGIC HERE */}
              {isEditing ? (
                <div className="flex items-center gap-3 mb-2">
                    <input 
                        type="text" 
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="border-2 border-emerald-500 rounded-lg p-2 text-xl font-bold text-slate-800 outline-none w-full max-w-sm"
                    />
                    <button onClick={handleUpdateName} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-700">Save</button>
                    <button onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-300">Cancel</button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-slate-800 capitalize">{user.name}</h1>
                    <button 
                        onClick={() => setIsEditing(true)} 
                        className="text-gray-400 hover:text-emerald-600 transition"
                        title="Edit Name"
                    >
                        ✏️
                    </button>
                </div>
              )}

              <p className="text-gray-500">{user.email}</p>
              <span className="inline-block mt-2 bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded uppercase font-bold tracking-wide">
                {role} Account
              </span>
            </div>

            <div className="text-right whitespace-nowrap">
              <p className="text-3xl font-extrabold text-emerald-600">{activePlans.length}</p>
              <p className="text-sm text-gray-500 font-medium uppercase">Active Plans</p>
            </div>
          </div>
        </div>

        {/* === ACTIVE PLANS SECTION === */}
        <div className="flex items-center gap-2 mb-6">
           <div className="h-8 w-1 bg-emerald-500 rounded-full"></div>
           <h2 className="text-2xl font-bold text-slate-800">My Subscriptions</h2>
        </div>

        {activePlans.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
            <div className="text-5xl mb-4">💪</div>
            <h3 className="text-xl font-bold text-slate-800">No Active Plans</h3>
            <p className="text-gray-500 mt-2 mb-6">You haven't subscribed to any fitness plans yet.</p>
            <a href="/feed" className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition shadow-lg">
              Explore Feed
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activePlans.map((plan) => (
               plan ? <PlanCard key={plan._id} plan={plan} /> : null
            ))}
          </div>
        )}
      </div>
    </div>
  );
}