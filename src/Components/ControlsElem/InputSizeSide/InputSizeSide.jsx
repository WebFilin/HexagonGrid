import React from "react";
import style from "./InputSizeSide.module.scss";
import { action } from "mobx";
import { observer } from "mobx-react-lite";

const InputSizeSide = observer(
  ({ title, value, valueChange, text, inc, dec, min, max }) => {
    const [valueInput, setValueInput] = React.useState(value);
    const [isValid, setIsValid] = React.useState(true);

    function inputHandler(ev) {
      ev.preventDefault();
      const input = Number(ev.target.value);

      if (input >= min && input <= max) {
        setIsValid((currentValue) => (currentValue = true));
        setValueInput((currentValue) => (currentValue = input));
      } else {
        setIsValid((currentValue) => (currentValue = false));
      }
    }

    function increment(ev) {
      ev.preventDefault();

      if (valueInput < max) {
        setIsValid((currentValue) => (currentValue = true));
        setValueInput((currentValue) => currentValue + inc);
      } else {
        setIsValid((currentValue) => (currentValue = false));
      }
    }

    function decrement(ev) {
      ev.preventDefault();

      if (valueInput > min) {
        setIsValid((currentValue) => (currentValue = true));
        setValueInput((currentValue) => currentValue - dec);
      } else {
        setIsValid((currentValue) => (currentValue = false));
      }
    }

    //  Очищаем поле ввода
    function inputClear(ev) {
      ev.preventDefault();
      setValueInput((currentValue) => (currentValue = ""));
    }

    React.useEffect(() => {
      // Округляем значение до 2х знаков после запятой
      if (Number.isFinite(valueInput)) {
        setValueInput(
          (currentValue) => (currentValue = Number(valueInput.toFixed(2)))
        );
      }

      valueChange(valueInput);
    }, [valueInput, valueChange]);

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
            onChange={action(inputHandler)}
            onClick={action(inputClear)}
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
);

export default InputSizeSide;
