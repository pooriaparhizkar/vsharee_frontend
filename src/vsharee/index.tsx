import React, { useEffect } from "react";
import "./index.scss";
import { get, responseValidator } from "../scripts/api";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./authentication/login/login.index";
import { API, RoutePaths } from "../data";
import Dashboard from "./dashboard/dashboard.index";
import Register from "./authentication/register/register.index";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    get(API.user.user).then((e) => {
      if (!responseValidator(e.status)) {
        navigate(RoutePaths.auth.login);
      }
    });
  }, []);

  return (
    <React.StrictMode>
      <Routes>
        <Route path={RoutePaths.auth.login} element={<Login />} />
        <Route path={RoutePaths.auth.register} element={<Register />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </React.StrictMode>
  );
}

export default Home;
