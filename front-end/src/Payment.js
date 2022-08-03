import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckBar from "./CheckBar";
import { store } from "./Store";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Payment = () => {
  const navigate = useNavigate();
  ///////////////////////////////////////////////////////////////////////////////////////////////
  const { state, dispatch } = useContext(store);
  const {
    cart: { shippingAddress, paymentmethod },
  } = state;

  /////////////////////////////////////////////////////
  const [paymentMethod, setPaymentMethod] = useState("");
  ////////////////////////////////////////////////////////
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  //////////////////////////////////////////////////////////
  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_PAYMENT", payload: paymentMethod });
    localStorage.setItem("addPayment", paymentMethod);
    navigate("/placeorder");
  };
  ////////////////////////////////////////////////////////
  return (
    <div>
      <CheckBar step1 step2 step3></CheckBar>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <div className="container">
        <h1>Payment Method</h1>
        <Form onSubmit={HandleSubmit}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="EasyPaisa"
              label="EasyPaisa"
              value="EasyPaisa"
              checked={paymentMethod === 'EasyPaisa'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="JazzCash"
              label="JazzCash"
              value="JazzCash"
              checked={paymentMethod === 'JazzCash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Payment;
