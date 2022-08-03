import { PiCalculatorContext } from "../context/PiCalculatorContext";
import { useContext } from "react";

export const usePiCalculatorContext = () => {
  const context = useContext(PiCalculatorContext);

  // throw an error if the context is used outside of the set provider
  if (!context) {
    throw Error(
      "usePiCalculatorContext must be used within a PiCalculatorProvider"
    );
  }

  return context;
};
