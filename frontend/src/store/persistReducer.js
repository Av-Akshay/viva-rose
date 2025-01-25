import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import jewelleryReducer from "./slice";

const jewelleryPersistConfig = {
  key: "silverJewellery",
  storage,
  whitelist: ["allProducts"],
};
const persistedJewelleryReducer = persistReducer(
  jewelleryPersistConfig,
  jewelleryReducer
);

export default persistedJewelleryReducer;
