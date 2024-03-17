import React, { useEffect } from "react";
import "./index.scss";
import { get, responseValidator } from "../scripts/api";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./authentication/login/login.index";
import { API, RoutePaths } from "../data";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    get(API.user.user).then((e) => {
      if (responseValidator(e.status)) {
        console.log("done");
      } else {
        console.log("zzz");
        navigate(RoutePaths.auth.login);
      }
    });
  }, []);

  return (
    <React.StrictMode>
      <Routes>
        <Route path={RoutePaths.auth.login} element={<Login />} />
        <Route path="/" element={<h1>hello world</h1>} />
      </Routes>
    </React.StrictMode>
  );
}

export default Dashboard;
