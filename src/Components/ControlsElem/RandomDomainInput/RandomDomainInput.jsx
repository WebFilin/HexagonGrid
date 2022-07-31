import React from "react";
import style from "./randomDomain.module.scss";
import hexCordinate from "../../../state/hexCordinate";
import { action } from "mobx";

function RandomDomain() {
  const [valueInput, setValueInput] = React.useState(0.5);

  function inputHandler(ev) {
    const input = Number(ev.target.value);
    if (input >= 0 && input <= 0.99) {
      setValueInput(input);
    } else {
      alert("Вне диапазона");
    }
  }
  return (
    <div className={style.wrapper}>
      <div className={style.body}>
        <input
          className={style.input}
          type="number"
          placeholder={valueInput}
          onChange={(ev) => {
            action(inputHandler(ev));
          }}
        />
        <button
          className={style.btn_auto}
          onClick={action(() => hexCordinate.handlerBtnRandom(valueInput))}
        >
          АВТО
        </button>
      </div>
      <h5 className={style.title}>От 0.01 до 0.99</h5>
    </div>
  );
}

export default RandomDomain;
