import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Product_Screen.css";
import axios from "axios";
import Rating from "./Rating";
import { Helmet } from "react-helmet-async";
import { store } from "./Store";

const Product_Screen = () => {

const navigate = useNavigate();

  const { slug } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    let fetchData = async () => {
      let res = await axios.get(`http://localhost:8001/api/getProduct/slug/${slug}`);
      setProduct(res.data);
      //console.log(res.data)
    };
    fetchData();
  }, [slug]);

     const {state , dispatch} = useContext(store)
     const {cart} = state;


       ///////////////////   AddtoCart Function    /////////////////

  const AddtoCart = async ()=>{
      const items = cart.cartItems.find(x=> x._id === product._id)
      const quantity = items? items.quantity + 1 : 1;
      const {data} = await axios.get(`http://localhost:8001/api/getProduct/id/${product._id}`)
      if(data.available_total < quantity){
        window.alert("Sorry , Product is out of Stock")
      }
       dispatch({type:'CART_ADD_ITEM' , payload:{...product, quantity }})
       navigate('/cart')

  }

  return (
    <div>
      <Helmet>
      <title>{product.Name}</title>
      </Helmet>
      
      <div className="row">
        <div className="col-6">
          <img src={product.img} className="product-img mx-5"></img>
        </div>
        <div className="col-3"> 
        <h1 className="div-2">{product.Name}</h1> 
          <Rating
            Rating={product.Rating}
            NumberReview={product.number_reviews}
          />
          <p>Price : {product.price}Rs</p>
          <p>
            Description : <br />
            {product.description}
          </p>
        </div>
        <div className="col-3 my-5 div-3">
          <table className ="table">
            <tbody>
              <tr>
                <td>Price</td>
                <td>{product.price}Rs</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>
                  {product.available_total > 0 ? (
                    <button className="btn btn-success btn-sm">
                      Available
                    </button>
                  ) : (
                    <button className="btn btn-danger btn-sm">
                      Unavailable
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          {product.available_total>0? <button className="btn btn-primary btn-lg btn-block" onClick={AddtoCart}>Add to Cart</button>:<button className="btn btn-primary btn-lg btn-block" disabled>Add to Cart</button>}
        </div>
      </div>
    </div>
  );
};

export default Product_Screen;
