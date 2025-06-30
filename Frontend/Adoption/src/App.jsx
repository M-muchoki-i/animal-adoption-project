// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Staff/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Login from "./pages/Login";
import User from "./pages/User";
import Testimonials from "./pages/Testimonials"; 
import Animals from "./pages/Animals";
import AnimalForm from "./pages/AnimalForm";
import Adopt from "./pages/AdoptionRequest";
import Home from "./pages/Home";
import AnimalDetails from "./pages/AnimalDetails";


import Staff from "./components/Staff/Staff";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// import Staff from "./components/Staff/Staff";




function App() {
  return (
    <AuthProvider>
      <Router>
        {/* <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          draggable
        /> */}
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/" element={<div>Home Route Working!</div>} />

              <Route path="/about" element={<About />} />
              <Route path="/animal_form" element={<AnimalForm />} />

              <Route path="/animals" element={<Animals />} />
              <Route path="/animals/:id" element={<AnimalDetails />} />

              <Route path="/animals" element={<Animals />} />

              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<User />} />
              <Route path="/staff" element={<Staff />} />
              
              <Route path="/adopt" element={<Adopt />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
