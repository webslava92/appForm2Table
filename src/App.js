import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Form from "./Components/Form";
import Users from "./Components/Users";

function App() {
  const [input, setInput] = useState({
    items: [],
    username: "",
    email: "",
  });

  const [editData, setEditData] = useState({});
  const [editStatus, setEditStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);
  const [getUsers, setGetUsers] = useState({});
console.log(getUsers);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`https://reqres.in/api/users?page=${currentPage}`)
        .then((res) => {
          setGetUsers(res.data.data.map((item, i) => ({
            id: item.id,
            username: item.first_name,
            email: item.email,
          })));
          console.log(input);
          
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
    
  }, [currentPage, input]);

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
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
