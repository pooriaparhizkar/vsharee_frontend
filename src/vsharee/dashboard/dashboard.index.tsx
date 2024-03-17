import React from "react";
import "./dashboard.style.scss";
import { authToken } from "../../scripts/storage";
import { useNavigate } from "react-router-dom";
import { API } from "../../data";
function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="vsharee-dashboard">
      <h1>Hello World</h1>
      <button
        onClick={() => {
          authToken.remove();
          navigate(API.auth.login);
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
