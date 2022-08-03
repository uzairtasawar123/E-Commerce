import React, { useContext } from "react";
import './App.css'
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Product_Screen from "./Product_Screen";
import { store } from "./Store";
import Badge from "react-bootstrap/Badge";
import Cart_Screen from "./Cart_Screen";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Shipping from "./Shipping";
import Payment from "./Payment";
import PlaceOrder from './PlaceOrder'
import OrderDetails from "./OrderDetails";
import OrderHistory from "./OrderHistory";
import UpdateProfile from "./UpdateProfile";
///////////////////////////////////////////////////////////////////////////////////////////
function App() {
  //const navigate = useNavigate();
  const { state, dispatch } = useContext(store);
  const { cart, userInfo } = state;

  ////////////////   HandleSignout function    //////////////////////
  const HandleSignout = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingaddress')
    localStorage.removeItem('addPayment')
    //navigate('/');
  };

  return (
    <div>
      <Router>
        <div className="d-flex flex-column app_div">
          <ToastContainer position="bottom-center" limit={1} />
          <header>
            <Navbar bg="dark" variant="dark" expand="lg">
              <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>Uzair.</Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo === null ? (
                     <Link className="nav-link" to="/signin">
                     Sign In
                    </Link>
                  ) : (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Update Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  )}
                  {userInfo !== null &&
                  <button className='btn btn-outline-info btn-sm' onClick={HandleSignout}>Sign Out</button>
                  }
                </Nav>
              </Container>
            </Navbar>
          </header>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/product/:slug" element={<Product_Screen />} />
              <Route path="/cart" element={<Cart_Screen />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/shipping" element={<Shipping/>}/>
              <Route path='/payment' element={<Payment/>}/>
              <Route path='/placeorder' element={<PlaceOrder/>}/>
              <Route path='/order/:id' element={<OrderDetails/>}/>
              <Route path='/orderhistory' element={<OrderHistory/>}/>
              <Route path='/profile' element={<UpdateProfile/>}/>





            </Routes>
          </div>
          {/* <footer>
          <div className='text-center footer'>
            All Rights Reserved
          </div>
        </footer> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
