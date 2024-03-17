import React, { useContext, useEffect } from "react";
import "./index.scss";
import { get, responseValidator } from "../scripts/api";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./authentication/login/login.index";
import { API, RoutePaths } from "../data";
import Dashboard from "./dashboard/dashboard.index";
import Register from "./authentication/register/register.index";
import { GlobalContext } from "../context";
import {
  AppContextActionKeyEnum,
  AuthStatus,
  Response,
  UserData,
} from "../interface";

function Home() {
  const navigate = useNavigate();
  const { authStatus, update } = useContext(GlobalContext);
  useEffect(() => {
    get<UserData>(API.user.user).then((e) => {
      if (responseValidator(e.status)) {
        update({
          key: AppContextActionKeyEnum.authStatus,
          value: AuthStatus.isValid,
        });
        update({
          key: AppContextActionKeyEnum.userData,
          value: e.data,
        });
      } else {
        update({
          key: AppContextActionKeyEnum.authStatus,
          value: AuthStatus.isInValid,
        });
        navigate(RoutePaths.auth.login);
      }
    });
  }, []);

  return (
    <React.StrictMode>
      {authStatus === AuthStatus.isValid ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      ) : authStatus === AuthStatus.isInValid ? (
        <Routes>
          <Route path={RoutePaths.auth.login} element={<Login />} />
          <Route path={RoutePaths.auth.register} element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <h1>Loading...</h1>
      )}
    </React.StrictMode>
  );
}

export default Home;
