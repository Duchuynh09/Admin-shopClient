import { SET_ORDERS, SET_USERS, SET_PRODUCTS, EXCEPT_ORDER } from "./constant";
const initState = {
  carts: [],
  users: [],
  products: [],
  orders: [],
};
function Reducer(state, action) {
  switch (action.type) {
    case SET_ORDERS: {
      return {
        ...state,
        orders: action.payload,
      };
    }
    case EXCEPT_ORDER:{
      return {
        ...state,
        orders:action.payload
      };
      }
    case SET_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }

    case SET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }

    default:
      throw new Error("Invalid action");
  }
}
export { initState };
export default Reducer;
