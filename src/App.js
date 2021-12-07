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
  const [error, setError] = useState();
  const [editData, setEditData] = useState();
  const [paging, setPaging] = useState({
    usersPerPage: 0,
    numberOfPages: 0,
    totalUsers: 0,
  });
  const [currentPage, setCurrentPage] = useState(2);

  const respError = (error) => {
    let err =
      error.response || error.request ? "Response error" : "Undefined error";
    setError(err);
  };

  const getUsersCallback = useCallback(() => {
    setIsLoading(true);
    const getUsers = async () => {
      try {
        const response = await axios.get(`/users?page=${currentPage}`);
        setIsLoading(false);
        if (response);
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
        });
      } catch (error) {
        setIsLoading(false);
        respError(error);
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
      if (response) setIsLoading(false);
      console.log("response: ", response);
    } catch (error) {
      setIsLoading(false);
      respError(error);
    }
  };

  const removeUserData = (id) => {
    removeUserDataAsync(id);
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
        setUsers={setUsers}
        setIsLoading={setIsLoading}
        respError={respError}
        editData={editData}
        setEditData={setEditData}
      />
      <Users
        users={users.items}
        isLoading={isLoading}
        error={error}
        removeUserData={removeUserData}
        setEditData={setEditData}
        paging={paging}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
