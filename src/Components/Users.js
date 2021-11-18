import React from "react";
import "../App.css";
import User from "./User.js";
import Pagination from "./Pagination.js";

const usersPerPage = 6;

function Users({
  input,
  removeUserData,
  setEditData,
  setEditStatus,
  currentPage,
  setCurrentPage,
}) {

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
      <div className="pagination__wrap">
        <Pagination
          input={input}
          usersPerPage={usersPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Users