// src/App.jsx
import React from "react";
import { AuthProvider } from "./components/AuthContext";
import Staff from "./components/Staff/Staff";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import StaffSignupForm from "./components/Staff/StaffSignupForm";
import Dashboard from "./pages/Dashboard";



// import Staff from "./components/Staff/Staff";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";






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
              <Route path="/" element={<Dashboard />} />
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<User />} />
              <Route path="/staff/signup" element={<StaffSignupForm />} />

              {/*  Protected Routes */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route path="/animal_form" element={<AnimalForm />} />
              <Route
                path="/animals"
                element={
                  <ProtectedRoute>
                    <Animals />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/animals/:id"
                element={
                  <ProtectedRoute>
                    <AnimalDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/testimonials"
                element={
                  <ProtectedRoute>
                    <Testimonials />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/staff"
                element={
                  <ProtectedRoute>
                    <Staff />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/adopt"
                element={
                  <ProtectedRoute>
                    <Adopt />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/adopt/:id"
                element={
                  <ProtectedRoute>
                    <Adopt />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="/donate"
                element={
                  <ProtectedRoute>
                    <Donate />
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="/user"
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
