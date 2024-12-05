/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: redux\slices\appSlice.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "appstate",
  initialState: {
    appState: {
      isWaiting: false,
      error: null,
      appVar: {},
      notificationBill: null
    },
  },

  reducers: {
    appIsWaiting: (state, action) => {
      return {
        ...state,
        appState: {
          ...state.appState,
          isWaiting: action.payload,
        },
      };
    },
    appSetting: (state, action) => {
      return {
        ...state,
        appState: {
          ...state.appState,
          appVar: action.payload,
        },
      };
    },
    appNotification: (state, action) => {
      return {
        ...state,
        appState: {
          ...state.appState,
          notificationBill: action.payload,
        },
      };
    }
  },
});

export const { appIsWaiting, appSetting, appNotification } = appSlice.actions;
// export const selectapp = (state) => state.appState;
// // console.log('selectapp==', selectapp);
export default appSlice.reducer;
