import React, { useState } from "react";
import "../App.css";

function User({ users, removeUserDataAsync, setEditData }) {
  const [selected, setSelected] = useState(null);

  return users.map((item) => (
    <tr
      key={item.id}
      onClick={() =>
        selected === item.id ? setSelected(null) : setSelected(item.id)
      }
      className={item.id === selected ? "user selected" : "user"}
    >
      <td>{item.first_name}</td>
      <td>{item.email}</td>
      <td>
        <button className="EditBtn" onClick={() => setEditData(item)}>
          Edit
        </button>
        <button className="RemoveBtn" onClick={() => removeUserDataAsync(item)}>
          Remove
        </button>
      </td>
    </tr>
  ));
}

export default User;
