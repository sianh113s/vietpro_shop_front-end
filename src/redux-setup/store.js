import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./reducers/cart";
import authReducer from "./reducers/auth";
const persistConfig = {
  key: "vietpro",
  storage,
};

const persistedCardReducer = persistReducer(persistConfig, cartReducer);
const persistAuthReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
  reducer: {
    cart: persistedCardReducer,
    auth: persistAuthReducer,
  },
});

export const persistor = persistStore(store);
