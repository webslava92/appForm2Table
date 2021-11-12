import React, { useState } from "react";
import "../App.css";

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
          onClick={() => setEditStatus(true) || setEditData(input[id])}
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

export default User