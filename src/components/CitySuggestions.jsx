import { FiMapPin } from "react-icons/fi";

const CitySuggestions = ({ suggestions, onCityClick }) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="mt-4 space-y-2 animate-fadeIn">
      {suggestions.map((city, index) => (
        <div
          key={`${city.lat}-${city.lon}-${index}`}
          onClick={() => onCityClick(city)}
          className="bg-white/80 backdrop-blur-md rounded-xl p-4 cursor-pointer hover:scale-105 hover:bg-white/90  transition-all duration-300 shadow-sm hover:shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FiMapPin className="text-blue-600 w-5 h-5" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{city.name}</h3>
              <p className="text-sm text-gray-500">
                {city.state && city.country ? `${city.state}, ${city.country}` : city.state || city.country}
              </p>
            </div>
            
            <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
              {city.lat?.toFixed(1)}°, {city.lon?.toFixed(1)}°
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CitySuggestions;
