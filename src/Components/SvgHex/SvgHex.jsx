import React from "react";
import style from "./svgHex.module.scss";
import hexCordinate from "../../state/hexCordinate";

function SvgHex({ id, x, y, vertical, horizontal }) {
  //   Выбираем хекс передаем в mobx
  function handlerClick(evElem) {
    const hex = evElem.target;
    hexCordinate.getHex(hex);
  }

  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        <polygon
          className={style.hex}
          id={id}
          vertical={vertical}
          horizontal={horizontal}
          points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"
          onClick={(evHex) => handlerClick(evHex)}
        ></polygon>
        <text className={style.hex_txt}>{id}</text>
      </g>
    </>
  );
}

export default SvgHex;
