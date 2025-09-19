import React from 'react';
import { 
  WiDaySunny, 
  WiTime3, 
  WiDayCloudyGusts, 
  WiMoonrise, 
  WiSmog 
} from 'react-icons/wi';

const WeatherNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'today', label: 'Today', icon: WiDaySunny },
    { id: 'hourly', label: 'Hourly', icon: WiTime3 },
    { id: 'daily', label: 'Daily', icon: WiDayCloudyGusts },
    { id: 'monthly', label: 'Monthly', icon: WiMoonrise },
    { id: 'air-quality', label: 'Air Quality', icon: WiSmog }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-1 mb-6">
      <div className="flex flex-wrap justify-center gap-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-md transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <IconComponent className="text-xl" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default WeatherNav;