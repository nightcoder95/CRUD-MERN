// This component is created solely fir testing purposes and is incomplete.
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./readuser.css";
import axios from "axios";

function ReadUser() {
  //variable to initialize the useState
  const users = {
    record: "",
    name: "",
    email: "",
    address: "",
  };

  //useState to store the input values and initialize it with the users variable
  const [user, setUser] = useState(users);
  const { id } = useParams();
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

  const recordNumber = user.record;
  const imagePath = `../../public/${recordNumber}.jpg`
  console.log(imagePath);

  return (
    <>
      <div className="readuser-conatiner">
        <Link to="/" className="btn btn-primary">
          Home
        </Link>
        <table class="table">
        <thead>
              <tr>
                <th scope="col">Record</th>
                <th scope="col">name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Image</th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <th>{user.record}</th>
              <th>{user.name}</th>
              <th>{user.email}</th>
              <th>{user.address}</th>
              <th><img src={imagePath} alt={`Record ${recordNumber}`} /></th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ReadUser;
