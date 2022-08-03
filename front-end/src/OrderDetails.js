import axios from "axios";
import React, { useEffect, useContext, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "./Store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";




// function reducer(state, action) {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true, error: '' };
//     case 'FETCH_SUCCESS':
//       return { ...state, loading: false, order: action.payload, error: '' };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// }

const OrderDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const { state } = useContext(store);
  const { userInfo } = state;
  const [order , setOrder] = useState({});
  /////////////////////////////////////////////////////////////////////////////////////////
  // const [{loading,error, order, },dispatch,] = useReducer(reducer, {loading: true, order:{},error: ""});
   /////////////////////////////////////////////////////////////////////////////////////////


  useEffect(() => {
    const fetchData = async () => {
      try {
        // dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `http://localhost:8001/api/orders/${orderId}`
          
        );
        //console.log(data)
        console.log(data);
        
        setOrder(data);
        // dispatch({ type: 'FETCH_SUCCESS', payload: data });
        //console.log(data);
      } catch (err) {
        alert("Some Error Occurred");
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }  
    fetchData();
    //console.log(order);
  }, []);



  //////////////////////////////////////////////////////////////////////
    return (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1>Order {orderId}</h1>
      <h1>{order.paymentMethod}</h1>
      <h1>{order.paidAt}</h1>
      {/* <Row>
        <Col md={8}>
          <Card className="my-2">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name :</strong> {order.shippingAddress.fullname}
                <br />
                <strong>Address :</strong>
                {order.shippingAddress.address},{order.shippingAddress.cityname}
                ,{order.shippingAddress.postcode},
                {order.shippingAddress.countryname}
              </Card.Text>
              {order.isDelivered ? (
                <p>Delivered At : {orderId.deliveredAt}</p>
              ) : (
                <p>Not Delivered</p>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? <p>Paid at {order.paidAt}</p> : <p>Not Paid</p>}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.img}
                          alt={item.Name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link to={`/product/${item.slug}`}>{item.Name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
    </div>
  );
};

export default OrderDetails;
