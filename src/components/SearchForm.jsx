import { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/trainData.json";

const CITIES = [
  { label: "Paris", value: "Paris" },
  { label: "London", value: "London" },
];
const TIME_WINDOWS = [
  { label: "Morning (06:00-12:00)", value: "morning" },
  { label: "Afternoon (12:00-18:00)", value: "afternoon" },
  { label: "Evening (18:00-24:00)", value: "evening" },
];

function SearchForm() {
  // Convert train dates (format "M/D/YYYY") to ISO (YYYY-MM-DD)
  const date1 = new Date(data[0].date);
  const earliestDate =
    data.length > 0
      ? data.reduce((earliest, train) => {
          const [m, d, y] = train.date.split("/");
          const trainISO = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
          // Return the earliest date in ISO format
          return !earliest || trainISO < earliest ? trainISO : earliest;
        }, null)
      : null;

      console.log(earliestDate);

  const [origin, setOrigin] = useState("Paris");
  const [destination, setDestination] = useState("London");
  const [date, setDate] = useState(earliestDate || "");
  const [timeWindow, setTimeWindow] = useState("morning");
  const [passengers, setPassengers] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (origin === destination) {
      setError("Origin and destination must be different.");
      return;
    }
    if (passengers < 1) {
      setError("At least one passenger required.");
      return;
    }
    navigate(
      `/results?origin=${origin}&destination=${destination}&date=${date}&timeWindow=${timeWindow}&passengers=${passengers}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[750px] mx-auto 2xl:ml-auto 2xl:mr-0 bg-white rounded-xl shadow-md p-6 flex flex-col gap-6"
    >
      {/* First Row: Origin / Swap / Destination */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Origin</label>
          <select
            className="w-full border-stone rounded px-3 py-3"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          >
            {CITIES.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end pb-1">
          <button
            type="button"
            aria-label="Swap cities"
            onClick={handleSwap}
            className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition"
          >
            <span className="sr-only">Swap</span>⇄
          </button>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Destination</label>
          <select
            className="w-full border-stone-800 rounded px-3 py-3"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            {CITIES.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Second Row: Date / Time Window / Passengers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            className="w-full border-stone-800 rounded px-3 py-2"
            value={date}
            onChange={(e) => {setDate(e.target.value)
              console.log(e.target.value)
              console.log(date)
            }}
            required
            min="2023-01-01"
            max="2023-12-31"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Time Window</label>
          <select
            className="w-full border-stone-800 rounded px-3 py-2"
            value={timeWindow}
            onChange={(e) => setTimeWindow(e.target.value)}
          >
            {TIME_WINDOWS.map((tw) => (
              <option key={tw.value} value={tw.value}>
                {tw.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Passengers</label>
          <input
  type="number"
  min="1"
  className="w-full border-stone-800 rounded px-3 py-2"
  value={passengers}
  onChange={(e) => {
    const value = Number(e.target.value);
    setPassengers(value < 1 ? 1 : value);
  }}
  required
/>
        </div>
      </div>

      {/* Error and Submit */}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
      >
        Search Trains
      </button>
    </form>
  );
}

export default SearchForm;
