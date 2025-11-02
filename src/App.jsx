import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { getBackground } from "./utils/getBackground.js";

import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (cityName) => {
    try {
      setError(null);
      setWeather(null);
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
      );

      if (!response.ok) throw new Error("Ville introuvable");

      const data = await response.json();
      setWeather(data);
      localStorage.setItem("lastCity", cityName);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newCity) => {
    setCity(newCity);
    fetchWeather(newCity);
  };

  // Charger la dernière recherche au démarrage
  useEffect(() => {
    const last = localStorage.getItem("lastCity");
    if (last) {
      setCity(last);
    }
  }, []);

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  const bgClass = weather
    ? getBackground(weather.weather[0].main)
    : "bg-blue-100";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${bgClass} ${
        darkMode ? "text-gray-100 bg-gray-900" : "text-gray-800"
      } flex flex-col items-center justify-center gap-5 min-h-screen px-4 transition-colors duration-500`}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-2 rounded-md bg-white/30 hover:bg-white/50 transition cursor-pointer"
        >
          {darkMode ? "☀️ Mode clair" : "🌙 Mode sombre"}
        </button>
      </div>

      <h1 className=" text-4xl font-bold">🌤️ WeatherNow</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="text-blue-500 mt-4">Chargement...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <AnimatePresence mode="wait">
        {weather && !loading && (
          <motion.div
            key={weather.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <WeatherCard data={weather} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
