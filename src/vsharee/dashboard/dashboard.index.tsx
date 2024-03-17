import React, { useContext, useEffect, useState } from "react";
import "./dashboard.style.scss";
import { authToken } from "../../scripts/storage";
import { Link, useNavigate } from "react-router-dom";
import { API, RoutePaths } from "../../data";
import { GlobalContext } from "../../context";
import { AppContextActionKeyEnum, AuthStatus, Groups } from "../../interface";
import { get, post, responseValidator } from "../../scripts/api";
function Dashboard() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Groups[]>([]);
  const [newGroupName, setNewGroupName] = useState<string>();
  const [newGroupDescription, setNewGroupDescription] = useState<string>();
  const { userData, update } = useContext(GlobalContext);
  function logOutHandler() {
    authToken.remove();
    update({
      key: AppContextActionKeyEnum.authStatus,
      value: AuthStatus.isInValid,
    });
    navigate(API.auth.login);
  }

  useEffect(() => {
    get<Groups[]>(API.groups.index).then((e) => {
      if (responseValidator(e.status) && e.data) {
        setGroups(e.data);
      }
    });
  }, []);
  function createGroupHandler(): void {
    post(API.groups.index, {
      name: newGroupName,
      description: newGroupDescription,
    }).then((e) => {
      console.log(e);
    });
  }

  return (
    <div className="vsharee-dashboard">
      <h1>Hello {userData?.username}</h1>
      <button onClick={logOutHandler}>Logout</button>
      <input
        placeholder="groupName"
        onChange={(e) => setNewGroupName(e.target.value)}
      />
      <input
        placeholder="groupDescription"
        onChange={(e) => setNewGroupDescription(e.target.value)}
      />
      <button onClick={createGroupHandler}>Create new Group</button>
      <div className="groups">
        {groups.map((item) => (
          <div>
            <h4>{item.name}</h4>
            <h6>{item.description}</h6>
            <Link to={RoutePaths.group.detail(item._id)}>Enter</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
