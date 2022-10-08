import React from "react";
import InputSizeSide from "../InputSizeSide/InputSizeSide";
import style from "./btnRandomChange.module.scss";
import domainsStore from "../../../store/domainsStore";
import { observer } from "mobx-react-lite";
import tableStore from "../../../store/tableStore";

const RandomChange = observer(() => {
  const [isValue, setIsValue] = React.useState(0.5);

  function handlerValue(value) {
    setIsValue(value);
  }

  //   infoTableStore.handlerInfoTable();
  function handlerClick() {
    // Генерация случайных доменов
    domainsStore.handlerBtnRandom(isValue);
    //  Отрисовка таблицы
    tableStore.handlerInfoTable();
  }

  return (
    <div className={style.wrapper}>
      <div className={style.body}>
        <InputSizeSide
          title="Вероятность"
          value={isValue}
          onChange={handlerValue}
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

export default RandomChange;
