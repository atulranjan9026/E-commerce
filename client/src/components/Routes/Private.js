import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.js";
import { Outlet } from "react-router-dom";
import axios from "../../hooks/axios.js";
import Spinner from "../Spinner.js";

export default function PrivateRoute() {
  const [ok, setOk] = useState(true);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
