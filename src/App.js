import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import { fetchData, sendCardData } from "./store/cart-actions";

let isFirstRender = true;

function App() {
  const cart = useSelector((state) => state.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  // const cartItems = useSelector(state => state.cart.itemsList)
  // console.log(cartItems);

  // const totalQuantity = useSelector(state => state.cart.totalQuantity)
  // console.log(totalQuantity)

  const dispatch = useDispatch();

  const notification = useSelector((state) => state.ui.notification);

  // useEffect( () => {
  //   dispatch(fetchData())
  // }, [dispatch])

  useEffect(() => {
    if(isFirstRender){
      isFirstRender = false;
      return;
    }
    //if(cart.changed){
      dispatch(sendCardData(cart))
   // }
    
  }, [totalPrice]);


  return (
    <div className="App">
      {
        notification && <Notification type={notification.type} message={notification.message} />
      }
      
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
