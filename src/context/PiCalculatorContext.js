import { createContext, useReducer } from "react";

export const PiCalculatorContext = createContext();

export const piReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PI_VALUE":
      return {
        piValue: action.payload,
      };
    default:
      return state;
  }
};

export const PiCalculatorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(piReducer, {
    piValue: null,
  });

  return (
    <PiCalculatorContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PiCalculatorContext.Provider>
  );
};
