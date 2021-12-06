import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Form from "./Components/Form";
import Users from "./Components/Users";
import axios from "./Components/axios";

export let usersPerPage = 0;
export let numberOfPages = 0;
export let totalUsers = 0;

function App() {
  const [users, setUsers] = useState({
    items: [],
    first_name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("noError");

  const [editData, setEditData] = useState({});
  const [editStatus, setEditStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);

  const noUsers = !users || (users && users.lenght === 0);

  const getUsersCallback = useCallback(() => {
    setIsLoading(true);
    const getUsers = async () => {
      try {
        const response = await axios.get(`/users?page=${currentPage}`);
        setIsLoading(false);
        if (response && response.data);
        setUsers({
          items: response.data.data.map((item) => ({
            id: item.id,
            first_name: item.first_name,
            email: item.email,
          })),
          first_name: "",
          email: "",
        });
        usersPerPage = response.data.per_page;
        numberOfPages = response.data.total_pages;
        totalUsers = response.data.total;
      } catch (error) {
        setIsLoading(false);
        if (error.response) {
          setError("Response error");
        } else if (error.request) {
          setError("Request error");
        } else {
          setError("Undefined error");
        }
      }
    };
    getUsers();
  }, [currentPage]);

  useEffect(() => {
    getUsersCallback();
  }, [getUsersCallback]);

  const removeUserDataAsync = async ({ id }) => {
    console.log("id: ", { id });
    try {
      setIsLoading(true);
      const response = await axios.delete(`/users/${id}`);
      console.log("response: ", response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        setError("Response error");
      } else if (error.request) {
        setError("Request error");
      } else {
        setError("Undefined error");
      }
    }
  };

  const removeUserData = (id) => {
    const reducedItems = users.items.filter((item) => {
      return item !== id;
    });
    setUsers({
      items: reducedItems,
      first_name: users.first_name,
      email: users.email,
    });
  };

  return (
    <div className="App">
      <Form
        users={users}
        setIsLoading={setIsLoading}
        setError={setError}
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
        error={error}
        removeUserData={removeUserData}
        removeUserDataAsync={removeUserDataAsync}
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
