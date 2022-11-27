import React from "react";
import style from "./setHexSizeSide.module.scss";
import InputSizeSide from "../ControlsElem/InputSizeSide/InputSizeSide";
import DomainsStore from "../../Store/DomainsStore";
import { action } from "mobx";

function SetHexSideSize() {
  const [valueL, setValueL] = React.useState(DomainsStore.hexSideSize.L);
  const [valueM, setValueM] = React.useState(DomainsStore.hexSideSize.M);
  const [valueN, setValueN] = React.useState(DomainsStore.hexSideSize.N);

  const handlerValueL = (value) => {
    setValueL((currentValue) => (currentValue = value));

    let currentValue = value;
    DomainsStore.getHexSideSize(currentValue, valueN, valueM);
  };

  const handlerValueN = (value) => {
    setValueN((currentValue) => (currentValue = value));

    let currentValue = value;
    DomainsStore.getHexSideSize(valueL, currentValue, valueM);
  };

  const handlerValueM = (value) => {
    setValueM((currentValue) => (currentValue = value));

    let currentValue = value;
    DomainsStore.getHexSideSize(valueL, valueN, currentValue);
  };

  function handlerBtnCreate(ev) {
    ev.preventDefault();
    DomainsStore.handlerLoader(true);
    DomainsStore.getHandlerCreateMainHex();
  }

  return (
    <div className={style.wrapper}>
      <div className={style.input_size_side__wraper}>
        <InputSizeSide
          title="L"
          value={valueL}
          valueChange={handlerValueL}
          text="От 0 до 30"
          inc={1}
          dec={1}
          min={0}
          max={30}
        />
        <InputSizeSide
          title="N"
          value={valueN}
          valueChange={handlerValueN}
          text="От 0 до 30"
          inc={1}
          dec={1}
          min={0}
          max={30}
        />
        <InputSizeSide
          title="M"
          value={valueM}
          valueChange={handlerValueM}
          text="От 0 до 30"
          inc={1}
          dec={1}
          min={0}
          max={30}
        />
      </div>

      <div className={style.btn_calc__wraper}>
        <button className={style.btn_calc} onClick={action(handlerBtnCreate)}>
          СОЗДАТЬ
        </button>
      </div>
    </div>
  );
}

export default SetHexSideSize;
