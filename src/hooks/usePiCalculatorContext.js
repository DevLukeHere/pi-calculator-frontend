import { PiCalculatorContext } from "../context/PiCalculatorContext";
import { useContext } from "react";

export const usePiCalculatorContext = () => {
  const context = useContext(PiCalculatorContext);

  if (!context) {
    throw Error("error message to use context!");
  }

  return context;
};
