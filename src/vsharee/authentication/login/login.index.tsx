import React, { useState } from "react";
import "./login.style.scss";
import { post, responseValidator } from "../../../scripts/api";
import { API, RoutePaths } from "../../../data";
import { Tokens, Response } from "../../../interface";
import { authToken } from "../../../scripts/storage";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  function submitHandler() {
    console.log({ username, password });
    post<Response<Tokens>>(API.auth.login, { username, password }).then((e) => {
      if (responseValidator(e.status) && e.data) {
        authToken.set(e.data.data);
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
    </div>
  );
}

export default Login;
