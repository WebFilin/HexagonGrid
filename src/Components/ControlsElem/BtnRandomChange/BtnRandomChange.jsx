import React from "react";

import InputSizeSide from "../InputSizeSide/InputSizeSide";
import style from "./btnRandomChange.module.scss";
import domainsStore from "../../../store/domainsStore";

function RandomChange() {
  const [isValue, setIsValue] = React.useState(0.5);

  function handlerValue(value) {
    setIsValue(value);
  }

  function handlerClick() {
    domainsStore.handlerBtnRandom(isValue);
    domainsStore.drowInfoTable();
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
}

export default RandomChange;