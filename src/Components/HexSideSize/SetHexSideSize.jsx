import React from "react";
import style from "./setHexSizeSide.module.scss";
import { action } from "mobx";
import InputSizeSide from "../ControlsElem/InputSizeSide/InputSizeSide";
import hexCordinate from "../../state/hexCordinate";

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

  React.useEffect(() => {
    hexCordinate.getHexSideSize(valueL, valueM, valueN);
  }, [valueL, valueM, valueN]);

  return (
    <div className={style.wrapper}>
      <InputSizeSide title="L" value={valueL} onChange={handlerValueL} />
      <InputSizeSide title="M" value={valueM} onChange={handlerValueM} />
      <InputSizeSide title="N" value={valueN} onChange={handlerValueN} />

      <button
        className={style.btnCalc}
        onClick={action(() => hexCordinate.handlerCreateHex())}
      >
        СОЗДАТЬ
      </button>
    </div>
  );
}

export default SetHexSideSize;
