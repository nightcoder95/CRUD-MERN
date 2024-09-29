import React, { useState } from "react";
import "./adduser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AddUser() {
  //for navigation using useNavigate
  const navigate = useNavigate();
  //variable to initialize the useState
  const users = {
    record: "",
    name: "",
    email: "",
    address: "",
  };

  //useState to store the input values and initialize it with the users variable
  const [user, setUser] = useState(users);

  //function to store the input values
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log("Value just entered - ", user);
  };

  // function for form submission
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      // send data stored in {user} state to the server API
      const response = await axios.post("http://localhost:8000/api/user", user);
      console.log(response);
      toast.success(response.data.message, { position: "top-left" });
      navigate("/"); // Navigate to another page after successful submission
    } catch (error) {
      console.log("Error creating user:", error);
    }
  };

  return (
    <>
      <div className="addUser">
        <Link to="/" className="btn btn-secondary">
          Back
        </Link>
        <h3>Add New User</h3>
        <form className="addUserForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="name">Record: </label>
            <input
              type="text"
              onChange={inputHandler}
              name="record"
              id="record"
              placeholder="Enter the record"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              onChange={inputHandler}
              name="name"
              id="name"
              placeholder="Enter your Name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              onChange={inputHandler}
              name="email"
              id="email"
              placeholder="Enter your Email"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="address">Address: </label>
            <input
              type="text"
              onChange={inputHandler}
              name="address"
              id="address"
              placeholder="Enter your Address"
            />
          </div>
          <div className="inputGroup">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddUser;
