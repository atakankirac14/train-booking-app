import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess(null);

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",    // replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID",   // replace with your EmailJS template ID
        form.current,
        "YOUR_PUBLIC_KEY"     // replace with your EmailJS public key
      )
      .then(
        (result) => {
          setSuccess(true);
          setSending(false);
          e.target.reset();
        },
        (error) => {
          setSuccess(false);
          setSending(false);
          console.error(error.text);
        }
      );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
        Contact Us
      </h2>
      <p className="text-l text-gray-700 text-center mb-8">
        We'd love to hear from you! Whether you have questions, feedback, or
        want to book a journey, feel free to reach out.
      </p>

      <form ref={form} onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send Message"}
        </button>
      </form>

      {success === true && (
        <p className="text-green-600 text-center mt-4">Message sent successfully!</p>
      )}
      {success === false && (
        <p className="text-red-600 text-center mt-4">
          Failed to send message. Please try again.
        </p>
      )}
    </div>
  );
};

export default ContactUs;
