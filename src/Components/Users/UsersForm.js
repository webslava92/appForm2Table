import React, { useState } from "react";
import axios from "../axios";
import "../../App.css";
import { getError } from "../respError";

export function UsersForm({ users, setIsLoading, setUsers, editData, setEditData, addUserData, editUserData }) {
  const [stateError, setStateError] = useState({
    firstNameError: "",
    emailError: "",
    submitError: "",
  });

  const validate = () => {
    let firstNameError = "";
    let emailError = "";
    if (editData ? !editData.first_name : !users.first_name) {
      firstNameError = "Name cannot be blank";
    }
    if (editData ? !editData.email.includes("@") : !users.email.includes("@")) {
      emailError = "Incorrect Email";
    }
    if (firstNameError || emailError) {
      setStateError({ firstNameError, emailError, submitError: "" });
      return false;
    }
    return true;
  };

  const addUserDataAsync = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/users`, {
        first_name: users.first_name,
        email: users.email,
      });
      if (response.data) {
        const addItem = {
          id: response.data.id,
          first_name: response.data.first_name,
          email: response.data.email,
        };
        addUserData(addItem);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setStateError({
        firstNameError: stateError.firstNameError,
        emailError: stateError.emailError,
        submitError: getError(error),
      });
    }
  };

  const editUserDataAsync = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(`/users`, {
        id: editData.id,
        first_name: editData.first_name,
        email: editData.email,
      });
      if (response.data) {
        const editItem = {
          id: response.data.id,
          first_name: response.data.first_name,
          email: response.data.email,
        };
        editUserData(editItem);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setStateError({
        firstNameError: stateError.firstNameError,
        emailError: stateError.emailError,
        submitError: getError(error),
      });
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      if (editData) {
        editUserDataAsync();
      } else {
        addUserDataAsync();
      }
      setStateError({ firstNameError: "", emailError: "", submitError: "" });
      setEditData();
    }
  };

  const usersChange = (e) => {
    const { name, value } = e.target;
    if (editData) {
      setEditData((prevEditData) => ({ ...prevEditData, [name]: value }));
    } else {
      setUsers((prevUsers) => ({ ...prevUsers, [name]: value }));
    }
  };

  return (
    <div id="Form">
      <h3>Users</h3>
      <form onSubmit={formSubmit}>
        <input
          value={editData ? editData.first_name : users.first_name}
          type="text"
          name="first_name"
          onChange={usersChange}
          placeholder="Name"
        />
        <div className="ErrorMessage">{stateError.firstNameError}</div>
        <input
          value={editData ? editData.email : users.email}
          type="email"
          name="email"
          onChange={usersChange}
          placeholder="Email"
        />
        <div className="ErrorMessage">{stateError.emailError}</div>
        <button type="submit" value="Submit">
          Send
        </button>
        {stateError.submitError ? (
          <h2 className="SubmitError">{stateError.submitError}</h2>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
