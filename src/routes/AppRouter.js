import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Inicio from "../pages/Inicio";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<PublicRoute element={<Inicio />} />} />;
        </Routes>
      </div>
    </BrowserRouter>
  );
}
