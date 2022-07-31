import { createContext, useReducer } from "react";

export const PiCalculatorContext = createContext();

export const piReducer = (state, action) => {
  switch (action.type) {
    case "GET_VALUES":
      return {
        pi: action.payload.pi,
        precision: action.payload.precision,
        calculating: false,
      };
    case "UPDATING_VALUES_SUCCEEDED":
      return {
        ...state,
        pi: action.payload.pi,
        precision: action.payload.precision,
        calculating: false,
      };
    case "UPDATING_VALUES":
      return {
        ...state,
        calculating: true,
      };
    default:
      return state;
  }
};

export const PiCalculatorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(piReducer, {
    pi: 3,
    precision: 0,
    calculating: false,
  });

  return (
    <PiCalculatorContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PiCalculatorContext.Provider>
  );
};
