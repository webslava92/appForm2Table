import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Form from "./Components/Form";
import Users from "./Components/Users";
import axios from "./Components/axios";

function App() {
  const [users, setUsers] = useState({
    items: [],
    first_name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [editData, setEditData] = useState({});
  const [editStatus, setEditStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);

  const noUsers = !users || (users && users.lenght === 0);

  const getUsersCallback = useCallback(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/users?page=${currentPage}`);
        if (response && response.data) setIsLoading(false);
        setUsers({
          items: response.data.data.map((item) => ({
            id: item.id,
            first_name: item.first_name,
            email: item.email,
          })),
          first_name: "",
          email: "",
        });
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getUsers();
  }, [currentPage]);

  useEffect(() => {
    getUsersCallback();
  }, [getUsersCallback]);

  const removeUserData = async (id) => {
    console.log("id: ", id);
    try {
      setIsLoading(true);
      const response = await axios.delete(`/users/${id}`, id);
      console.log("response: ", response);
      if (response && response.data) setIsLoading(false);
      getUsersCallback();
    } catch (error) {
      if (error.response) {
        // get response with a status code not in range 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // no response
        console.log(error.request);
      } else {
        // Something wrong in setting up the request
        console.log("Error", error.message);
      }
    }
  };

  // const removeUserData = (id) => {
  //   console.log("id: ", id);
  //   const reducedItems = users.items.filter((item, itemId) => {
  //     return itemId !== id;
  //   });
  //   setUsers({
  //     items: reducedItems,
  //     first_name: users.first_name,
  //     email: users.email,
  //   });
  // };

  return (
    <div className="App">
      <Form
        users={users}
        setUsers={setUsers}
        editData={editData}
        setEditData={setEditData}
        editStatus={editStatus}
        setEditStatus={setEditStatus}
        currentPage={currentPage}
        getUsersCallback={getUsersCallback}
      />
      <Users
        users={users.items}
        isLoading={isLoading}
        removeUserData={removeUserData}
        setEditData={setEditData}
        setEditStatus={setEditStatus}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        noUsers={noUsers}
      />
    </div>
  );
}

export default App;
