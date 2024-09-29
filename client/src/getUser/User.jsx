import React, { useState, useEffect } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function User() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        setUsers(response.data.userData);
        console.log(users);
      } catch (error) {
        console.log("Error getting users", error);
      }
    };
    fetchData();
  }, []);



  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/user/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => { 
        console.log(error);
      });
  };
  return (
    <>
      <div className="userTable">
        <Link to="/add" type="button" className="btn btn-primary">
          Add User
        </Link>
        {users.length === 0 ? (
          <div className="noData">No data available</div>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Record</th>
                <th scope="col">name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr>
                    <th scope="col">{index + 1}</th>
                    <th scope="col">{user.record}</th>
                    <th scope="col"><Link
                        to={`/readUser/` + user._id}
                        type="button"
                        className="editButton btn"
                      >{user.name}
                      </Link></th>
                    <th scope="col">{user.email}</th>
                    <th scope="col">{user.address}</th>
                    <th scope="col">
                      <Link
                        to={`/update/` + user._id}
                        type="button"
                        className="editButton btn"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteUser(user._id)}
                        className="deleteButton btn"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default User;
