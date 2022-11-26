import { observer } from "mobx-react-lite";
import React from "react";
import { action } from "mobx";
import style from "./InputProbabilityValue.module.scss";
import DomainsStore from "../../../../Store/DomainsStore";

const InputProbabilityValue = observer(({ value, valueChange }) => {
  const [valueInput, setValueInput] = React.useState(value);
  const [isValid, setIsValid] = React.useState(true);

  const text = "От 0.01 до 0.99";
  const inc = 0.01;
  const dec = 0.01;
  const min = 0;
  const max = 0.99;

  function inputHandler(ev) {
    ev.preventDefault();
    const input = Number(ev.target.value);

    if (input >= min && input <= max) {
      setIsValid((currentValue) => (currentValue = true));
      return setValueInput((currentValue) => (currentValue = input));
    } else {
      setIsValid((currentValue) => (currentValue = false));
    }
  }

  function increment(ev) {
    ev.preventDefault();
    if (valueInput < max) {
      setIsValid((currentValue) => (currentValue = true));
      return setValueInput((currentValue) => currentValue + inc);
    } else {
      setIsValid((currentValue) => (currentValue = false));
    }
  }

  function decrement(ev) {
    ev.preventDefault();
    if (valueInput > min) {
      setIsValid((currentValue) => (currentValue = true));
      return setValueInput((currentValue) => currentValue - dec);
    } else {
      setIsValid((currentValue) => (currentValue = false));
    }
  }

  function inputClear(ev) {
    ev.preventDefault();
    setValueInput((currentValue) => (currentValue = 0));
  }

  React.useEffect(() => {
    valueChange(valueInput);
  }, [valueInput, valueChange]);

  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Вероятность</h3>
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
});

export default InputProbabilityValue;
