/* eslint-disable react/prop-types */
import "../../style/Button.css";

const Button = (props) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Button;
