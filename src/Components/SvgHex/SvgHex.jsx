import React from "react";
import style from "./svgHex.module.scss";
import hexCordinate from "../../state/hexCordinate";

function SvgHex({ id, x, y, vertical, horizontal }) {
  //   Выбираем хекс передаем в mobx
  function handlerClick(evElem) {
    const hex = evElem.target;
    hexCordinate.getHexGroup(hex);
    setColorAndNum(hex);
  }

  function randomColor() {
    //  return "#" + parseInt(Math.random() * 0xffffff).toString(16);
  }

  function setColorAndNum(elem) {
    //  elem.style.fill = randomColor();
    elem.style.fillOpacity = 0.8;
    elem.style.fill = "red";
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
