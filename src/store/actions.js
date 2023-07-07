import { SET_ORDERS,EXCEPT_ORDER } from "./constant";
export const exceptOrder = (payload) => {
  return {
    type: EXCEPT_ORDER,
    payload
  };
};
export const setOrders = (payload) => {
  return {
    type: SET_ORDERS,
    payload,
  };
};
