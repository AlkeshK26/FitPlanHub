import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Landing from "./pages/Landing";
import TrainerDashboard from "./pages/TrainerDashboard";
import PlanDetails from "./pages/PlanDetails";
import TrainerProfile from "./pages/TrainerProfile";
import UserProfile from "./pages/UserProfile";
import NutritionGuide from "./pages/NutritionGuide";

// Protected Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <TrainerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plan/:id"
            element={
              <ProtectedRoute>
                <PlanDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainer/:id"
            element={
              <ProtectedRoute>
                <TrainerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        
          <Route path="/nutrition" element={<NutritionGuide />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
