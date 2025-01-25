import persistedJewelleryReducer from "./persistReducer";
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

const rootReducer = combineReducers({
  silverJewellery: persistedJewelleryReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
const persistor = persistStore(store);
export { store, persistor };
