import React, { useState } from "react";
import { nanoid } from "nanoid";
import axios from "./axios";
import "../App.css";

function Form({
  users,
  setIsLoading,
  respError,
  setUsers,
  editData,
  setEditData,
}) {
  const [stateError, setStateError] = useState({
    firstNameError: "",
    emailError: "",
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
      setStateError({ firstNameError, emailError });
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
      respError(error);
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
      respError(error);
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      if (editData) {
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
      <h3>Add user data:</h3>
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
      </form>
    </div>
  );
}
export default Form;
