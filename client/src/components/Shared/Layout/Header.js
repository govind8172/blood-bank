// import React from 'react';
// import { BiSolidDonateHeart } from "react-icons/bi";
// import { FaCircleUser } from "react-icons/fa6";
// import { useSelector } from 'react-redux';
// import {  useNavigate,useLocation,Link } from 'react-router-dom';



// const Header = () => {
//     const {user}=useSelector(state=> state.auth);
//     const navigate=useNavigate();
//     const location=useLocation();

//     //logout
//     const handleLogout=()=>{
//         localStorage.clear()
//         navigate('/login')
//         alert('Logged out successfully')
//     }
//   return (
//     <div>
//       <nav className="navbar">
//         <div className="container-fluid">
//             <div className="navbar-brand">
//                 <BiSolidDonateHeart color='red'/>
//                 Blood Bank App
//             </div>
//             <ul className="navbar-nav flex-row">
//                 <li className="nav-item mx-3">
//                     <p className='nav-link'> <FaCircleUser/>Welcome {" "} {user?.name || user?.hospital || user?.organization }{" "} &nbsp;
//                     <span className='badge bg-secondary'>{user?.role} </span>
//                     </p>

//                 </li>
//                 {
//                   location.pathname==='/'||location.pathname==='/donor'||location.pathname==='/hospital'?(
//                     <li className='nav-item mx-3'>
//                       <Link to="/analytics" className='nav-link'>
//                       Analytics
//                       </Link>
//                     </li>


//                   ):(<li className='nav-item mx-3'>
//                     <Link to="/" className='nav-link'>
//                     Home
//                     </Link>
//                   </li>)
//                 }
//                 <li className="nav-item mx-3">
//                     <button className='btn btn-danger' onClick={handleLogout}>Logout</button>

//                 </li>
//             </ul>
//         </div>
//       </nav>
//     </div>
//   )
// }

// export default Header
import React from 'react';
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Header'; // Create and import a CSS file for custom styles

const Header = () => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const location = useLocation();

    // Logout function
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
        alert('Logged out successfully');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container-fluid">
                    <div className="navbar-brand d-flex align-items-center">
                        <BiSolidDonateHeart color='red' size={24} className="me-2" />
                        <span>Blood Bank App</span>
                    </div>
                    <ul className="navbar-nav ms-auto d-flex align-items-center">
                        <li className="nav-item mx-3">
                            <p className='nav-link mb-0'>
                                <FaCircleUser size={20} className="me-1" />
                                Welcome {" "} {user?.name || user?.hospital || user?.organization}{" "}
                                <span className='badge bg-secondary ms-2'>{user?.role}</span>
                            </p>
                        </li>
                        {
                            location.pathname === '/' || location.pathname === '/donor' || location.pathname === '/hospital' ? (
                                <li className='nav-item mx-3'>
                                    <Link to="/analytics" className='nav-link'>
                                        Analytics
                                    </Link>
                                </li>
                            ) : (
                                <li className='nav-item mx-3'>
                                    <Link to="/" className='nav-link'>
                                        Home
                                    </Link>
                                </li>
                            )
                        }
                        <li className="nav-item mx-3">
                            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
