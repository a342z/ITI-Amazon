import { loginFailure, loginStart, loginSuccess } from "./loginRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";

import {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure
} from "./orderRedux";

import {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure
} from "./userRedux"

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/login", user);
    console.log(res);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());

  try {
    const res = await userRequest.delete(`/products/${id}`);
    // console.log(res);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    console.log("request ===");
    console.log("id", id);
    console.log("product", product);
    const res = await userRequest.put(`/products/${id}`, product);
    console.log("Update Result", res);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    console.log("error", err);
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    console.log("res", res.data.data);
    dispatch(addProductSuccess(res.data.data));
  } catch (err) {
    console.log("err", err);
    dispatch(addProductFailure());
  }
};

//ORDERS
//GET
export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/orders");
    console.log("res.data", res.data);
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

//DELETE
export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    const res = await userRequest.delete(`/orders/${id}`);
    console.log(res.data);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

//Update
export const updateOrder = async (id, order, dispatch) => {
  dispatch(updateOrderStart());
  try {
    const res = await userRequest.put(`/orders/${id}`, order);
    console.log("Update Result", res);
    dispatch(updateOrderSuccess({ id, order }));
  } catch (err) {
    console.log("error", err);
    dispatch(updateOrderFailure());
  }
};


//USERS
export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    console.log(userRequest);
    console.log("hi");
    const res = await userRequest.get("/users");
    console.log("res.data", res.data);
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id,dispatch)=>{
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    console.log(res.data);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    console.log("Update Result", res);
    dispatch(updateUserSuccess({ id, user }));
  } catch (err) {
    console.log("error", err);
    dispatch(updateUserFailure());
  }
};