import { AppContext } from "../utils/boxOfStates";
import { useContext } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { BiBody } from "react-icons/bi";
import { MdShoppingCart } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TopNav({ bookFetch }) {
  const navigate = useNavigate();
  const {
    setInput,
    input,
    setBasketBuy,
    setBasketRent,
    basketBuy,
    basketRent,
    user,
    setUser,
  } = useContext(AppContext);
  let { logged, data } = user;

  const numberOfBasketBooks = basketBuy.length + basketRent.length;

  return (
    <div className="backgroundNavTop">
      <nav className="navTop">
        <img id="navLink-logo" src="/assets/logo.png" alt="logo" />
        <NavLink className="navLink" to="./">
          Home
        </NavLink>
        <NavLink className="navLink" to="./shop">
          Shop
        </NavLink>
        <NavLink className="navLink" to="./contact">
          Contact
        </NavLink>
        {logged ? (
          <NavLink className="navLink" to="./account">
            <BiBody size="28" />
            {data.login}
          </NavLink>
        ) : null}
        <div className="space">
          <Link to="./results" className="linkInput">
            <input
              className="searchInput"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  bookFetch(input);
                }
              }}
              placeholder="search title"
            />
          </Link>
          <FaSearch onClick={() => bookFetch(input)} />
        </div>
        <NavLink className="navLink" to="./basket">
          <MdShoppingCart size="28" />
          <span
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: "0.8rem",
              alignItems: "up",
            }}
          >{`${numberOfBasketBooks} `}</span>
          Basket
        </NavLink>
        {logged ? (
          <button
            className="navLink"
            onClick={() => {
              setUser({ logged: false });
              navigate("/");
              setBasketBuy([]);
              setBasketRent([]);
            }}
          >
            Log out
          </button>
        ) : (
          <NavLink className="navLink" to="./sign-up">
            Sign up
          </NavLink>
        )}
      </nav>
      <Outlet />
    </div>
  );
}
