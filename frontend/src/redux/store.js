import {applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import combineReducer from "./reducer/combineReducer";

//fix some issues
export const store = createStore(combineReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
//export const persistor = persistStore(store);
