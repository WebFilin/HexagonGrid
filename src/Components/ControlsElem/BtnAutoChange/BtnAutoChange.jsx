import React from "react";
import InputSizeSide from "../InputSizeSide/InputSizeSide";
import style from "./btnAutoChange.module.scss";
import DomainsStore from "../../../store/DomainsStore";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

const BtnAutoChange = observer(() => {
  const [isValue, setIsValue] = React.useState(0.5);

  function handlerValue(value) {
    setIsValue(value);
  }

  function handlerClick() {
    // Генерация случайных доменов
    DomainsStore.handlerBtnRandom(isValue);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.body}>
        <InputSizeSide
          title="Вероятность"
          value={isValue}
          onChange={action(handlerValue)}
          text="От 0.01 до 0.99"
          inc={0.01}
          dec={0.01}
          min={0}
          max={0.99}
        />
        <button className={style.btn_calc} onClick={handlerClick}>
          АВТО
        </button>
      </div>
    </div>
  );
});

export default BtnAutoChange;
