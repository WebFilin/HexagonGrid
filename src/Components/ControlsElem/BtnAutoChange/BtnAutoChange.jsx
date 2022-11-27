import React from "react";
import InputSizeSide from "../InputSizeSide/InputSizeSide";
import style from "./btnAutoChange.module.scss";
import DomainsStore from "../../../Store/DomainsStore";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

const BtnAutoChange = observer(() => {
  const [isValue, setIsValue] = React.useState(
    DomainsStore.randomRatio === 0 ? 0.5 : DomainsStore.randomRatio
  );

  function handlerValue(value) {
    setIsValue(value);
  }

  // Генерация случайных доменов
  function handlerBtnAuto() {
    DomainsStore.handlerLoader(true);
    DomainsStore.handlerBtnAuto(isValue);

    setIsValue(DomainsStore.randomRatio);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.body}>
        <InputSizeSide
          title="Вероятность"
          value={isValue}
          valueChange={action(handlerValue)}
          text="От 0.01 до 0.99"
          inc={0.01}
          dec={0.01}
          min={0}
          max={0.99}
        />
        <button className={style.btn_calc} onClick={action(handlerBtnAuto)}>
          АВТО
        </button>
      </div>
    </div>
  );
});

export default BtnAutoChange;
