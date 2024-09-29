import React, { useState, useEffect } from "react";
import "./updateuser.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function UpdateUser() {
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

/**
 * The `inputHandler` function updates the `user` state with the new value entered in an input field
 * and logs the updated `user` object to the console.
 */
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log("Value just entered - ", user);
  };

  const { id } = useParams();

  //For retrieving the id form the URL, for showing the form existing data,  we the useEffect
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/${id}`)
      .then((response) => {
        setUser(response.data.userExist);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  // function for form submission
  //   const submitForm = async (e) => {
  //     e.preventDefault();

  //     try {
  //       // send data stored in {user} state to the server API
  //       const response = await axios.put(
  //         `http://localhost:8000/api/update/user/{id}`,
  //         user
  //       );
  //       console.log(response);

  //       toast.success(response.data.message, { position: "top-left" });
  //       navigate("/"); // Navigate to another page after successful submission
  //     } catch (error) {
  //       console.log("Error Updating user:", error);
  //     }
  //   };
  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/update/user/${id}`, user)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="addUser">
        <Link to="/" className="btn btn-secondary">
          Back
        </Link>
        <h3>Update User</h3>
        <form className="addUserForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="record">record: </label>
            <input
              type="text"
              onChange={inputHandler}
              value={user.record}
              name="record"
              id="record"
              placeholder="Enter your record"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              onChange={inputHandler}
              value={user.name}
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
              value={user.email}
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
              value={user.address}
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

export default UpdateUser;
