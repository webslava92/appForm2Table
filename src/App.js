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
    if (editStatus ? !editData.username : !input.username) {
      userNameError = "Name cannot be blank";
    }
    if (editStatus ? !editData.email.includes("@") : !input.email.includes("@")) {
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
        let editItems = input.items.map(item => item.id === editData.id ? {...item, username: editData.username, email: editData.email} : item);
        setInput({ items: editItems, username: "", email: "" })
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

function Users({ input, removeUserData, setEditData, setEditStatus }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = input.items.slice(firstUserIndex, lastUserIndex);
  
  

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
            currentUsers={currentUsers}
          />
        </tbody>
      </table>
      <div className="pagination__wrap">
        <Pagination
          input={input}
          usersPerPage={usersPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

function User({
  input,
  removeUserData,
  setEditData,
  setEditStatus,
  currentUsers,
}) {
  const [selected, setSelected] = useState(null);

  return currentUsers.map((item, id) => (
    <tr
      key={id}
      onClick={() => setSelected(item.id)}
      className={item.id === selected ? "user selected" : "user"}
    >
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>
        <button
          className="EditBtn"
          onClick={() => setEditStatus(true) || setEditData(input.items[id])}
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

function Pagination({ input, usersPerPage, setCurrentPage }) {
  const pageNumbers = [];
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage( prev => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  for (let i = 1; i <= Math.ceil(input.items.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination__inner">
      <ul className="pagination__list">
        {pageNumbers.map((number) => (
          <li className="pagination__item" key={number}>
            <a
              href="!#"
              className="pagination__page-link"
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
        <li>of</li>
        <li className="pagination__all-pages-link">{input.items.length}</li>
        <li className="pagination__btns-control">
          <button
            className="pagination__btn-prev"
            onClick={prevPage}
          ></button>
          <button
            className="pagination__btn-next"
            onClick={nextPage}
          ></button>
        </li>
      </ul>
    </div>
  );
}

export default App;
