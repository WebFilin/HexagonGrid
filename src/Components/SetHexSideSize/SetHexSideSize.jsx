import React from "react";
import style from "./setHexSizeSide.module.scss";
import InputSizeSide from "../ControlsElem/InputSizeSide/InputSizeSide";
import DomainsStore from "../../store/DomainsStore";
import { action } from "mobx";

function SetHexSideSize() {
  const [valueL, setValueL] = React.useState(3);
  const [valueM, setValueM] = React.useState(5);
  const [valueN, setValueN] = React.useState(7);

  const handlerValueL = (value) => {
    setValueL((currentValue) => (currentValue = value));
  };

  const handlerValueM = (value) => {
    setValueM((currentValue) => (currentValue = value));
  };

  const handlerValueN = (value) => {
    setValueN((currentValue) => (currentValue = value));
  };

  function handlerBtnCreate(ev) {
    ev.preventDefault();
    DomainsStore.handlerLoader(true);
    DomainsStore.getHandlerCreateMainHex();
  }

  React.useEffect(() => {
    DomainsStore.getHexSideSize(valueL, valueN, valueM);
  }, [valueL, valueM, valueN]);

  return (
    <div className={style.wrapper}>
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

      <button className={style.btn_calc} onClick={action(handlerBtnCreate)}>
        СОЗДАТЬ
      </button>
    </div>
  );
}

export default SetHexSideSize;
