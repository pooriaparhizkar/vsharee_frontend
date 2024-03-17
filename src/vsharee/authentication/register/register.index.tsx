import React, { useState } from "react";
import "./register.style.scss";
import { post, responseValidator } from "../../../scripts/api";
import { API, RoutePaths } from "../../../data";
import { useNavigate } from "react-router-dom";
function Register() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  function submitHandler() {
    post(API.auth.register, { username, password }).then((e) => {
      if (responseValidator(e.status) && e.data) {
        navigate(RoutePaths.auth.login);
      }
    });
  }
  return (
    <div className="vsharee">
      <h1>Register</h1>
      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submitHandler}>Register</button>
    </div>
  );
}

export default Register;
