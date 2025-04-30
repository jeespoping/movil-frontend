import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Inicio from "../pages/Inicio";

export default function DashboardRoutes() {
  return (
    <>
      <Routes>
        <Route exact path="/inicio" component={Inicio} />

        <Route path="*" element={<Navigate to="/inicio" replace />} />
      </Routes>
    </>
  );
}
