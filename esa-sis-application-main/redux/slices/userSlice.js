/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: redux\slices\userSlice.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userstate",
  initialState: {
    userState: {
      authenticating: false,
      authenticated: false,
      error: null,
      user: {},
    },
  },

  reducers: {
    loginRequest: (state) => {
      return {
        ...state,
        userState: {
          ...state.userState,
          authenticating: true,
        },
      };
    },
    loginSuccess: (state, action) => {
      return {
        ...state,
        userState: {
          ...state.userState,
          authenticating: false,
          authenticated: true,
          error: null,
          user: action.payload,
        },
      };
    },

    loginFailed: (state, action) => {
      return {
        ...state,
        userState: {
          ...state.userState,
          error: action.payload,
        },
      };
    },
    logoutSuccess: (state) => {
      return {
        ...state,
        userState: {
          ...state.userState,
          authenticating: false,
          authenticated: false,
          error: null,
          user: {},
        },
      };
    },
    appLanguage: (state, action) => {
      return {
        ...state,
        userState: {
          ...state.userState,
          user: {
            ...state.userState.user,
            application_Language: action.payload,
          },
        },
      };
    },
    appisSaved: (state, action) => {
      return {
        ...state,
        userState: {
          ...state.userState,
          user: {
            ...state.userState.user,
            appisSaved: action.payload,
          },
        },
      };
    },
    appisSubmitted: (state, action) => {
      return {
        ...state,
        userState: {
          ...state.userState,
          user: {
            ...state.userState.user,
            status: action.payload,
          },
        },
      };
    },
    photoUploaded: (state, action) => {
      return {
        ...state,
        userState: {
          ...state.userState,
          user: {
            ...state.userState.user,
            photo: action.payload,
          },
        },
      };
    },
    profileUrlChanged: (state, action) => {
      return {
        ...state,
        userState: {
          ...state.userState,
          user: {
            ...state.userState.user,
            profileUrl: action.payload,
          },
        },
      };
    },
    userNameChanged: (state, action) => {
      return {
        ...state,
        userState: {
          ...state.userState,
          user: {
            ...state.userState.user,
            name: action.payload,
          },
        },
      };
    },
    isLogout: (state, action) => {
      return {
        ...state,
        userState: {
          ...state.userState,
          user: {
            ...state.userState.user,
            isLogout: action.payload,
          },
        },
      };
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  logoutSuccess,
  appLanguage,
  appisSaved,
  appisSubmitted,
  photoUploaded,
  profileUrlChanged,
  userNameChanged,
  isLogout,
} = userSlice.actions;
// export const selectUser = (state) => state.userState;
// // console.log('selectUser==', selectUser);
export default userSlice.reducer;
