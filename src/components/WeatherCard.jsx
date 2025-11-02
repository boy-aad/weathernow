export default function WeatherCard({ data }) {
  const { name, sys, main, weather } = data;
  return (
    <div className="backdrop-blur-lg bg-white/10 mt-5 rounded-2xl p-8 shadow-2xl w-[300px] text-center">
      <h2 className="text-2xl font-semibold mb-2">
        {name}, {sys.country}
      </h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt="weather icon"
        className="mx-auto"
      />
      <p className="text-3xl font-bold mb-1">{Math.round(main.temp)}°C</p>
      <p className="capitalize">{weather[0].description}</p>
    </div>
  );
}
//
