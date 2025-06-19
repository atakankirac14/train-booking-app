import { useSearchParams, useNavigate } from "react-router-dom";
import data from "../data/trainData.json";
import PassengerForm from "../components/PassengerForm";
import OrderSummary from "../components/OrderSummary";
import { useState } from "react";

function Checkout() {
  const [params] = useSearchParams();
  const trainId = parseInt(params.get("train_id"));
  const passengers = parseInt(params.get("passengers"));
  const train = data.find((t) => t.flight_id === trainId);
  const navigate = useNavigate();
  const [passengerInfo, setPassengerInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePassengerSubmit = (info) => {
    setPassengerInfo(info);
  };

  const handlePay = async () => {
    setLoading(true);
    setError("");
    // Calculate order summary
    const baseFare = 49;
    const extras = 5 * passengers;
    const taxes = 0.1 * (baseFare * passengers + extras);
    const total = baseFare * passengers + extras + taxes;
    // Save booking details to localStorage
    const bookingDetails = {
      train: {
        origin: train.origin,
        destination: train.destination,
        date: train.date,
        time_depart: train.time_depart,
        time_arrival: train.time_arrival,
      },
      passengers,
      passengerInfo,
      price: {
        fare: baseFare * passengers,
        extras,
        taxes: +taxes.toFixed(2),
        total: +total.toFixed(2),
      },
      bookingRef: Math.random().toString(36).substring(2, 8).toUpperCase(),
    };
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    setTimeout(() => {
      setLoading(false);
      navigate("/confirmation");
    }, 1500);
  };

  return (
    <div className="p-4">
      {!passengerInfo ? (
        <PassengerForm onSubmit={handlePassengerSubmit} />
      ) : (
        <>
          <OrderSummary train={train} passengers={passengers} />
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <button
            onClick={handlePay}
            disabled={loading}
            className="mt-6 block w-full max-w-xs mx-auto bg-blue-500 text-white rounded px-4 py-3 font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Processing Payment..." : "Pay with Card"}
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;
