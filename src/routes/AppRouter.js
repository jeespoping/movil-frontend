import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Inicio from "../pages/Inicio";
import Crear from "../pages/Crear";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccesToken,
  getRefreshToken,
  hasExpiredToken,
} from "../utils/token";
import { logout } from "../reducers/authReducer";
import { getMe, reLogin } from "../actions/auth";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const accessToken = getAccesToken();
      const refreshToken = getRefreshToken();

      if (
        !accessToken ||
        !refreshToken ||
        accessToken === "undefined" ||
        refreshToken === "undefined"
      ) {
        dispatch(logout());
        return;
      }

      if (hasExpiredToken(accessToken)) {
        if (hasExpiredToken(refreshToken)) {
          dispatch(logout());
        } else {
          await dispatch(reLogin(refreshToken));
        }
      } else {
        await dispatch(getMe());
      }
    })();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<PublicRoute element={<Inicio />} />} />;
          <Route
            path="/crear"
            element={<ProtectedRoute element={<Crear />} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
