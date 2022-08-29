import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import PostSlice from "./PostSlice";
import DetailsSlice from "./DetailsSlice";
import pathSlice from "./pathSlice";
import CnxSlice from "./CnxSlice";

const reducers = combineReducers({
  posts: PostSlice,
  details: DetailsSlice,
  path: pathSlice,
  connected: CnxSlice,
});
const persistConfig = {
  key: "root",
  whitelist: ["counter"],
};
const persistedReduacer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReduacer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
