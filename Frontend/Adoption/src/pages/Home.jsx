import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            🐾 Welcome to the Animal Adoption Center
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Every animal deserves a loving home. We rescue, rehabilitate, and
            rehome abandoned pets — connecting them with families like yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
            <Link
              to="/adopt"
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
            >
              Adopt Now
            </Link>
            <Link
              to="/donate"
              className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition"
            >
              Donate
            </Link>
          </div>
        </div>

        <div className="md:w-1/2">
          <img
            src="https://www.shutterstock.com/image-photo/heartwarming-moment-between-dog-cat-260nw-2432338827.jpg"
            alt="Happy pets"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Mission Statement */}
      <p className="mt-12 text-center text-lg text-gray-700">
        Our mission is to give every animal a chance at love, health, and a
        forever home.
      </p>

      {/* Social Media */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-2">Follow us on social media</p>
        <div className="flex justify-center gap-6 text-green-700 text-2xl">
          <a
            href="https://www.facebook.com/helenwoodwardanimalcenter/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="hover:text-green-800 transition" />
          </a>
          <a
            href="https://www.instagram.com/kspca/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="hover:text-pink-600 transition" />
          </a>
          <a
            href="https://x.com/HWAC/status/1799153446420902359"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="hover:text-blue-500 transition" />
          </a>
          <a
            href="https://www.youtube.com/watch?v=DbNNXpeGC7g&t=9s"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="hover:text-red-600 transition" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
