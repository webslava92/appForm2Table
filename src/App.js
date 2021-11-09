import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  const [input, setInput] = useState({
    items: [],
    username: "",
    email: "",
  });
  const [editData, setEditData] = useState({});
  const [editStatus, setEditStatus] = useState(false);

  const removeUserData = (id) => {
    const reducedItems = input.items.filter((item, itemId) => {
      return itemId !== id;
    });
    setInput({
      items: reducedItems,
      username: input.username,
      email: input.email,
    });
  };

  return (
    <div className="App">
      {console.log(editData.username, editData.email)}
      <Form
        input={input}
        setInput={setInput}
        editData={editData}
        setEditData={setEditData}
        editStatus={editStatus}
        setEditStatus={setEditStatus}
      />
      <Users
        input={input}
        removeUserData={removeUserData}
        setEditData={setEditData}
        setEditStatus={setEditStatus}
      />
    </div>
  );
}

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
    if (!input.username && !editData.username) {
      userNameError = "Name cannot be blank";
    }
    if (!input.email.includes("@") && !editData.email.includes("@")) {
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
      if (editStatus === false) {
        let newItems = [
          ...input.items,
          { id: nanoid(), username: input.username, email: input.email },
        ];
        setInput({ items: newItems, username: "", email: "" });
      } else {
        let editItems = [
          ...input.items,
          { id: nanoid(), username: editData.username, email: editData.email },
        ];
        setInput({ items: editItems, username: "", email: "" });
      }
      setStateError({ userNameError: "", emailError: "" });
      setEditData({});
      setEditStatus(false);
    }
  };

  const inputChange = (e) => {
    let { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
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

function Users({ input, removeUserData, setEditData, setEditStatus }) {
  return (
    <div className="Users">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <User
            input={input}
            removeUserData={removeUserData}
            setEditData={setEditData}
            setEditStatus={setEditStatus}
          />
        </tbody>
      </table>
    </div>
  );
}

function User({ input, removeUserData, setEditData, setEditStatus }) {
  const [selected, setSelected] = useState(null);

  return input.items.map((item, id) => (
    <tr
      key={id}
      onClick={() => setEditStatus(true) || setSelected(item.id)}
      className={item.id === selected ? "user selected" : "user"}
    >
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>
        <button
          className="EditBtn"
          onClick={() => setEditData(input.items[id])}
        >
          Edit
        </button>
        <button className="RemoveBtn" onClick={() => removeUserData(id)}>
          Remove
        </button>
      </td>
    </tr>
  ));
}

export default App;
