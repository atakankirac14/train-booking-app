import React from "react";

function Footer() {
  return (
    <footer role="contentinfo" className="w-full bg-gray-800 text-white py-6 p-6 mt-auto">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Solar Train Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
