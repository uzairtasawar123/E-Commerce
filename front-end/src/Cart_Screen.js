import React, { useContext } from "react";
import { store } from "./Store";
import "./Cart_Screen.css";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import  Card  from "react-bootstrap/Card";
import axios from "axios";
//import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

const Cart_Screen = () => {
  const navigate = useNavigate();
  ///////////////////////////////////////////////////////////////////////
  const { state, dispatch } = useContext(store);
  const {
    cart: { cartItems },
  } = state;
 // console.log(cartItems);

/////////////////     HandleUpdate function  //////////////////
const HandleUpdate = async (item , quantity)=>{
  const {data} = await axios.get(`http://localhost:8001/api/getproduct/id/${item._id}`)

  if(data.available_total < quantity){
    window.alert("Sorry , Product is out of Stock")
  }
   dispatch({type:'CART_ADD_ITEM' , payload:{...item, quantity }})
   
}

////////////////   HandleRemove functoin  //////////////

const HandleRemove=  (item)=>{
dispatch({type:'CART_REMOVE_ITEM',payload:item});
}

 //////////////   HandleCheckout   ///////////////
 const HandleCheckout= ()=>{
  navigate('/signin?redirect=/shipping')

 }



  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping cart</h1>

      <div className="row mx-5">
        <div className="col-8">
          {
            <p>
              {cartItems &&
                cartItems.map((item) => {
                  return (
                    <ListGroup>
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={4}>
                          <img
                            src={item.img}
                            alt={item.Name}
                            className="img-fluid rounded cart_img"
                          ></img>{" "}
                          <Link to={`/product/${item.slug}`}>{item.Name}</Link>
                        </Col>
                        <Col md={3}>
                          <button
                          onClick={()=> HandleUpdate(item , item.quantity-1)}
                            className="cart_button"
                            disabled={item.quantity === 1}
                          >
                            <i className="fas fa-minus-circle"></i>
                          </button>
                          <span>{item.quantity}</span>
                          <button
                          onClick={()=> HandleUpdate(item , item.quantity+1)}
                            className="cart_button"
                            disabled={item.quantity === item.available_total}
                          >
                            <i className="fas fa-plus-circle"></i>
                          </button>
                        </Col>
                        <Col md={3}>{item.price}Rs</Col>
                        <Col md={2}>
                          <button
                          onClick={()=> HandleRemove(item)}
                            variant="light"
                            className="btn btn-danger cart_button"
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    </ListGroup>
                  );
                })}
            </p>
          }
        </div>
        <div className='col-4'>
          <Card>
            <Card.Body>
               <ListGroup>
                <ListGroup.Item>
                  <h3>
                    Total : {cartItems.reduce((a , c)=> a+c.quantity , 0)} Products
                    <br/>
                    Total Price : {cartItems.reduce((a , c)=> a + c.price*c.quantity , 0)} Rs
                  </h3>
                </ListGroup.Item>
                
               </ListGroup>
               <div className="my-2">
                  <button onClick={()=> HandleCheckout()}
                   className="btn btn-success btn-lg btn-block">Proceed to Checkout</button>
                </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart_Screen;
