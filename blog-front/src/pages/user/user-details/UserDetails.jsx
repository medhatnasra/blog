import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userProfileRequest } from "../../../redux/apiCalls/authCalls";
import { useParams } from "react-router-dom";
import "./userdetails.css";

export const UserDetails = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { id } = useParams();

  useEffect(() => {
    dispatch(userProfileRequest(id));
  }, []);
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <i className="bi bi-person-circle"></i>
        </div>
        <div className="profile-header">
          <h2>
            {profile?.firstname} {profile?.lastname}
          </h2>
        </div>
        <div className="profile-body">
          <p>
            <strong>Email: </strong>
            {profile?.email}
          </p>
        </div>
      </div>
    </div>
  );
};
