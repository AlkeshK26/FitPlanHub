import { Link } from "react-router-dom";

export default function PlanCard({ plan }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold tracking-wide">
          {plan.title.substring(0, 15)}...
        </h3>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            {plan.duration}
          </span>
          <Link
            to={`/trainer/${plan.trainer?._id}`}
            className="hover:text-emerald-600 hover:underline"
          >
            By {plan.trainer?.name || "Expert"}
          </Link>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">{plan.title}</h3>

        <p className="text-gray-500 text-sm mb-6 flex-grow line-clamp-3">
          {plan.description ||
            "Unlock this plan to see the full diet and workout schedule designed specifically for you."}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Price</span>
            <span className="text-2xl font-extrabold text-slate-900">
              ₹{plan.price}
            </span>
          </div>
          <Link
            to={`/plan/${plan._id}`}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:bg-emerald-600 transition-colors"
          >
            View Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
