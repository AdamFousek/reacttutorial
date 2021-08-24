import { cartActions } from "./cart-slice";

import { uiActions } from "./ui-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data to server'
      })
    );

    const sendRequest = async () => {
      const response = await fetch('https://react-test-58ecf-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
    }

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Send cart data successfully!'
        })
      );
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: error.message
      }));
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Loading...',
        message: 'Loading cart data from server'
      })
    );
    const sendRequest = async () => {
      const response = await fetch('https://react-test-58ecf-default-rtdb.europe-west1.firebasedatabase.app/cart.json');

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      return await response.json();
    }

    try {
      const cartData = await sendRequest();
      dispatch(cartActions.loadCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity
      }));
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Cart data successfully loaded!'
        })
      );
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: error.message
      }));
    }
  }
}