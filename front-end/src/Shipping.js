import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckBar from "./CheckBar";
import { store } from "./Store";

const Shipping = () => {

///////////////////    ///////////////////////////////////////
  const navigate = useNavigate();
  const { state, dispatch } = useContext(store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  //////////////////////////////  states   ///////////////////////////////////
  const [fullname, setFullname] = useState(shippingAddress.fullname || "");
  const [countryname, setCountryname] = useState(shippingAddress.countryname || "");
  const [cityname, setCityname] = useState(shippingAddress.cityname || "");
  const [postcode, setPostcode] = useState(shippingAddress.postcode || "");
  const [address, setAddress] = useState(shippingAddress.address || "");


  ///////////////////////////////////////////////////////////////////////////////////////
  useEffect(()=>{
    if(!userInfo)
    {
        navigate('/signin?redirect=/shipping')
    }
  }, [useNavigate , userInfo])
  
  ////////////////   HandleShipping Function /////////////////////
  const HandleShipping = (e) => {
    e.preventDefault();

    dispatch({
      type: "SHIPPING_ADDRESS",
      payload: { fullname, countryname, cityname, postcode, address },
    });
    localStorage.setItem(
      "shippingaddress",
      JSON.stringify({ fullname, countryname, cityname, postcode, address })
    );
    navigate("/payment");
  };

  return (
    <div>
      <Helmet>
        <title>Shipping</title>
      </Helmet>
      <CheckBar step1 step2></CheckBar>
      <div className="container small-container">
        <h1>Address Information</h1>
        <Form onSubmit={HandleShipping}>
          <Form.Group className="" controlId="fullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            ></Form.Control>
            <Form.Label>Country</Form.Label>
            <Form.Control
              placeholder="Enter your country name"
              value={countryname}
              onChange={(e) => setCountryname(e.target.value)}
              required
            ></Form.Control>
            <Form.Label>city</Form.Label>
            <Form.Control
              placeholder="Enter your city name"
              value={cityname}
              onChange={(e) => setCityname(e.target.value)}
              required
            ></Form.Control>
            <Form.Label>Post Code</Form.Label>
            <Form.Control
              placeholder="Enter your PostCode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              required
            ></Form.Control>
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="Enter your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <div>
            <button
            type="submit"
              className="my-3 btn btn-outline-dark"
            >
              Continue
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Shipping;
