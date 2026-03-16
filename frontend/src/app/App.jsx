import { Routes, Route } from "react-router-dom";
import { Layout } from "../core/layout";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { AuthContext } from "../contexts/authContext";
import { useState } from "react";

export function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}
