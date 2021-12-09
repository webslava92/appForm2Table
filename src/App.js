import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Form from "./Components/Form";
import Users from "./Components/Users";
import axios from "./Components/axios";

export function getError(error) {
  return error.response || error.request ? "Response error" : "Undefined error";
}

function App() {
  const [users, setUsers] = useState({
    items: [],
    first_name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [editData, setEditData] = useState();
  const [paging, setPaging] = useState({
    usersPerPage: 0,
    numberOfPages: 0,
    totalUsers: 0,
    currentPage: 1,
  });

  const getUsersCallback = useCallback(() => {
    setIsLoading(true);
    const getUsers = async () => {
      try {
        const response = await axios.get(`/users?page=${paging.currentPage}`);
        setIsLoading(false);
        if (response.data) {
          setUsers({
            items: response.data.data.map((item) => ({
              id: item.id,
              first_name: item.first_name,
              email: item.email,
            })),
            first_name: "",
            email: "",
          });
          setPaging({
            usersPerPage: response.data.per_page,
            numberOfPages: response.data.total_pages,
            totalUsers: response.data.total,
            currentPage: paging.currentPage,
          });
        }
      } catch (error) {
        setIsLoading(false);
        setError(getError(error));
      }
    };
    getUsers();
  }, [paging.currentPage]);

  useEffect(() => {
    getUsersCallback();
  }, [getUsersCallback]);

  const removeUserDataAsync = async ({ id }) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/users/${id}`);
      if (response) {
        removeUserData(id);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(getError(error));
    }
  };

  const removeUserData = (id) => {
    const reducedItems = users.items.filter((item) => {
      return item !== id;
    });
    console.log("id: ", id);
    console.log("reducedItems: ", reducedItems);
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
        setUsers={setUsers}
        setIsLoading={setIsLoading}
        setError={setError}
        editData={editData}
        setEditData={setEditData}
      />
      <Users
        users={users.items}
        isLoading={isLoading}
        error={error}
        removeUserDataAsync={removeUserDataAsync}
        setEditData={setEditData}
        paging={paging}
        setPaging={setPaging}
      />
    </div>
  );
}

export default App;
