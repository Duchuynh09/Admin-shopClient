import { SET_ORDERS, SET_PRODUCTS, SET_USERS } from "./constant";
import Service from "../service";

const productService = new Service("");
const userService = new Service("users");
const cartService = new Service("cart");
export const setOrders = (payload) => {
  return {
    type: SET_ORDERS,
    payload,
  };
};
export const setUsers = (payload) => {
  return {
    type: setUsers,
    payload,
  };
};

export const setProducts = (payload) => {
  return {
    type: setProducts,
    payload,
  };
};
