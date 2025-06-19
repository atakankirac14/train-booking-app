/* File: /src/components/TrainResults.jsx */
import data from "../data/trainData.json";
import { useSearchParams, useNavigate } from "react-router-dom";

const TIME_WINDOWS = {
  morning: { start: 6, end: 12 },
  afternoon: { start: 12, end: 18 },
  evening: { start: 18, end: 24 },
};

function TrainResults() {
  const [params] = useSearchParams();
  const origin = params.get("origin");
  const destination = params.get("destination");
  const date = params.get("date"); // date from URL, e.g. "2023-01-07"
  const timeWindow = params.get("timeWindow");
  const passengers = parseInt(params.get("passengers"));
  const navigate = useNavigate();

  // Highlighted: convert train.date (M/D/YYYY) to YYYY-MM-DD to match the input date format
  function formatDateToISO(dateStr) {
    const [month, day, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  function isInTimeWindow(time, windowKey) {
    if (!windowKey || !TIME_WINDOWS[windowKey]) return true;
    const [hour] = time.split(":").map(Number);
    const { start, end } = TIME_WINDOWS[windowKey];
    return hour >= start && hour < end;
  }

  const filtered = data.filter((train) => {
    const trainDateISO = formatDateToISO(train.date);
    return (
      trainDateISO === date &&
      train.origin === origin &&
      train.destination === destination &&
      isInTimeWindow(train.time_depart, timeWindow) &&
      train.available_seats >= passengers
    );
  });

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
    <h2 className="text-lg font-bold mb-6 text-center md:text-left">
      Available Trains
    </h2>
    {filtered.length === 0 ? (
      <div><h2 className="text-g font-bold mb-2 text-center md:text-left p-3">Not found. ☹️  Sorry !</h2>
      <div className="bg-yellow-100 text-yellow-900 p-5 rounded shadow-md text-center font-medium">
        
        No trains found for your search. Please try a different date, time
        window, or reduce passenger count.
      </div>
      </div>
    ) : (
      <div className="flex flex-col gap-6">
        {filtered.map((train) => (
          <div
            key={train.flight_id}
            className="border rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex-1">
              <div className="font-semibold text-lg mb-1">
                {train.origin} → {train.destination}
              </div>
              <div className="text-gray-700 mb-1">
                {train.time_depart} - {train.time_arrival} ({train.date})
              </div>
              <div className="text-sm text-gray-500">
                Seats available: {train.available_seats}
              </div>
            </div>
            <button
              onClick={() =>
                navigate(
                  `/checkout?train_id=${train.flight_id}&passengers=${passengers}`
                )
              }
              className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              Book
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
}

export default TrainResults;
