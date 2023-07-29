import { getCartItems, saveCartItems } from "../service/cartService";
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            try {
              const response = await getCartItems();
              console.log(response.data);
              return response.data;
            } catch (error) {
              throw error;
            }
          };
        try{
            const cartData = await fetchHandler();
            console.log(cartData)
            dispatch(cartActions.replaceData(cartData))
        }catch(error){
            dispatch(
                uiActions.showNotification({
                  open: true,
                  message: "Sending Request Failed",
                  type: "error",
                }),
                console.log(error)
              );
        }
    }
}


export const sendCardData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
              open: true,
              message: "Sending Request",
              type: "warning",
            })
          );

          const sendRequest = async () => {
           
            await saveCartItems(cart)
              .then((response) => {
                console.log(response.data);
                //Send state as request is successful
                dispatch(
                  uiActions.showNotification({
                    open: true,
                    message: "Sent Request to Datatbase successfully",
                    type: "success",
                  })
                );
              })
          };
          try{
            await sendRequest()
          }catch (error) {
            dispatch(
                uiActions.showNotification({
                  open: true,
                  message: "Sending Request Failed",
                  type: "error",
                })
              );

          }
    }
  };