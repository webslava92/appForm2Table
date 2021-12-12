import React from "react";
import "../App.css";
import {User} from "./User";
import {Pagination} from "./Pagination";

export function Table({
  users,
  isLoading,
  error,
  removeUserDataAsync,
  setEditData,
  paging,
  setPaging,
}) {
  return (
    <div className="Table">
      {isLoading && <h2 className="loading">Data is being loaded...</h2>}
      {error && <h2 className="error">{error}</h2>}
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
            removeUserDataAsync={removeUserDataAsync}
            setEditData={setEditData}
          />
        </tbody>
      </table>
      {!users.length && <h2 className="nousers">No Users data found!</h2>}
      <div className="pagination__wrap">
        <Pagination users={users} paging={paging} setPaging={setPaging} />
      </div>
    </div>
  );
}
