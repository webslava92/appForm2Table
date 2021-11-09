import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";

function App(input, setInput) {
  const removeUserData = (id) => {
    const reducedItems = input.items.filter((item, itemId) => {
      return itemId !== id;
    });
    setInput({
      items: reducedItems,
      id: id,
      username: input.username,
      email: input.email,
    });
  };

  return (
    <div className="App">
      <Form input={input} />
      <Users removeUserData={removeUserData} />
    </div>
  );
}

function Form() {
  const [input, setInput] = useState({
    id: nanoid(),
    username: "",
    email: "",
    items: [],
  });
  const [stateError, setStateError] = useState({
    userNameError: "",
    emailError: "",
  });

  let validate = () => {
    let userNameError = "";
    let emailError = "";
    if (!input.username) {
      userNameError = "Name cannot be blank";
    }
    if (!input.email.includes("@")) {
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
      let newItems = [
        ...input.items,
        { id: input.id, username: input.username, email: input.email },
      ];
      setInput({ items: newItems, id: nanoid(), username: "", email: "" });
      setStateError({ userNameError: "", emailError: "" });
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
          value={input.username}
          type="text"
          name="username"
          onChange={inputChange}
          placeholder="Name"
        />
        <div className="ErrorMessage">{stateError.userNameError}</div>
        <input
          value={input.email}
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

function Users() {
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
          <User />
        </tbody>
      </table>
    </div>
  );
}

function User(input, removeUserData) {
  const [editId, setEditId] = useState(null);

  return input.items.map((item, id) => (
    <tr key={id}>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>
        <button className="EditBtn" onClick={() => setEditId(item.id)}>
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
