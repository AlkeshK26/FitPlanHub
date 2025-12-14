import { useState } from "react";
import { Link } from "react-router-dom";

// 🔥 25 High-Quality Gym Foods Database
const foodItems = [
  // === PROTEIN SOURCES ===
  {
    id: 1,
    name: "Chicken Breast",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1000&auto=format&fit=crop",
    desc: "The holy grail of bodybuilding. Lean, high protein, and zero carbs.",
    macros: { protein: "31g", carbs: "0g", fats: "3.6g", cal: "165" }
  },
  {
    id: 2,
    name: "Paneer (Cottage Cheese)",
    category: "Veg Protein",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop",
    desc: "Rich in Casein protein which digests slowly, perfect for night-time recovery.",
    macros: { protein: "18g", carbs: "1.2g", fats: "20g", cal: "265" }
  },
  {
    id: 3,
    name: "Whole Eggs",
    category: "High Protein",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=1000&auto=format&fit=crop",
    desc: "Complete protein profile with essential healthy fats for testosterone.",
    macros: { protein: "13g", carbs: "1.1g", fats: "11g", cal: "155" }
  },
  {
    id: 4,
    name: "Soya Chunks",
    category: "Veg Protein",
    image: "https://t3.ftcdn.net/jpg/04/40/63/83/360_F_440638329_x2H3q0o7k1x5k4x5.jpg",
    desc: "One of the highest plant-based protein sources available.",
    macros: { protein: "52g", carbs: "33g", fats: "0.5g", cal: "345" }
  },
  {
    id: 5,
    name: "Salmon (Fish)",
    category: "Protein & Fats",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop",
    desc: "Loaded with Omega-3 fatty acids, crucial for joint health and muscle recovery.",
    macros: { protein: "20g", carbs: "0g", fats: "13g", cal: "208" }
  },
  
  {
    id: 7,
    name: "Tofu",
    category: "Vegan Protein",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",
    desc: "A staple for vegans. Contains all nine essential amino acids.",
    macros: { protein: "8g", carbs: "1.9g", fats: "4.8g", cal: "76" }
  },
  {
    id: 8,
    name: "Whey Protein Scoop",
    category: "Supplement",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=1000&auto=format&fit=crop",
    desc: "Fast-absorbing protein ideal for post-workout recovery.",
    macros: { protein: "24g", carbs: "3g", fats: "1g", cal: "120" }
  },
  {
    id: 9,
    name: "Egg Whites",
    category: "Pure Protein",
    image: "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?q=80&w=1000&auto=format&fit=crop",
    desc: "The purest form of protein with almost zero fats and carbs.",
    macros: { protein: "11g", carbs: "0.7g", fats: "0.2g", cal: "52" }
  },



  {
    id: 13,
    name: "Brown Rice",
    category: "Complex Carbs",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000&auto=format&fit=crop",
    desc: "Whole grain rice that helps maintain insulin levels.",
    macros: { protein: "2.6g", carbs: "23g", fats: "0.9g", cal: "111" }
  },
  {
    id: 14,
    name: "Banana",
    category: "Pre-Workout",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1000&auto=format&fit=crop",
    desc: "Instant energy source with potassium to prevent cramps.",
    macros: { protein: "1.1g", carbs: "23g", fats: "0.3g", cal: "89" }
  },


 
  // === MICRONUTRIENTS & FIBER ===
  {
    id: 21,
    name: "Broccoli",
    category: "Fiber & Micro",
    image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?q=80&w=1000&auto=format&fit=crop",
    desc: "Low calorie, high fiber. Helps keep you full during cutting.",
    macros: { protein: "2.8g", carbs: "7g", fats: "0.4g", cal: "34" }
  },
  {
    id: 22,
    name: "Spinach",
    category: "Iron Source",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1000&auto=format&fit=crop",
    desc: "Packed with iron, magnesium, and vitamins.",
    macros: { protein: "2.9g", carbs: "3.6g", fats: "0.4g", cal: "23" }
  },
  {
    id: 23,
    name: "Kidney Beans (Rajma)",
    category: "Veg Protein",
    image: "https://images.unsplash.com/photo-1551462147-37885acc36f1?q=80&w=1000&auto=format&fit=crop",
    desc: "A staple bodybuilding food for vegetarians.",
    macros: { protein: "24g", carbs: "60g", fats: "0.8g", cal: "333" }
  },

  {
    id: 25,
    name: "Apple",
    category: "Fruit",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1000&auto=format&fit=crop",
    desc: "Good pre-workout carb. 'An apple a day keeps the fat away'.",
    macros: { protein: "0.3g", carbs: "14g", fats: "0.2g", cal: "52" }
  },
];

