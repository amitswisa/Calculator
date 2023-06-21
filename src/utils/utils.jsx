import {
  calculatorTypes,
  operatorsArray,
  parenthesesArray,
} from "../constants/constants.js";

function applyOperator(i_Operator, i_SecondValue, i_FirstValue) {
  if (!i_FirstValue || !i_SecondValue) throw new Error("Invalid expression");

  switch (i_Operator) {
    case calculatorTypes.OPERATION.ADD:
      return i_FirstValue + i_SecondValue;
    case calculatorTypes.OPERATION.SUBSTRUCT:
      return i_FirstValue - i_SecondValue;
    case calculatorTypes.OPERATION.MUL:
      return i_FirstValue * i_SecondValue;
    case calculatorTypes.OPERATION.DIVIDE:
      if (i_SecondValue == 0) throw "Cannot divide by zero";
      return i_FirstValue / i_SecondValue;
  }

  return 0;
}

function hasPrecedence(i_CurrentOperator, i_StackOperator) {
  if (parenthesesArray.includes(i_StackOperator)) return false;
  else if (
    (i_CurrentOperator === calculatorTypes.OPERATION.MUL ||
      i_CurrentOperator === calculatorTypes.OPERATION.DIVIDE) &&
    (i_StackOperator === calculatorTypes.OPERATION.ADD ||
      i_StackOperator === calculatorTypes.OPERATION.SUBSTRUCT)
  )
    return false;
  else return true;
}

export const evaluate = (i_Expression) => {
  const tokens = i_Expression.trim().split("");

  let numStack = [];
  let opStack = [];

  const tokensLength = tokens.length;
  for (let index = 0; index < tokensLength; index++) {
    // Ignore spaces.
    if (tokens[index] == calculatorTypes.SPACE) continue;

    // Handle number appearence.
    if (
      tokens[index].match(/[0-9]/) ||
      (tokens[index] === calculatorTypes.OPERATION.SUBSTRUCT &&
        (index == 0 ||
          tokens[index - 1] === calculatorTypes.WRITABLE.OPEN_PARENTHESES))
    ) {
      const numArray = [];

      // Handling negative numbers.
      if (
        tokens[index] === calculatorTypes.OPERATION.SUBSTRUCT &&
        tokens[index + 1].match(/[0-9]/)
      ) {
        numArray.push(tokens[index] + tokens[index + 1]);
        index += 2;
      }

      while (
        (index < tokensLength && tokens[index].match(/[0-9]/)) ||
        tokens[index] === "."
      ) {
        numArray.push(tokens[index++]);
      }

      numStack.push(Number(numArray.join("")));
      index--;
    } else if (tokens[index] === calculatorTypes.WRITABLE.OPEN_PARENTHESES) {
      opStack.push(tokens[index]);
    } else if (tokens[index] === calculatorTypes.WRITABLE.CLOSE_PARENTHESES) {
      while (
        opStack.length &&
        opStack[opStack.length - 1] !==
          calculatorTypes.WRITABLE.OPEN_PARENTHESES
      ) {
        numStack.push(
          applyOperator(opStack.pop(), numStack.pop(), numStack.pop())
        );
      }

      if (opStack.length === 0) {
        throw new Error("Mismatched parentheses");
      }

      // remove the opening parenthesis from the stack
      opStack.pop();
    } else if (operatorsArray.includes(tokens[index])) {
      while (
        opStack.length > 0 &&
        hasPrecedence(tokens[index], opStack[opStack.length - 1])
      ) {
        numStack.push(
          applyOperator(opStack.pop(), numStack.pop(), numStack.pop())
        );
      }
      opStack.push(tokens[index]);
    }
  }

  // Check for any remaining opening parenthesis
  if (opStack.includes(calculatorTypes.WRITABLE.OPEN_PARENTHESES)) {
    throw new Error("Mismatched parentheses");
  }

  while (opStack.length > 0)
    numStack.push(applyOperator(opStack.pop(), numStack.pop(), numStack.pop()));

  // Check if more than one number is remaining without operator
  if (numStack.length > 1) {
    throw new Error("Expression is missing an operator");
  }

  return numStack.pop();
};

export const toggleSign = (i_Expression) => {
  if (i_Expression.slice(-1).match(/[0-9]/)) return i_Expression.concat("X(-");

  return i_Expression.concat("(-");
};

export const concatExpression = (i_Expression, i_NewCharacter) => {
  const lastChar = i_Expression.slice(-1);

  // Handling zero character (eliminate multiple zero before any number).
  if (
    i_NewCharacter === "0" &&
    (!i_Expression ||
      [...operatorsArray, ...parenthesesArray, calculatorTypes.EMPTY].includes(
        lastChar
      ))
  )
    return i_Expression;

  // Eliminate multiple in a row operations.
  if (
    operatorsArray.includes(i_NewCharacter) &&
    (i_Expression.length === 0 ||
      operatorsArray.includes(lastChar) ||
      lastChar === calculatorTypes.WRITABLE.OPEN_PARENTHESES)
  )
    return i_Expression;

  // Adding multiple before '(' if a number is the last character in the equation.
  // Adding multiple after ')' if i_NewCharacter is a number.
  if (
    (i_NewCharacter === calculatorTypes.WRITABLE.OPEN_PARENTHESES &&
      lastChar.match(/[1-9]/)) ||
    (lastChar === calculatorTypes.WRITABLE.CLOSE_PARENTHESES &&
      i_NewCharacter.match(/[1-9]/))
  ) {
    return i_Expression.concat("X" + i_NewCharacter);
  }

  return i_Expression.concat(i_NewCharacter);
};
