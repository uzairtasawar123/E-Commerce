import { UseReducer, createContext, useReducer } from "react";

export const store = createContext();

const initial = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  cart: {
    shippingAddress: localStorage.getItem("shippingaddress")
      ? JSON.parse(localStorage.getItem("shippingaddress"))
      : {},
    paymentmethod: localStorage.getItem("addPayment")
      ? localStorage.getItem("addPayment")
      : "",
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    /////////////////////////////////////////////////////////////
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const items = state.cart.cartItems.find((x) => x._id === newItem._id);
      const cartItems = items
        ? state.cart.cartItems.map((item) =>
            item._id === items._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    /////////////////////////////////////////////////////////////
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    ///////////////////////////////////////////////////////////////////
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    /////////////////////////////////////////////////////////////////
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentmethod: "" },
      };
    ////////////////////////////////////////////////////////////
    case "SHIPPING_ADDRESS":
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    /////////////////////////////////////////////////////////////
    case "ADD_PAYMENT":
      return {
        ...state,
        cart: { ...state.cart, paymentmethod: action.payload },
      };
    ///////////////////////////////////////////////////////////
    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    //////////////////////////////////////////////////////////
    default:
      return state;
  }
}

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initial);
  const value = { state, dispatch };
  return <store.Provider value={value}>{props.children}</store.Provider>;
}
