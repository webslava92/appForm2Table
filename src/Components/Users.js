import React, { useState } from "react";
import "../App.css";
import User from "./User.js";
import Pagination from "./Pagination.js";

function Users({ input, removeUserData, setEditData, setEditStatus }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = input.slice(firstUserIndex, lastUserIndex);

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

export default Users