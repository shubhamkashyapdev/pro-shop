import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (prodId, qty) => async (dispatch, getState) => {
  const {
    data: { data },
  } = await axios.get(`/api/products/${prodId}`);
  const { _id: id, name, image, price, countInStock } = data;

  dispatch({
    type: CART_ADD_ITEM,
    payload: { id, name, image, price, countInStock, qty },
  });
  // add to local storage //
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
