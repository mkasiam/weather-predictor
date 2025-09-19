import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  WiDaySunny, 
  WiTime3, 
  WiDayCloudyGusts, 
  WiMoonrise, 
  WiSmog 
} from 'react-icons/wi';

const WeatherNav = ({ city }) => {
  const tabs = [
    { id: 'today', label: 'Today', icon: WiDaySunny, path: `/city/${city}/today` },
    { id: 'hourly', label: 'Hourly', icon: WiTime3, path: `/city/${city}/hourly` },
    { id: 'daily', label: 'Daily', icon: WiDayCloudyGusts, path: `/city/${city}/daily` },
    { id: 'monthly', label: 'Monthly', icon: WiMoonrise, path: `/city/${city}/monthly` },
    { id: 'air-quality', label: 'Air Quality', icon: WiSmog, path: `/city/${city}/air-quality` }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-1 mb-6">
      <div className="flex flex-wrap justify-center gap-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 rounded-md transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`
              }
            >
              <IconComponent className="text-xl" />
              <span className="text-sm font-medium">{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default WeatherNav;