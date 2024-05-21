import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/Cart/cartSlice";
import { shopApi } from "../services/shopService";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/authService";
import userReducer from "../features/User/userSlice";

const store = configureStore({
	reducer: { counterReducer, shopReducer, cartReducer, userReducer, [shopApi.reducerPath]: shopApi.reducer, [authApi.reducerPath]: authApi.reducer },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware).concat(authApi.middleware),
});

setupListeners(store.dispatch);

export default store;
