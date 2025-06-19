import { useState } from "react";

function PassengerForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!name.trim()) return "Name is required.";
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      return "Valid email is required.";
    if (!phone.match(/^\+?[0-9\s-]{7,}$/))
      return "Valid phone number is required.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    onSubmit({ name, email, phone });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 max-w-md mx-auto mt-4"
    >
      <h3 className="text-lg font-semibold mb-2">Passenger Details</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
      >
        Continue
      </button>
    </form>
  );
}

export default PassengerForm;
