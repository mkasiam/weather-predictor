import { useParams, useNavigate, Outlet } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import WeatherNav from "../components/WeatherNav";

const City = () => {
  const { city } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-weather min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 hover:bg-white/90 transition-all duration-300 shadow-md"
          >
            <FiArrowLeft className="text-blue-500" />
            <span className="text-gray-700 font-medium">Back to Search</span>
          </button>

          {/* Navigation */}
          <WeatherNav city={city} />

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default City;