export default function NutritionGuide() {
  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 font-outfit">
      
      {/* === HEADER === */}
      <div className="bg-slate-900 py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 to-slate-900 opacity-90"></div>
        {/* Decorative Circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10 px-6 animate-fade-in">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Knowledge Base
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Ultimate Nutrition Guide</h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto font-light">
                Abs are made in the kitchen. Filter through the best fuel sources for muscle building and fat loss.
                <br/> <span className="text-sm opacity-60 font-bold mt-2 inline-block">(Values per 100g raw approx)</span>
            </p>
        </div>
      </div>

      {/* === FOOD GRID === */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {foodItems.map((item) => (
                <div 
                    key={item.id} 
                    onClick={() => setSelectedFood(item)}
                    className="bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden group border border-gray-100"
                >
                    <div className="h-48 overflow-hidden relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                            {item.category}
                        </span>
                    </div>
                    
                    <div className="p-5">
                        <h3 className="font-bold text-xl text-slate-800 mb-1 group-hover:text-emerald-600 transition">{item.name}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{item.desc}</p>
                        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                            <span className="text-xs font-bold text-gray-400 uppercase">View Details</span>
                            <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                                ➔
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* === POPUP MODAL (MICRONUTRIENTS) === */}
      {selectedFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedFood(null)}>
            <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl transform transition-all scale-100 relative" onClick={(e) => e.stopPropagation()}>
                
                {/* Close Button */}
                <button 
                    onClick={() => setSelectedFood(null)}
                    className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white w-8 h-8 rounded-full flex items-center justify-center font-bold z-10 transition"
                >
                    ✕
                </button>

                {/* Modal Header Image */}
                <div className="h-56 relative">
                    <img src={selectedFood.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                        <span className="bg-emerald-500 text-xs font-bold px-2 py-0.5 rounded mb-2 inline-block shadow-lg">{selectedFood.category}</span>
                        <h2 className="text-4xl font-black tracking-tight">{selectedFood.name}</h2>
                    </div>
                </div>

                {/* Macro Stats */}
                <div className="p-8">
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed font-medium">{selectedFood.desc}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-6 w-1 bg-emerald-500 rounded-full"></div>
                        <h3 className="font-bold text-slate-800 uppercase text-sm tracking-wider">Nutritional Breakdown (100g)</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {/* Protein */}
                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center hover:bg-blue-100 transition">
                            <p className="text-blue-500 text-xs font-bold uppercase mb-1">Protein</p>
                            <p className="text-3xl font-black text-slate-800">{selectedFood.macros.protein}</p>
                        </div>
                        {/* Calories */}
                        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 text-center hover:bg-orange-100 transition">
                            <p className="text-orange-500 text-xs font-bold uppercase mb-1">Calories</p>
                            <p className="text-3xl font-black text-slate-800">{selectedFood.macros.cal}</p>
                        </div>
                        {/* Carbs */}
                        <div className="bg-green-50 p-4 rounded-2xl border border-green-100 text-center hover:bg-green-100 transition">
                            <p className="text-green-600 text-xs font-bold uppercase mb-1">Carbs</p>
                            <p className="text-3xl font-black text-slate-800">{selectedFood.macros.carbs}</p>
                        </div>
                        {/* Fats */}
                        <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 text-center hover:bg-yellow-100 transition">
                            <p className="text-yellow-600 text-xs font-bold uppercase mb-1">Fats</p>
                            <p className="text-3xl font-black text-slate-800">{selectedFood.macros.fats}</p>
                        </div>
                    </div>

                    <button 
                        onClick={() => setSelectedFood(null)}
                        className="w-full mt-8 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition shadow-lg transform active:scale-95"
                    >
                        Close Details
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}