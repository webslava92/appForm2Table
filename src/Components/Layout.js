import { NavLink, Outlet } from "react-router-dom";

const setActive = ({ isActive }) =>
  isActive ? "menu__link menu__link--active" : "menu__link";

export const Layout = () => {
  return (
    <div className="container">
      <div className="app__wrapper">
        <div className="menu">
          <div className="menu__inner">
            <ul className="menu__items">
              <li className="menu__item">
                <NavLink to="/Users" className={setActive}>
                  Users
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink to="/Movies" className={setActive}>
                  Movies
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};