import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login  from './Components/Login';
import Signup from './Components/Signup';
import Hrdashboard from './Components/Hrdashboard';
import Employeedashboard from './Components/Employeedashboard';

function App() {
  return (
    <BrowserRouter>
    <div>
    <nav class="navbar navbar-dark bg-primary">
      <div class="container-fluid">
    <a class="navbar-brand">Simplilearn Leave Management</a>
    <button class="btn btn-outline-light" type="submit">Logout</button>
  </div>

    </nav>
    </div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Hrdashboard />}></Route>
        <Route path="/emp-dashboard" element={<Employeedashboard />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
