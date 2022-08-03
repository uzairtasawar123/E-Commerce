import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { store } from './Store';
import CheckBar from './CheckBar';
import './PlaceOrder.css'
import axios from 'axios'


export default function PlaceOrderScreen() {
    ////////////////////////
  const navigate = useNavigate();
///////////////////////////////////////////////////

  const { state, dispatch} = useContext(store);
  const { cart, userInfo } = state;
////////////////////////////////////////////////////////////////////////////////////////////////
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.10 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
////////////////////////////////////////////////////////////////////////////////////////////////
const HandlePlaceOrder = async ()=>{
     const {data} = await axios.post('http://localhost:8001/api/order',  {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentmethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
     },
     {
        headers: {
          authorization:userInfo.token
        },
      }
     );
     dispatch({type: "CART_CLEAR"})
     localStorage.removeItem('cartItems')
     navigate(`/order/${data.order._id}`)
}

//////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!cart.paymentmethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  return (
    <div>
        <CheckBar step1 step2 step3 step4></CheckBar>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {cart.shippingAddress.fullname} <br />
                <strong>Address: </strong> {cart.shippingAddress.address},
                {cart.shippingAddress.cityname}, {cart.shippingAddress.postcode},
                {cart.shippingAddress.countryname}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {cart.paymentmethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.img}
                          alt={item.Name}
                          className="placeorderimg"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.Name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>{item.price}Rs</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{cart.itemsPrice.toFixed(2)}Rs</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{cart.shippingPrice.toFixed(2)}Rs</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{cart.taxPrice.toFixed(2)}Rs</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>{cart.totalPrice.toFixed(2)}Rs</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                    className='btn btn-dark btn-block'
                      type="button"
                      onClick={HandlePlaceOrder}
                      disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}