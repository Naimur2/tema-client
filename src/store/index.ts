import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./features/auth";
import { persistReducer, persistStore } from "redux-persist";
import { authApiSlice } from "./apis/auth/index";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const reducers = combineReducers({
  auth: persistedAuthReducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApiSlice.middleware),
});

export const persitedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
