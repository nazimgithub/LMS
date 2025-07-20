import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Hrdashboard from "./Components/Hrdashboard";
import Employeedashboard from "./Components/Employeedashboard";
import Addemployee from "./Components/Addemployee";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Hrdashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/emp-dashboard/:id"
          element={isLoggedIn ? <Employeedashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/add-employee"
          element={isLoggedIn ? <Addemployee /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
