export function getBackground(weatherMain) {
  switch (weatherMain) {
    case "Clear":
      return "bg-gradient-to-b from-blue-400 to-yellow-200";
    case "Clouds":
      return "bg-gradient-to-b from-gray-400 to-gray-200";
    case "Rain":
      return "bg-gradient-to-b from-blue-700 to-gray-500";
    case "Thunderstorm":
      return "bg-gradient-to-b from-gray-800 to-gray-600";
    case "Snow":
      return "bg-gradient-to-b from-blue-100 to-white";
    case "Drizzle":
      return "bg-gradient-to-b from-blue-300 to-blue-100";
    default:
      return "bg-gradient-to-b from-blue-100 to-gray-100";
  }
}
