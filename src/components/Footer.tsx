import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-yellow-400 font-bold text-xl mb-2">CineView</h2>
            <p className="text-gray-400 text-sm">
              Your trusted source for honest movie reviews
            </p>
          </div>
          <div className="flex space-x-6">
            {["twitter", "facebook", "instagram", "youtube"].map((icon) => (
              <a
                key={icon}
                href="#"
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <i className={`fab fa-${icon} text-xl`}></i>
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 CineView. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;