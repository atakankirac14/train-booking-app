import { useEffect } from "react";
import confetti from "canvas-confetti";

function Confirmation() {
  let details = null;
  try {
    details = JSON.parse(localStorage.getItem("bookingDetails"));
  } catch {
    details = null;
  }
  useEffect(() => {
    if (details) {
      const shoot = () => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.6 },
          scalar: 1.5,
        });
      };
  
      shoot();
      setTimeout(shoot, 300);
      setTimeout(shoot, 600);
    }
  }, [details]);

  if (!details) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">No Booking Found</h1>
        <p>Please make a booking first.</p>
      </div>
    );
  }

  const { train, passengers, passengerInfo, price, bookingRef } = details;

  return (
    <div className="text-center max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
      <h1 className="text-2xl font-bold mb-2">Booking Confirmed 🎉</h1>
      <p className="mb-4">
        Your booking reference:{" "}
        <span className="font-mono bg-gray-100 px-2 py-1 rounded">
          #{bookingRef}
        </span>
      </p>
      <div className="text-left mb-4">
        <div className="mb-2">
          <span className="font-semibold">From:</span> {train.origin}
        </div>
        <div className="mb-2">
          <span className="font-semibold">To:</span> {train.destination}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Date:</span> {train.date}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Departure:</span> {train.time_depart}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Arrival:</span> {train.time_arrival}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Passengers:</span> {passengers}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Name:</span> {passengerInfo.name}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Email:</span> {passengerInfo.email}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Phone:</span> {passengerInfo.phone}
        </div>
      </div>
      <div className="text-left mb-4">
        <div className="font-semibold mb-1">Price Breakdown:</div>
        <div className="flex justify-between">
          <span>Fare:</span>
          <span className="text-green-950">€{price.fare}</span>
        </div>
        <div className="flex justify-between">
          <span>Extras:</span>
          <span className="text-green-950">€{price.extras}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes:</span>
          <span className="text-green-950">€{price.taxes}</span>
        </div>
        <div className="flex justify-between font-bold mt-2">
          <span>Total:</span>
          <span className="text-green-950">€{price.total}</span>
        </div>
      </div>
      <div className="text-2xl text-green-700 font-semibold bg-green-100 p-4 rounded-lg mt-8">
        Thank you for booking with us!
      </div>
    </div>
  );
}

export default Confirmation;
