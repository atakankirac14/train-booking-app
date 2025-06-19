function OrderSummary({ train, passengers }) {
  const baseFare = 49;
  const extras = 5 * passengers;
  const taxes = 0.1 * (baseFare * passengers + extras);
  const total = baseFare * passengers + extras + taxes;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6 max-w-md mx-auto w-full">
      <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Order Summary</h3>
      
      {/* Each row flex, column on small screens */}
      <div className="flex flex-col md:flex-row md:justify-between mb-2">
        <span className="mb-1 md:mb-0">Train:</span>
        <span className="break-words md:whitespace-nowrap">
          {train.time_depart} → {train.time_arrival}
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between mb-2">
        <span className="mb-1 md:mb-0">Passengers:</span>
        <span>{passengers}</span>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between mb-2">
        <span className="mb-1 md:mb-0">Fare:</span>
        <span>€{baseFare * passengers}</span>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between mb-2">
        <span className="mb-1 md:mb-0">Extras:</span>
        <span>€{extras}</span>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between mb-2">
        <span className="mb-1 md:mb-0">Taxes (10%):</span>
        <span>€{taxes.toFixed(2)}</span>
      </div>

      <hr className="my-2" />

      <div className="flex flex-col md:flex-row md:justify-between font-bold text-lg">
        <span className="mb-1 md:mb-0">Total:</span>
        <span>€{total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default OrderSummary;
