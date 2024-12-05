/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: redux\slices\store.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import user_state from "./slices/userSlice";
import app_state from "./slices/appSlice";
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
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// To Combine Many Reducer
const combinedReducer = combineReducers({
  // counter,
  user_state,
  app_state,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,

      user_state: {
        userState: [
          ...action.payload.user_state.userState,
          ...state.user_state.userState,
        ],
      },
      // app_state: [
      //   ...action.payload.app_state,
      //   ...state.app_state,
      // ],

      app_state: {
        appState: [
          ...action.payload.app_state.appState,
          ...state.app_state.appState,
        ],
      },
    };

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

// const appReducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state,

//         app_state: {
//         appState: [
//           ...action.payload.app_state.appState,
//           ...state.app_state.appState,
//         ],
//       },
//     };

//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };

// To Solve the error
// redux-persist failed to create sync storage. falling back to noop storage.

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(value) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const makeStore = ({ isServer }) => {
  if (isServer) {
    // console.log('In the Server Side');
    //If it's on server side, create a store
    return configureStore({
      reducer: {
        masterReducer,
        // appReducer,
      },
      // to enable the Redux devtools extension in our store
      devTools: true,
    });
    // createStore(rootReducer, initialState, bindMiddleware(middleware));
  } else {
    //If it's on client side, create a store which will persis
    /* The configuration for the redux-persist. */
    // // console.log('In the Client Side');
    const persistConfig = {
      key: "root",
      version: 1,
      storage,
    };
    const persistedReducer = persistReducer(persistConfig, masterReducer);
    // const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = configureStore({
      reducer: {
        persistedReducer,
      },
      // to enable the Redux devtools extension in our store on dev mode only
      devTools: process.env.NODE_ENV === "production" ? false : true,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });
    store.__persisitor = persistStore(store);
    // This creates a persistor object & push that
    // persisted object to .__persistor, so that we can avail the persistability feature
    return store;
  }
};
// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: false });
