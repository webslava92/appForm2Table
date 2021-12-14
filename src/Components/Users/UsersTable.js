import React from "react";
import "../../App.css";
import {User} from "./User";
import { UsersPagination } from "./UsersPagination";

export function UsersTable({
  users,
  errorResp,
  isLoading,
  removeUserDataAsync,
  setEditData,
  paging,
  setPaging,
}) {
  return (
    <div className="UsersTable">
      {isLoading && <h2 className="loading">Data is being loaded...</h2>}
      {errorResp && <h2 className="SubmitError">Response error</h2>}
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
        <UsersPagination users={users} paging={paging} setPaging={setPaging} />
      </div>
    </div>
  );
}
