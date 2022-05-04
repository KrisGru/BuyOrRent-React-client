import { Outlet, NavLink } from "react-router-dom";
import { ImBooks } from "react-icons/im";
import { useContext } from "react";
import { AppContext } from "../utils/boxOfStates";

const Account = () => {
  const { user } = useContext(AppContext);
  const { login } = user.data;

  return (
    <div className="containerAccountNav">
      <h1>
        Hi, {login} <ImBooks />
      </h1>
      <nav className="accountNavs">
        <NavLink className="navAccountLink" end to="/account">
          Your account
        </NavLink>
        <NavLink className="navAccountLink" to="rented">
          Rented
        </NavLink>
        <NavLink className="navAccountLink" to="bought">
          Bought
        </NavLink>
        <NavLink className="navAccountLink" to="returned">
          Returned
        </NavLink>
        <div className="space"></div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Account;
