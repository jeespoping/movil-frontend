import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Inicio from "../pages/Inicio";
import Crear from "../pages/Crear";
import { useDispatch } from "react-redux";
import {
  getAccesToken,
  getRefreshToken,
  hasExpiredToken,
} from "../utils/token";
import { logout } from "../reducers/authReducer";
import { getMe, reLogin } from "../actions/auth";
import ProtectedRoute from "./ProtectedRoute";
import ListMovilAdmin from "../pages/ListMovilAdmin";
import Movil from "../pages/Movil/Movil";
import Cart from "../pages/Cart";
import { getCart } from "../utils/cart";
import { addProductCart } from "../reducers/cartReducer";

export default function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const accessToken = getAccesToken();
      const refreshToken = getRefreshToken();
      const cartLocal = getCart();

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

      if (cartLocal && accessToken) {
        dispatch(addProductCart({ product: cartLocal }));
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
          <Route
            path="/list-admin"
            element={<ProtectedRoute element={<ListMovilAdmin />} />}
          />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route
            path="/movil/:url"
            element={<PublicRoute element={<Movil />} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
