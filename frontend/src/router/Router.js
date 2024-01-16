import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./../pages/Home";
import Cars from "../pages/Cars";
import CarDetails from "../pages/CarDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ThankYou from "../pages/ThankYou";
import SearchResultList from "../pages/SearchResultList";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/cars/:id" element={<CarDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/car/search" element={<SearchResultList />} />
    </Routes>
  );
};

export default Router;
