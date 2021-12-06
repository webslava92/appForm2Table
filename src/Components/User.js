import React, { useState } from "react";
import "../App.css";

function User({ users, removeUserData, setEditData, setEditStatus, noUsers }) {
  const [selected, setSelected] = useState(null);

  return (
    !noUsers &&
    users.map((item, id) => (
      <tr
        key={id}
        onClick={() =>
          selected === item.id ? setSelected(null) : setSelected(item.id)
        }
        className={item.id === selected ? "user selected" : "user"}
      >
        <td>{item.first_name}</td>
        <td>{item.email}</td>
        <td>
          <button
            className="EditBtn"
            onClick={() => setEditStatus(true) || setEditData(users[id])}
          >
            Edit
          </button>
          <button
            className="RemoveBtn"
            onClick={() => removeUserData(users[id])}
          >
            Remove
          </button>
        </td>
      </tr>
    ))
  );
}

export default User;
