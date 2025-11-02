import { useState } from "react";
export default function SearchBar({ onSearch }) {
  const [inputCity, setInputCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim() == "") return;
    onSearch(inputCity);
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center mt-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Entrer le nom de la ville"
          className="border border-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white rounded-lg p-2 cursor-pointer hover:bg-blue-600 transition"
        >
          Rechercher
        </button>
      </form>
      
    </div>
  );
}
