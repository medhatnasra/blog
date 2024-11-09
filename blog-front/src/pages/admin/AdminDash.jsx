import React, { useEffect } from "react";
import axios from "axios";

export const AdminDash = () => {
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:4000/api/user/profile", {
        withCredentials: true,
      });

      console.log(result);
    };

    fetchData();
  });
  return <div>AdminDash</div>;
};
