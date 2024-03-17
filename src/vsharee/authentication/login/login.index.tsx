import React, { useContext, useState } from "react";
import "./login.style.scss";
import { post, responseValidator } from "../../../scripts/api";
import { API, RoutePaths } from "../../../data";
import {
  Tokens,
  AppContextActionKeyEnum,
  AuthStatus,
} from "../../../interface";
import { authToken } from "../../../scripts/storage";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../context";
function Login() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  const { update } = useContext(GlobalContext);
  function submitHandler() {
    post<Tokens>(API.auth.login, { username, password }).then((e) => {
      if (responseValidator(e.status) && e.data) {
        authToken.set(e.data);
        update({
          key: AppContextActionKeyEnum.authStatus,
          value: AuthStatus.isValid,
        });
        update({
          key: AppContextActionKeyEnum.userData,
          value: e.data.user,
        });
        navigate(RoutePaths.dashboard);
      }
    });
  }
  return (
    <div className="vsharee">
      <h1>Login</h1>
      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submitHandler}>Login</button>

      <p>
        Doesn't have acc?{" "}
        <button onClick={() => navigate(RoutePaths.auth.register)}>
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;
