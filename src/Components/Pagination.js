import React from "react";
import "../App.css";
import numberOfPages from "../App";
import totalUsers from "../App";

function Pagination({ users, currentPage, setCurrentPage, usersPerPage }) {
  const activeNextBtn = numberOfPages > currentPage ? true : false;
  const activePrevBtn = currentPage - 1 !== 0 ? true : false;

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 !== 0 ? prev - 1 : 1));
  };
  const nextPage = () => {
    setCurrentPage((prev) =>
      users.length > 0 ? (prev + 1 < numberOfPages + 1 ? prev + 1 : prev) : 1
    );
  };

  const paginateMax = (currentPage - 1) * usersPerPage + users.length;
  const paginateStart = users.length === 0 ? 0 : paginateMax - users.length + 1;

  return (
    <div className="pagination__inner">
      <ul className="pagination__list">
        <li className="pagination__page-num">
          {paginateStart}-{paginateMax}
        </li>
        <li>of</li>
        <li className="pagination__all-pages">
          {totalUsers < users.length ? totalUsers : users.length}
        </li>
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

export default Pagination;
