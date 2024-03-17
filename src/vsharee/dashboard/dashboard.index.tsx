import React, { useContext, useEffect } from "react";
import "./dashboard.style.scss";
import { authToken } from "../../scripts/storage";
import { useNavigate } from "react-router-dom";
import { API } from "../../data";
import { GlobalContext } from "../../context";
import { AppContextActionKeyEnum, AuthStatus } from "../../interface";
function Dashboard() {
  const navigate = useNavigate();
  const { userData, update } = useContext(GlobalContext);
  return (
    <div className="vsharee-dashboard">
      <h1>Hello {userData?.username}</h1>
      <button
        onClick={() => {
          authToken.remove();
          update({
            key: AppContextActionKeyEnum.authStatus,
            value: AuthStatus.isInValid,
          });
          navigate(API.auth.login);
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
