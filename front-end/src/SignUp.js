import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./SignUp.css";
import { store } from "./Store";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const SignIn = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirectURL = new URLSearchParams(search).get("redirect");
  const redirect = redirectURL ? redirectURL : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch } = useContext(store);
  const { userInfo } = state;
  ///////////////////////////////////////// HandleSubmit Function   /////////////////////////////////////////////////////////////
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Must match password and confirm password");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:8001/api/user/signup",
        {
          name,
          email,
          password,
        }
      );
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error("Invalid Email or Password");
    }
  };

  ///////////////////////////////////
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
      <div className="main_div ">
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <Row>
        <h1>Sign Up</h1>
        <div className="container row">
          <form onSubmit={HandleSubmit} className='Form_signUp'>
            <div>
              <label>Enter your Full Name</label>
              <br/>
              <input
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
              ></input>

              <br />
              <label>Enter your Email</label>
              <br />
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label>Enter Password</label>
              <br />
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <br />
              <label>Confirm Password</label>
              <br />
              <input
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <button type="submit" className="btn btn-primary my-2 ">
                Sign Up
              </button>
            </div>
            <div>
              Already Have an Account? <Link to={`/signin`}>Sign In</Link>
            </div>
          </form>
        </div>
        </Row>
      </div>
    </>
  );
};

export default SignIn;
