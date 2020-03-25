import React, { createContext, useReducer } from "react";
import { User } from "./user/User";

export type AppState = {
  errors: string[];
  messages: string[];
  isLoading: boolean;
  isLoggedIn: boolean;
  user?: User;
};

export const initialState: AppState = {
  errors: [],
  messages: [],
  isLoading: false,
  isLoggedIn: false,
  user: undefined
};

const getState = () => {
  const localStorageState = localStorage.getItem("state");
  return localStorageState ? JSON.parse(localStorageState) : initialState;
};

const setSate = (state: AppState) =>
  localStorage.setItem("state", JSON.stringify(state));

const deleteState = () => localStorage.removeItem("state");

export const stateReducer = (state: AppState, action: any) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      const newState = { ...state, isLoggedIn: true, user: action.payload };
      setSate(newState);
      return newState;
    case "LOGOUT_SUCCESS":
      deleteState();
      return { ...state, isLoggedIn: false, user: null };
    case "ERRORS_ADDED":
      return { ...state, errors: action.payload };
    case "ERRORS_REMOVED":
      return { ...state, errors: [] };
    case "MESSAGES_ADDED":
      return { ...state, messages: action.payload };
    case "MESSAGES_REMOVED":
      return { ...state, messages: [] };
    case "LOADING_START":
      return { ...state, isLoading: true };
    case "LOADING_END":
      return { ...state, isLoading: false };
    default:
      return { ...state, ...action.payload };
  }
};

const AppContext = createContext(null as any);

export const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(stateReducer, getState());
  const store = { dispatch, state };
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export default AppContext;
