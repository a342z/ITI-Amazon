const INITIAL_STATE = {
    list: [],
    product:{},
  };
  
  export function ProductsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "GET_PRODUCTS_LIST":
        return {
          ...state,
          list: action.payload,
        };
      case "GET_PRODUCT":
        return {
          ...state,
          product: action.payload,
        };
      default:
        return state;
    }
  }