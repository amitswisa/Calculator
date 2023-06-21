/* eslint-disable no-case-declarations */
import { calculatorTypes } from "../constants/constants.js";
import { evaluate, concatExpression, toggleSign } from "../utils/utils";

export const calculatorReducer = (state, action) => {
  let currentExpression = state.expression;

  switch (action.type) {
    case calculatorTypes.CLEAR:
      return {
        ...state,
        expression: calculatorTypes.EMPTY,
        result: 0,
        error: false,
      };
    case calculatorTypes.WRITABLE.SIGNCHANGE:
      return { ...state, expression: toggleSign(currentExpression) };
    case calculatorTypes.OPERATION:
    case calculatorTypes.WRITABLE:
      return {
        ...state,
        expression: concatExpression(currentExpression, action.payload.value),
        error: false,
      };
    case calculatorTypes.OPERATION.EQUAL:
      let currentResult = 0;
      let isError = false;

      try {
        currentResult = evaluate(currentExpression);
        currentExpression =
          currentResult === 0
            ? calculatorTypes.EMPTY
            : currentResult.toString();
      } catch (e) {
        currentResult = state.result;
        currentExpression = state.expression;
        isError = true;
      }

      return {
        ...state,
        expression: currentExpression,
        result: currentResult,
        error: isError,
      };
    default:
      return state;
  }
};
