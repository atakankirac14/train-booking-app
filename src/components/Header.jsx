import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Optional: for icons


function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-slate-300 text-green-800 p-4 mb-12 mr-16 z-50 relative  w-full">
    <div className="container mx-auto flex justify-between items-center">
      {/* Logo */}
      <Link to="/" aria-label="Go to homepage">
      <h1 className="text-3xl font-bold">SolarRail</h1>
      </Link>
      {/* Burger Icon - Mobile */}
      <button
        className="md:hidden text-green-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-8 pr-8 font-bold">
       
        <Link to="/results" className="hover:underline">Results</Link>
        <Link to="/about" className="hover:underline">About Us</Link> 
        <Link to="/contacts" className="hover:underline">Contact Us</Link>
      </nav>
    </div>

    {/* Mobile Menu */}
    {isOpen && (
      <div className="md:hidden mt-4 flex flex-col items-end space-y-2 pr-4 font-bold">
       
        <Link to="/results" onClick={() => setIsOpen(false)} className="hover:underline">Results</Link>
        <Link to="/about" onClick={() => setIsOpen(false)} className="hover:underline">About Us</Link>
        <Link to="/contacts" onClick={() => setIsOpen(false)} className="hover:underline">Contact Us</Link>
      </div>
    )}
  </header>
  );
}

export default Header;
