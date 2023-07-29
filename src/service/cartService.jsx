import axios from "axios";

const BASE_URL = "https://redux-http-e081d-default-rtdb.firebaseio.com/";

export const saveCartItems = (cart) => axios.post(BASE_URL + "cartItems.json", cart)

export const getCartItems  = () => axios.get(BASE_URL + "cartItems.json");