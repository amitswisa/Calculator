/* eslint-disable react/prop-types */
import { Textfit } from "react-textfit";

const Screen = (props) => {
  return (
    <Textfit
      className={`calculatorScreen ${props.className}`}
      mode="single"
      max={40}>
      {props.value}
    </Textfit>
  );
};

export default Screen;
