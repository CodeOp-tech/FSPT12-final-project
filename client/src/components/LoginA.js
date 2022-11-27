import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Noty from "noty";

import "noty/lib/themes/mint.css";
import "noty/lib/noty.css";

function Login() {
  const [user, setUser] = useState({
    username: "test",
    password: "test",
  });

  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const login = async () => {
    try {
      await auth.signin(user);
      signInWasOk();
    } catch (err) {
      console.log(err);
      signInWasNotOk(err);
    }
  };

   const signInWasOk = () => {
    console.log("signin was ok")
    new Noty({
      type: "success",
      text: "Welcome to Recipe Haul!",
      timeout: 2000,
    }).show();
  };

  const signInWasNotOk = (message) => {
    console.log("signin was not ok")
    new Noty({
      type: "error",
      text: message,
      timeout: 2000,
    }).show();
  }; 

  const logout = async () => {
    try {
      await auth.signout(() => {
        navigate("/register");
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const login = async () => {
  //   try {
  //     const { data } = await axios("/users/login", {
  //       method: "POST",
  //       data: user,
  //     });
  //     //save the token in local storage when the user logs in
  //     localStorage.setItem("token", data.token);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const requestData = async () => {
  //   try {
  //     const { data } = await axios("/users/profile", {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const logout = () => {
  //   localStorage.removeItem("token");
  // };

  return (
    <div>
      <div>
        <input
          value={user.email}
          onChange={handleChange}
          name="email"
          type="text"
          className="form-control mb-2"
        />
        <input
          value={user.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <button className="btn btn-primary" onClick={login}>
          Log in
        </button>
        <button className="btn btn-outline-dark ml-2" onClick={logout}>
          Log out
        </button>
      </div>
{/*       <div className="text-center p-4">
        <button className=" btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button>
      </div> */}
    </div>
  );
}

export default Login;
