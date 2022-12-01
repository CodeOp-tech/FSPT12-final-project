import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../profile.css";

const User = () => {
  const [user, setUser] = useState({
    id: "",
    profile_pic: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    zipcode: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios("users/profile", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(data[0]);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <div>
      <section
        className="background"
        style={{
          minHeight: 800,
          paddingTop: 50,
          paddingBottom: 50,
          paddingLeft: 200,
          paddingRight: 200,
        }}
      >
        <div
          className="rounded"
          style={{ background: "white", minHeight: 700 }}
        >
          <div
            className="rounded-top"
            style={{ background: "black", minHeight: 100 }}
          >
            <div className="row">
              <div
                className="container col pb-3"
                style={{ paddingTop: 50, paddingLeft: 35 }}
              >
                {" "}
                <img
                  src={user.profile_pic}
                  className="img-thumbnail"
                  alt="..."
                  style={{ maxHeight: 100, maxWidth: 100 }}
                />
              </div>
              <div
                className="col"
                style={{ color: "white", paddingTop: 70, paddingRight: 450 }}
              >
                <h3>
                  {user.firstname} {user.lastname}
                </h3>
              </div>
            </div>
          </div>
          <div
            className="container"
            style={{ background: "#F8F8F8", minHeight: 70 }}
          >
            <div className="row">
              <div
                className="container col text-center"
                style={{ paddingTop: 5, paddingLeft: 450 }}
              >
                <h5>
                  23<br></br>
                </h5>
                Recipes Saved
              </div>
              <div
                className="container col text-center"
                style={{ paddingTop: 5 }}
              >
                <h5>
                  5<br></br>
                </h5>
                Recipes Made
              </div>
            </div>
          </div>
          <section
            className="address"
            style={{
              color: "white",
              minHeight: 300,
              paddingTop: 50,
              paddingBottom: 20,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <div className="text" style={{ color: "black" }}>
              <h4>Delivery Info</h4>
            </div>
            <div
              className="contact"
              style={{ background: "#F8F8F8", minHeight: 150 }}
            >
              <div
                className="details"
                style={{ color: "black", paddingLeft: 20, paddingTop: 30 }}
              >
                <p>address: {user.address}</p>
                <p>city: {user.city}</p>
                <p>zipcode: {user.zipcode}</p>
              </div>
            </div>
          </section>

          <div className="saved" style={{ paddingLeft: 20 }}>
            <Link to="/recipes">
              <h4>Saved Recipes</h4>
            </Link>
            <Link to="/order_history">View Order History</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default User;
