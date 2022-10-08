import React from "react";
import style from "./setHexSizeSide.module.scss";
import InputSizeSide from "../ControlsElem/InputSizeSide/InputSizeSide";
import domainsStore from "../../store/DomainsStore";

function SetHexSideSize() {
  const [valueL, setValueL] = React.useState(3);
  const [valueM, setValueM] = React.useState(5);
  const [valueN, setValueN] = React.useState(7);

  const handlerValueL = (value) => {
    setValueL(value);
  };

  const handlerValueM = (value) => {
    setValueM(value);
  };

  const handlerValueN = (value) => {
    setValueN(value);
  };

  function clickHandler() {
    domainsStore.getHandlerCreateMainHex();
  }

  React.useEffect(() => {
    domainsStore.getHexSideSize(valueL, valueM, valueN);
  }, [valueL, valueM, valueN]);

  return (
    <div className={style.wrapper}>
      <InputSizeSide
        title="L"
        value={valueL}
        onChange={handlerValueL}
        text="От 0 до 30"
        inc={1}
        dec={1}
        min={0}
        max={30}
      />
      <InputSizeSide
        title="M"
        value={valueM}
        onChange={handlerValueM}
        text="От 0 до 30"
        inc={1}
        dec={1}
        min={0}
        max={30}
      />
      <InputSizeSide
        title="N"
        value={valueN}
        onChange={handlerValueN}
        text="От 0 до 30"
        inc={1}
        dec={1}
        min={0}
        max={30}
      />

      <button className={style.btn_calc} onClick={clickHandler}>
        СОЗДАТЬ
      </button>
    </div>
  );
}

export default SetHexSideSize;
