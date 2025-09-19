// Common utility functions for weather app

export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const formatFullDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long", 
    day: "numeric",
  });
};

export const getTemperatureColor = (temp) => {
  if (temp <= 0) return "text-blue-600";
  if (temp <= 10) return "text-blue-500";
  if (temp <= 20) return "text-green-500";
  if (temp <= 30) return "text-yellow-500";
  return "text-red-500";
};

export const getWindDirection = (degrees) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const getDayName = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export const formatShortDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const getMostFrequent = (arr) => {
  const frequency = {};
  arr.forEach((item) => (frequency[item] = (frequency[item] || 0) + 1));
  return Object.keys(frequency).reduce((a, b) =>
    frequency[a] > frequency[b] ? a : b
  );
};