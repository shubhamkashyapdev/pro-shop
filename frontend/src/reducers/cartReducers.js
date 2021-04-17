import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (
  state = {
    cartItems: [],
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;
      // item.product is the id of product //
      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        console.log('replace Item');
        return {
          // replace the existing item with new item  //
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === existItem.id ? item : x
          ),
        };
      } else {
        console.log('add item');
        // add item to cart //
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems.filter((item) => item.id !== payload)],
      };
    default:
      return state;
  }
};
