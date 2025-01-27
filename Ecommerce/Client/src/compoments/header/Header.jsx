import './Header.css'
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { IoMdBook } from "react-icons/io";
import { useContext } from 'react';
import { sample } from '../../contests/Usercontest/Users';
function Header() {
  const { currUser, logout } = useContext(sample);

  return ( 
   <div className='d-flex flex-wrap head'>
     <h1 className='title'>My Shop</h1>
     <div className="nav">
      <div className="nav-list">
       <Link to="" className="nav-link fs-5"> <FaHome className='text-white m-1 ' /> Home</Link>
      </div>
      <div className="nav-list">
       <Link to="register" className="nav-link fs-5"><IoMdBook className='m-1' />Register</Link>
      </div>
      <div className="nav-list">
       {currUser ? (
         <Link to="" onClick={logout} className="nav-link fs-5">Logout</Link>
       ) : (
         <Link to="login" className="nav-link fs-5">Login</Link>
       )}
      </div>
      <div className="nav-list">
       <Link to="about" className="nav-link fs-5">About us</Link>
      </div>
     </div>
   </div>
  );
}

export default Header;
