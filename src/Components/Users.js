import React from "react";
import "../App.css";
import User from "./User.js";
import Pagination from "./Pagination.js";

const usersPerPage = 18;

function Users({
  users,
  isLoading,
  removeUserData,
  setEditData,
  setEditStatus,
  currentPage,
  setCurrentPage,
  noUsers,
}) {
  return (
    <div className="Users">
      {(noUsers && <h2 className="nodata">No Users data found!</h2>) ||
        (isLoading ? <h2 className="loading">Data is being loaded...</h2> : "")}
      <table>
        <thead>
          <tr>
            <th>User name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <User
            users={users}
            removeUserData={removeUserData}
            setEditData={setEditData}
            setEditStatus={setEditStatus}
            noUsers={noUsers}
          />
        </tbody>
      </table>
      <div className="pagination__wrap">
        <Pagination
          users={users}
          usersPerPage={usersPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Users;
