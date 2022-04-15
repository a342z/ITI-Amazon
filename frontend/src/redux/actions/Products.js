import axios from "axios";
export const getProductsList = () => (dispatch) => {
  return axios.get(`https://fakestoreapi.com/products`)
    .then((res) =>
      dispatch({
        type: "GET_PRODUCTS_LIST",
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
export const getProduct = (id) => (dispatch) => {
  return axios.get(`https://fakestoreapi.com/products/${id}`)
    .then((res) =>
      dispatch({
        type: "GET_PRODUCT",
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};