import React, { useState, useEffect, useCallback } from "react";

import "./App.css";
import { UsersForm } from "./Components/users/UsersForm";
import { UsersTable } from "./Components/users/UsersTable";
import axios from "./Components/axios";
import { getError } from "./Components/respError";

export function Users() {
  const [users, setUsers] = useState({
    items: [],
    id: "",
    first_name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorResp, setErrorResp] = useState();
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
            id: "",
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
        setErrorResp(getError(error));
      }
    };
    getUsers();
  }, [paging.currentPage]);

  useEffect(() => {
    getUsersCallback();
  }, [getUsersCallback]);

  const addUserData = (addItem) => {
    const newItems = [
      ...users.items,
      {
        id: addItem.id,
        first_name: addItem.first_name,
        email: addItem.email,
      },
    ];
    setUsers({ items: newItems, first_name: "", email: "" });
  };

  const editUserData = (editItem) => {
    const editItems = users.items.map((item) =>
      item.id === editItem.id
        ? {
            ...item,
            id: editItem.id,
            first_name: editItem.first_name,
            email: editItem.email,
          }
        : item
    );
    setUsers({ items: editItems, first_name: "", email: "" });
  };

  const removeUserDataAsync = async ({ id }) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`/users/${id}`);
      if (response) {
        const reducedItems = users.items.filter((user) => {
          return user.id !== id;
        });
        setUsers({
          items: reducedItems,
          id: "",
          first_name: users.first_name,
          email: users.email,
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      
      setErrorResp(getError(error));
    }
  };

  return (
    <div className="Users">
      <UsersForm
        users={users}
        setUsers={setUsers}
        setIsLoading={setIsLoading}
        editData={editData}
        setEditData={setEditData}
        addUserData={addUserData}
        editUserData={editUserData}
      />
      <UsersTable
        users={users.items}
        errorResp={errorResp}
        isLoading={isLoading}
        removeUserDataAsync={removeUserDataAsync}
        setEditData={setEditData}
        paging={paging}
        setPaging={setPaging}
      />
    </div>
  );
}
