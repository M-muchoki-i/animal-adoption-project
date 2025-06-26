// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials"; 
import Animals from "./pages/Animals";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow p-4">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h2 className="text-2xl">
                    Welcome to the Animal Adoption App!
                  </h2>
                </div>
              }
            />
            <Route path="/about" element={<About />} />
            
            <Route path="/animals" element={<Animals/>} />

            <Route path="/testimonials" element={<Testimonials />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
