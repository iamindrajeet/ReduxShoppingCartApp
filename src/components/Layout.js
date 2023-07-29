import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import Header from "./Header";
import Products from "./Products";
import "./Layout.css";
import CartItems from "./CartItems";

const Layout = () => {
  const items = useSelector((state) => state.cart.itemsList);
  const showCart = useSelector((state) => state.cart.showCart);
  const totalPrice = items?.reduce((total, item) => total + item.totalPrice, 0) || 0;

  const dispatch = useDispatch();

  useEffect(() => {
    if (totalPrice >= 0) {
      dispatch(cartActions.checkTotalPrice(totalPrice));
    }
  }, [totalPrice, dispatch]);

  const checkTotalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <React.Fragment>
      <div className="layout">
        <Header />
        <Products />
        {showCart && checkTotalPrice !== 0 && <CartItems />}
        <div className="total-price">
          <h3>Total: ${totalPrice}</h3>
          <button className="orderBtn">Place Order</button>
        </div>{" "}
      </div>
    </React.Fragment>
  );
};

export default Layout;
