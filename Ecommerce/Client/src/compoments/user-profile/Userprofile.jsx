import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import { FaCartArrowDown } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { sample } from "../../contests/Usercontest/Users";

function UserProfile() {
  let { cred } = useContext(sample);
  let navigate = useNavigate();

  function onEditUser() {
    navigate("../edit-user");
  }

  return (
    <div>
      <div className="text-end text-end p-3">
        <p className="fs-3">
          {cred}
          <CiEdit className="text-warning fs-2" onClick={onEditUser} />
        </p>
      </div>

      {/* links to Products and Cart */}
      <ul className="nav fs-5 p-3 justify-content-around my-2">
        <li className="nav-item">
          <Link to="products" className="nav-link text-info">
            <AiFillProduct className="fs-3 text-warning " /> Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="cart" className="nav-link text-info">
            <FaCartArrowDown className="fs-3 text-warning " /> Cart
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

export default UserProfile;