import React, { useEffect, useState,  useContext } from "react";
//import data from './Data';
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import Rating from "./Rating";
import { Helmet } from "react-helmet-async";
import { store } from "./Store";
//import LoopIcon from '@material-ui/icons/Loop';

const Home = () => {

  const { state, dispatch } = useContext(store);
  const {
    cart: { cartItems },
  } = state;

  //////////////////////////////////////////////////////////////////////
  const [product, setProduct] = useState([]);
  const [loading , setLoading] =  useState(false);

  useEffect(() => {
      setLoading(true)
    let fetchdata = async () => {
      const res = await axios.get("http://localhost:8001/api/getProducts");
      setProduct(res.data);
      setLoading(false)
    };
    fetchdata();
  }, []);


/////////////////     HandleUpdate function  //////////////////
const HandleUpdate = async (item)=>{
  const items = cartItems.find(x=> x._id === product._id)
      const quantity = items? items.quantity + 1 : 1;
  const {data} = await axios.get(`http://localhost:8001/products/cart/${item._id}`)
  if(data.available_total < quantity){
    window.alert("Sorry , Product is out of Stock")
  }
   dispatch({type:'CART_ADD_ITEM' , payload:{...item, quantity }})
   
}





  return (
    <div>
      <Helmet>
        <title>Uzair.</title>
      </Helmet>
    
      <main className="main">
        <h1 className="heading"> Available products</h1>
        <div className="products ">
          {product &&
            product.map((p) => {
              return (
                <div className=" items" key={p.slug}>
                  <Link to={`/product/${p.slug}`}>
                    <img className="img" src={p.img} alt={p.Name}></img>
                  </Link>
                  <Link to={`/product/${p.slug}`}>
                    <p className="mx-2">
                      <b>{p.Name}</b>
                    </p>
                  </Link>
                  <Rating Rating={p.Rating} NumberReview={p.number_reviews} />
                  <p className="mx-2">
                    <strong>{p.price}Rs</strong>
                  </p>
                  {p.available_total < 0 ? <button disabled>Out of Stock</button>
                  :
                  <button onClick={()=> HandleUpdate(p)} type="button" className="mb-2 mx-2 btn btn-dark">
                    Add to Cart
                  </button>
                  }
                  
                </div>
              );
            })}
        </div>
      </main>

    </div>
  );
};

export default Home;
