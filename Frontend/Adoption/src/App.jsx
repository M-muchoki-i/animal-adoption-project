// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Login from "./pages/Login";
import User from "./pages/User";
import Testimonials from "./pages/Testimonials"; 
import Animals from "./pages/Animals";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element= {<Home />} />
              
            <Route path="/about" element={<About />} />
            
            <Route path="/animals" element={<Animals/>} />

            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
