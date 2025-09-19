import React from 'react';
import { FiMapPin } from 'react-icons/fi';

// Function to get country flag URL
const getFlagUrl = (countryCode) => {
  if (!countryCode) return null;
  return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
};

// Function to get country code from country name (basic mapping for common countries)
const getCountryCode = (countryName) => {
  const countryMap = {
    'United States': 'us',
    'United Kingdom': 'gb',
    'Canada': 'ca',
    'Australia': 'au',
    'Germany': 'de',
    'France': 'fr',
    'Italy': 'it',
    'Spain': 'es',
    'Netherlands': 'nl',
    'Belgium': 'be',
    'Switzerland': 'ch',
    'Austria': 'at',
    'Sweden': 'se',
    'Norway': 'no',
    'Denmark': 'dk',
    'Finland': 'fi',
    'Poland': 'pl',
    'Czech Republic': 'cz',
    'Hungary': 'hu',
    'Portugal': 'pt',
    'Greece': 'gr',
    'Turkey': 'tr',
    'Russia': 'ru',
    'China': 'cn',
    'Japan': 'jp',
    'South Korea': 'kr',
    'India': 'in',
    'Brazil': 'br',
    'Argentina': 'ar',
    'Mexico': 'mx',
    'Chile': 'cl',
    'Colombia': 'co',
    'Peru': 'pe',
    'Venezuela': 've',
    'Egypt': 'eg',
    'South Africa': 'za',
    'Nigeria': 'ng',
    'Kenya': 'ke',
    'Morocco': 'ma',
    'Algeria': 'dz',
    'Tunisia': 'tn',
    'Israel': 'il',
    'Saudi Arabia': 'sa',
    'United Arab Emirates': 'ae',
    'Qatar': 'qa',
    'Kuwait': 'kw',
    'Thailand': 'th',
    'Vietnam': 'vn',
    'Singapore': 'sg',
    'Malaysia': 'my',
    'Indonesia': 'id',
    'Philippines': 'ph',
    'Bangladesh': 'bd',
    'Pakistan': 'pk',
    'Sri Lanka': 'lk',
    'Nepal': 'np',
    'Afghanistan': 'af',
    'Iran': 'ir',
    'Iraq': 'iq',
    'New Zealand': 'nz'
  };
  
  return countryMap[countryName] || null;
};

const CitySuggestions = ({ suggestions, onCityClick }) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 animate-fadeIn">
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 border-b border-gray-100">
          <p className="text-sm text-gray-600 font-medium">Suggested Locations</p>
        </div>
        <ul className="divide-y divide-gray-50">
          {suggestions.map((city, index) => (
            <li
              key={`${city.lat}-${city.lon}-${index}`}
              className="group cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => onCityClick(city)}
            >
              <div className="flex items-center gap-4 p-4 hover:px-5 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                    <FiMapPin className="text-blue-600 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 truncate">
                    {city.name}
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300 truncate">
                    {city.state && city.country ? `${city.state}, ${city.country}` : city.state || city.country}
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors duration-300 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {city.lat?.toFixed(2)}°, {city.lon?.toFixed(2)}°
                    </span>
                    {city.country && (
                      <span className="flex items-center gap-1 text-blue-400 group-hover:text-blue-500">
                        {getCountryCode(city.country) ? (
                          <img 
                            src={getFlagUrl(getCountryCode(city.country))} 
                            alt={`${city.country} flag`}
                            className="w-4 h-3 object-cover rounded-sm border border-gray-200"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'inline';
                            }}
                          />
                        ) : (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 3a2 2 0 00-2 2v1.5h16V5a2 2 0 00-2-2H4z"/>
                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                          </svg>
                        )}
                        <span style={{ display: getCountryCode(city.country) ? 'none' : 'inline' }}>
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 3a2 2 0 00-2 2v1.5h16V5a2 2 0 00-2-2H4z"/>
                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                          </svg>
                        </span>
                        {city.country}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CitySuggestions;