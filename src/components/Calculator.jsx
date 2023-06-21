/* eslint-disable react/prop-types */
import "../style/Calculator.css";
import { useReducer } from "react";
import CalculatorWrapper from "./calculator_components/CalculatorWrapper";
import Screen from "./calculator_components/Screen";
import ButtonsContainer from "./calculator_components/ButtonsContainer";
import Button from "./calculator_components/Button";
import { calculatorTypes } from "../constants/constants.js";
import { calculatorReducer } from "../reducers/calculatorReducer";

const Calculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, {
    expression: calculatorTypes.EMPTY,
    result: 0,
    error: false,
    calculatorBtnValues: [
      [
        calculatorTypes.CLEAR,
        calculatorTypes.WRITABLE.OPEN_PARENTHESES,
        calculatorTypes.WRITABLE.CLOSE_PARENTHESES,
        calculatorTypes.OPERATION.DIVIDE,
      ],
      [7, 8, 9, calculatorTypes.OPERATION.MUL],
      [4, 5, 6, calculatorTypes.OPERATION.SUBSTRUCT],
      [1, 2, 3, calculatorTypes.OPERATION.ADD],
      [calculatorTypes.WRITABLE.SIGNCHANGE, 0, calculatorTypes.OPERATION.EQUAL],
    ],
  });

  const handleCalculatorEvent = (event) => {
    const eventValue = event.target.innerHTML;

    let type =
      eventValue === calculatorTypes.OPERATION.EQUAL
        ? calculatorTypes.OPERATION.EQUAL
        : Object.values(calculatorTypes.OPERATION).includes(eventValue)
        ? calculatorTypes.OPERATION
        : eventValue === calculatorTypes.CLEAR
        ? calculatorTypes.CLEAR
        : eventValue === calculatorTypes.WRITABLE.SIGNCHANGE
        ? calculatorTypes.WRITABLE.SIGNCHANGE
        : calculatorTypes.WRITABLE;

    dispatch({ type: type, payload: { value: eventValue } });
  };

  return (
    <CalculatorWrapper>
      <Screen
        value={
          state.expression === calculatorTypes.EMPTY
            ? state.result
            : state.expression
        }
        className={state.error ? "screenError" : ""}
      />
      <ButtonsContainer>
        {state.calculatorBtnValues.flat().map((item, index) => {
          return (
            <Button
              className={
                typeof item !== calculatorTypes.WRITABLE.NUMBER
                  ? item === calculatorTypes.OPERATION.EQUAL
                    ? "equals"
                    : "operation"
                  : "numberBtn"
              }
              key={index}
              onClick={handleCalculatorEvent}
              value={item}
            />
          );
        })}
      </ButtonsContainer>
    </CalculatorWrapper>
  );
};

export default Calculator;
