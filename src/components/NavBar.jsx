import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      // Error logic maybe redirect to error page
      console.log(err);
    }
  };

  const handleImageError = (e) => {
    // Fallback to default avatar if image fails to load
    e.target.src = "https://geographyandyou.com/images/user-profile.png";
  };

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          👩‍💻 DevConnect
        </Link>
      </div>
      {user ? (
        <div className="flex-none gap-2">
          <div className="hidden md:flex items-center px-4">
            <span className="text-sm text-base-content/70">Welcome, </span>
            <span className="font-semibold ml-1">{user.firstName || "User"}</span>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img 
                  alt="user photo" 
                  src={user.photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                  onError={handleImageError}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-base-300"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge badge-primary badge-sm">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout} className="text-error">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex-none">
          <Link to="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};
export default NavBar;
