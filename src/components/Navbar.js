import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Model from '../Model';
import Cart from '../screens/Cart'; 
import { useCart } from './ContextReducer';

export default function Navbar() {
  
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);      // force re-render
    navigate("/login");
  };

  //  sync state if token changes elsewhere
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">

        <Link className="navbar-brand fs-1 fst-italic" to="/">
          GoFood
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fs-4" to="/">Home</Link>
            </li>

          
          </ul>

          <div className="d-flex">

            {!isLoggedIn ? (
              <>
                <Link className="btn btn-outline-light ms-2" to="/login">
                  Log In
                </Link>
                <Link className="btn btn-outline-light ms-2" to="/signup">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="btn btn-outline-light ms-2" onClick={()=>{setCartView(true)}}>
                  My Cart {' '}
                  <Badge pill bg="danger" style={{ marginLeft: '8px' }}>{data.length}</Badge>
                </div>
                 {cartView?<Model onclose={()=>setCartView(false)}><Cart /></Model>:null}
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}


