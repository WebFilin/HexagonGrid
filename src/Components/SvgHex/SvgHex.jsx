import React from "react";
import style from "./svgHex.module.scss";
import hexCordinate from "../../state/hexCordinate";
import { action } from "mobx";

function SvgHex({ id, x, y, vertical, horizontal }) {
  const [isClick, setIsClick] = React.useState(false);
  const [isValue, setIsValue] = React.useState(0);

  //   Выбираем хекс передаем в mobx
  function handlerClick(evHex) {
    const hex = evHex.target;

    setIsClick((currentValue) => (currentValue = !isClick));
    isClick
      ? setIsValue((currentValue) => (currentValue = 0))
      : setIsValue((currentValue) => (currentValue = 1));
    hexCordinate.getHex(hex);
  }

  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        <polygon
          className={style.hex}
          id={id}
          value={isValue}
          vertical={vertical}
          horizontal={horizontal}
          points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"
          onClick={action((evHex) => {
            handlerClick(evHex);
          })}
        ></polygon>
        <text className={style.hex_txt}>{isValue}</text>
      </g>
    </>
  );
}

export default SvgHex;
