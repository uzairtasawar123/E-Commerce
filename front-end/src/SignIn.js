import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Signin.css";
import { store } from "./Store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SignIn = () => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirectURL = new URLSearchParams(search).get("redirect");
  const redirect = redirectURL ? redirectURL : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(store);
  const { userInfo } = state;
  ///////////////////////////////////////// HandleSubmit Function   /////////////////////////////////////////////////////////////
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8001/api/user/signin",
        {
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
      <div className="main_div">
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <Row>
        <h1>Sign In</h1>        
        <div className=" signIn">
          <form onSubmit={HandleSubmit}>
            <br/>
            <Row>
              <Col md={5} >
                <label>Enter your Email</label>
                <br />
              </Col>
              <Col md={7}>
                <input
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={5}>
                <label>Enter Password</label>
              </Col>
              <Col md={7}>
                <input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </Col>
            </Row>
            <button type="submit" className="btn btn-primary my-2 ">
              Sign In
            </button>
            Create an account{" "}
            <Link to={`/signup?redirect=${redirect}`}>Sign Up</Link>
          </form>
        </div>
        </Row> 
      </div>
    </>
  );
};

export default SignIn;
