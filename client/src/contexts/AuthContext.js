// @ts-nocheck
import React, { createContext, useEffect, useReducer } from "react";

const loadUserFromLocalStorage = () => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  };
  
  const INITIAL_STATE = {
    user: loadUserFromLocalStorage(),
    loading: false,
    error: null
  };

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  console.log(action.type)
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(() => {
    // Check if the user data in local storage is valid
    const storedUser = loadUserFromLocalStorage();
    if (storedUser !== null) {
      dispatch({ type: "LOGIN_SUCCESS", payload: storedUser });
    }
  }, []);
  

  useEffect(() => {
    // Update local storage when user changes
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
