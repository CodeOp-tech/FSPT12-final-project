import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    username: "test",
    password: "test",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios("/users/register", {
        method: "POST",
        data: user,
      });
      //redirect the user to the login page
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <div>
        <input
          value={user.username}
          onChange={handleChange}
          name="username"
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
        <button className=" btn btn-primary" onClick={login}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Register;