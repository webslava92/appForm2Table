import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Form from "./Components/Form"
import Users from "./Components/Users"

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
      <Form
        input={input}
        setInput={setInput}
        editData={editData}
        setEditData={setEditData}
        editStatus={editStatus}
        setEditStatus={setEditStatus}
      />
      <Users
        input={input.items}
        removeUserData={removeUserData}
        setEditData={setEditData}
        setEditStatus={setEditStatus}
      />
    </div>
  );
}

export default App;