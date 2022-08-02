import React from "react";
import { action } from "mobx";
import style from "./InputSizeSide.module.scss";

function InputSizeSide({ title, value, onChange, text, inc, dec, min, max }) {
  const [valueInput, setValueInput] = React.useState(value);
  const [isValid, setIsValid] = React.useState(true);

  function inputHandler(ev) {
    const input = Number(ev.target.value);
    if (input >= min && input <= max) {
      setIsValid(true);
      return setValueInput(input);
    } else {
      setIsValid(false);
    }
  }

  function increment() {
    if (valueInput < max) {
      setIsValid(true);
      return setValueInput((currentValue) => currentValue + inc);
    } else {
      setIsValid(false);
    }
  }

  function decrement() {
    if (valueInput > min) {
      setIsValid(true);
      return setValueInput((currentValue) => currentValue - dec);
    } else {
      setIsValid(false);
    }
  }

  function inputClear() {
    return setValueInput("");
  }

  React.useEffect(() => {
    onChange(valueInput);
  }, [valueInput, onChange]);

  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>{title}</h3>
      <div className={style.body}>
        <button className={style.bt_minus} onClick={action(decrement)}>
          <svg viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <input
          className={style.quantity}
          type="number"
          value={value}
          onChange={(ev) => {
            inputHandler(ev);
          }}
          onClick={ action(inputClear)}
        />
        <button className={style.bt_plus} onClick={action(increment)}>
          <svg viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
      <h5 className={isValid ? style.text : style.text_error}>
        {isValid ? text : "Вне диапазона"}
      </h5>
    </div>
  );
}

export default InputSizeSide;
