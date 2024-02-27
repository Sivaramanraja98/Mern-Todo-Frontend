import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const info = localStorage.getItem('user');

  const [ user , setUser ] = useState(JSON.parse(info))

  return (
    <>
    <BrowserRouter>
   
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginPage user={user} setUser ={setUser} />} />
    </Routes>
    <ToastContainer /> 
  </BrowserRouter> 
    </>
  )
}

export default App
