export const calculatorTypes = {
  OPERATION: {
    DIVIDE: "/",
    MUL: "X",
    ADD: "+",
    SUBSTRUCT: "-",
    EQUAL: "=",
  },
  WRITABLE: {
    NUMBER: "number",
    SIGNCHANGE: "+-",
    OPEN_PARENTHESES: "(",
    CLOSE_PARENTHESES: ")",
  },
  CLEAR: "C",
  SPACE: " ",
  EMPTY: "",
};

export const operatorsArray = Object.values(calculatorTypes.OPERATION);
export const parenthesesArray = [
  calculatorTypes.WRITABLE.OPEN_PARENTHESES,
  calculatorTypes.WRITABLE.CLOSE_PARENTHESES,
];
