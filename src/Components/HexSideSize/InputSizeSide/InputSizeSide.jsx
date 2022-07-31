import React from "react";
import { action } from "mobx";
import style from "./InputSizeSide.module.scss";

function InputSizeSide({ title, value, onChange }) {
  const [valueInput, setValueInput] = React.useState(value);
  const [activeValue, setActiveValue] = React.useState(false);

  function inputHandler(ev) {
    const input = Number(ev.target.value);
    if (input >= 0 && input <= 30) {
      setValueInput(input);
    } else {
      alert("Вне диапазона");
    }
  }

  const increment = () => {
    setActiveValue(true);
    if (valueInput > 0 && valueInput < 30) {
      return setValueInput((currentValue) => currentValue + 1);
    } else {
      return alert("Вне диапазона");
    }
  };

  const decrement = () => {
    setActiveValue(true);
    if (valueInput > 0 && valueInput < 30) {
      return setValueInput((currentValue) => currentValue - 1);
    } else {
      return alert("Вне диапазона");
    }
  };

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
          type="text"
          placeholder={value}
          value={activeValue ? valueInput : null}
          onChange={(ev) => {
            action(inputHandler(ev));
          }}
        />
        <button className={style.bt_plus} onClick={action(increment)}>
          <svg viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
      <h5 className={style.text}>От 1 до 30</h5>
    </div>
  );
}

export default InputSizeSide;
