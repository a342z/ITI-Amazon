import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./loginRedux";
import productReducer from "./productRedux";
import orderReducer from "./orderRedux";
import { orderSlice } from "./orderRedux";
import { productSlice } from "./productRedux";
import { userSlice } from "./loginRedux";
import { usersSlice } from "./userRedux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// const rootReducer = combineReducers({
//   user: userReducer,
//   product: productReducer,
//   order: orderReducer
// });
const rootReducer = combineReducers({
  user: userSlice.reducer,
  users:usersSlice.reducer,
  product: productSlice.reducer,
  order: orderSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
