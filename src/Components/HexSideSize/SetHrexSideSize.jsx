import React from "react";
import style from "./setHexSizeSide.module.scss";
import InputSizeSide from "./InputSizeSide/InputSizeSide";

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

  let sideOfset = {
    L: valueL,
    M: valueM,
    N: valueN,
  };

  console.log(sideOfset);

  return (
    <div className={style.wrapper}>
      <InputSizeSide title="L" value={valueL} onChange={handlerValueL} />
      <InputSizeSide title="M" value={valueM} onChange={handlerValueM} />
      <InputSizeSide title="N" value={valueN} onChange={handlerValueN} />
    </div>
  );
}

export default SetHexSideSize;
