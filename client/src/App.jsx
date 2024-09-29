import { useState } from "react";
import User from "./getUser/User";
import AddUser from "./addUser/AddUser";
import UpdateUser from "./updateUser/UpdateUser";
import ReadUser from "./readUser/ReadUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />,
    },
    {
      path: "/update/:id",
      element: <UpdateUser />,
    },
    {
      path: "/readUser/:id",
      element: <ReadUser/>
    }
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={route} />
    </>
  );
}

export default App;
