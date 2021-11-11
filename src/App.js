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
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentUsers={currentUsers}
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
      onClick={() =>
        selected === item.id ? setSelected(null) : setSelected(item.id)
      }
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

function Pagination({
  input,
  currentPage,
  setCurrentPage,
  usersPerPage,
  currentUsers,
}) {
  const [activeNextBtn, setActiveNextBtn] = useState(false);
  const [activePrevBtn, setActivePrevBtn] = useState(false);
  const numberOfPages = Math.ceil(input.items.length / usersPerPage);
  const prevPage = () => {
    setActivePrevBtn(currentPage !== 1 ? true : false);
    setCurrentPage((prev) => (prev - 1 !== 0 ? prev - 1 : 1));
  };
  const nextPage = () => {
    setActiveNextBtn(numberOfPages > currentPage ? true : false);
    setCurrentPage((prev) =>
      input.items.length > 0
        ? prev + 1 < numberOfPages + 1
          ? prev + 1
          : prev
        : 1
    );
  };

  const paginateMax = (currentPage - 1) * usersPerPage + currentUsers.length;
  const paginateStart = paginateMax - currentUsers.length + 1;

  return (
    <div className="pagination__inner">
      <ul className="pagination__list">
        <li className="pagination__page-num">
          {paginateStart}-{paginateMax}
        </li>
        <li>of</li>
        <li className="pagination__all-pages">{input.items.length}</li>
        <li className="pagination__btns-control">
          <button
            className={
              activePrevBtn === true
                ? "pagination__btn-prev active"
                : "pagination__btn-prev"
            }
            onClick={prevPage}
          >
            <svg viewBox="0 0 20 20" height="20px" width="20px">
              <path fill="none" d="M0 0h20v20H0z"></path>
              <path d="M17.77 3.77L16 2 6 12l10 10 1.77-1.77L9.54 12z"></path>
            </svg>
          </button>
          <button
            className={
              activeNextBtn === true
                ? "pagination__btn-next active"
                : "pagination__btn-next"
            }
            onClick={nextPage}
          >
            <svg viewBox="0 0 20 20" height="20px" width="20px">
              <path fill="none" d="M0 0h20v20H0V0z"></path>
              <path d="M6.23 20.23L8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default App;
