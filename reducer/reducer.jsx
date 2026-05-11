// dispatch() → reducer() → new state

// 1. Create initialState
// 2. Create reducer(state, action)
// 3. useReducer(reducer, initialState)
// 4. dispatch actions
// 5. reducer updates state

//Better Than Multiple useStates

import React, { useReducer } from "react";

/* STEP 1: Initial State */
const initialState = {
  loading: false,
  user: null,
  error: null,
};

/* STEP 2: Reducer Function */
function reducer(state, action) {

  switch (action.type) {

    /* Start Login */
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    /* Login Success */
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    /* Login Failed */
    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default function App() {

  /* STEP 3: Connect reducer */
  const [state, dispatch] = useReducer(reducer, initialState);

  /* Fake Login Function */
  const handleLogin = () => {

    /* STEP 4: Dispatch Action */
    dispatch({ type: "LOGIN_START" });

    setTimeout(() => {

      const success = true;

      if (success) {

        /* STEP 5: Send Success Data */
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: "Akshansh",
        });

      } else {

        dispatch({
          type: "LOGIN_ERROR",
          payload: "Invalid Credentials",
        });
      }

    }, 1000);
  };

  return (
    <div>

      <h2>Reducer Example</h2>

      {/* Loading */}
      {state.loading && <p>Loading...</p>}

      {/* User */}
      {state.user && <p>Welcome {state.user}</p>}

      {/* Error */}
      {state.error && <p>{state.error}</p>}

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  );
}