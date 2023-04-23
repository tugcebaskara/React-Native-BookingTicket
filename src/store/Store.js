import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { rootReducer } from "./Reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["system"],
};

const logger = createLogger();

const Preducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(Preducer, applyMiddleware(thunk, logger));

export const persistor = persistStore(store);
