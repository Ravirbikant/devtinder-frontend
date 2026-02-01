import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "./store/userSlice.js";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(removeUser());
    navigate("/");
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      <div className="navbar-end">
        <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
