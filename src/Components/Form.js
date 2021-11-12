import React, { useState } from "react";
import { nanoid } from "nanoid";
import "../App.css";

function Form({
  input,
  setInput,
  editData,
  setEditData,
  editStatus,
  setEditStatus,
}) {
  const [stateError, setStateError] = useState({
    userNameError: "",
    emailError: "",
  });

  let validate = () => {
    let userNameError = "";
    let emailError = "";
    if (editStatus ? !editData.username : !input.username) {
      userNameError = "Name cannot be blank";
    }
    if (
      editStatus ? !editData.email.includes("@") : !input.email.includes("@")
    ) {
      emailError = "Incorrect Email";
    }
    if (userNameError || emailError) {
      setStateError({ userNameError, emailError });
      return false;
    }
    return true;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      if (editStatus) {
        let editItems = input.items.map((item) =>
          item.id === editData.id
            ? { ...item, username: editData.username, email: editData.email }
            : item
        );
        setInput({ items: editItems, username: "", email: "" });
      } else {
        let newItems = [
          ...input.items,
          { id: nanoid(), username: input.username, email: input.email },
        ];
        setInput({ items: newItems, username: "", email: "" });
      }
      setStateError({ userNameError: "", emailError: "" });
      setEditData({});
      setEditStatus(false);
    }
  };

  const inputChange = (e) => {
    let { name, value } = e.target;
    if (editStatus) {
      setEditData((prevEditData) => ({ ...prevEditData, [name]: value }));
    } else {
      setInput((prevInput) => ({ ...prevInput, [name]: value }));
    }
  };

  return (
    <div id="Form">
      <h3>Add user data:</h3>
      <form onSubmit={formSubmit}>
        <input
          value={editStatus === true ? editData.username : input.username}
          type="text"
          name="username"
          onChange={inputChange}
          placeholder="Name"
        />
        <div className="ErrorMessage">{stateError.userNameError}</div>
        <input
          value={editStatus === true ? editData.email : input.email}
          type="email"
          name="email"
          onChange={inputChange}
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
