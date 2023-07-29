import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
import { saveCartItems } from "../service/cartService";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false,
        totalPrice: 0,
        changed: false
    },
    reducers: {
        replaceData(state, action){
            console.log(action)
            state.totalQuantity = action.payload.totalQuantity
            state.itemsList = action.payload.itemsList
        },
        addToCart(state, action){
            state.changed = true
            const newItem = action.payload;
            //to check if item already exists
            const exisitingItem = state.itemsList.find((item) => item.id === newItem.id);
            if(exisitingItem){
                exisitingItem.quantity++;
                exisitingItem.totalPrice += newItem.price;
            }else{
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                })
                state.totalQuantity++;
            }

        },
        removeFromCart(state, action){
            state.changed = true
            const id = action.payload;
            const itemToBeRemoved =  state.itemsList.find((item) => item.id === id);
            if(itemToBeRemoved.quantity === 1){
                state.itemsList = state.itemsList.filter(item => item.id !== itemToBeRemoved.id)
                state.totalQuantity--;
            }else{
                itemToBeRemoved.quantity--;
                itemToBeRemoved.totalPrice -= itemToBeRemoved.price
            }
        },
        setShowCart(state){
            state.showCart = !state.showCart;
        },

        checkTotalPrice(state, action){
            state.totalPrice = action.payload
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer