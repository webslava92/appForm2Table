import React, { useState } from "react";
import { nanoid } from "nanoid";
import axios from "./axios";
import "../App.css";

function Form({
  users,
  setIsLoading,
  setError,
  setUsers,
  editData,
  setEditData,
  editStatus,
  setEditStatus,
  currentPage,
  getUsersCallback,
}) {
  const [stateError, setStateError] = useState({
    firstNameError: "",
    emailError: "",
  });

  const validate = () => {
    let userNameError = "";
    let emailError = "";
    if (editStatus ? !editData.first_name : !users.first_name) {
      userNameError = "Name cannot be blank";
    }
    if (
      editStatus ? !editData.email.includes("@") : !users.email.includes("@")
    ) {
      emailError = "Incorrect Email";
    }
    if (userNameError || emailError) {
      setStateError({ userNameError, emailError });
      return false;
    }
    return true;
  };

  const addUserDataAsync = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/users`, {
        first_name: users.first_name,
        email: users.email,
      });
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

  const editUserDataAsync = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(`/users`, {
        first_name: editData.first_name,
        email: editData.email,
      });
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

  const formSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      if (editStatus) {
        const editItems = users.items.map((item) =>
          item.id === editData.id
            ? {
                ...item,
                first_name: editData.first_name,
                email: editData.email,
              }
            : item
        );
        setUsers({ items: editItems, first_name: "", email: "" });
        editUserDataAsync();
      } else {
        const newItems = [
          ...users.items,
          { id: nanoid(), first_name: users.first_name, email: users.email },
        ];
        setUsers({ items: newItems, first_name: "", email: "" });
        addUserDataAsync();
      }
      setStateError({ firstNameError: "", emailError: "" });
      setEditData({});
      setEditStatus(false);
    }
  };

  const usersChange = (e) => {
    const { name, value } = e.target;
    if (editStatus) {
      setEditData((prevEditData) => ({ ...prevEditData, [name]: value }));
    } else {
      setUsers((prevUsers) => ({ ...prevUsers, [name]: value }));
    }
  };

  return (
    <div id="Form">
      <h3>Add user data:</h3>
      <form onSubmit={formSubmit}>
        <input
          value={editStatus === true ? editData.first_name : users.first_name}
          type="text"
          name="first_name"
          onChange={usersChange}
          placeholder="Name"
        />
        <div className="ErrorMessage">{stateError.first_nameError}</div>
        <input
          value={editStatus === true ? editData.email : users.email}
          type="email"
          name="email"
          onChange={usersChange}
          placeholder="Email"
        />
        <div className="ErrorMessage">{stateError.emailError}</div>
        <button type="submit" value="Submit">
          Send
        </button>
      </form>
    </div>
  );
}
export default Form;
