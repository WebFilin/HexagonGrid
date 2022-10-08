import React from "react";
import style from "./svgHex.module.scss";
import domainsStore from "../../store/DomainsStore";
import { action } from "mobx";

function SvgHex({ id, x, y, vertical, horizontal }) {
  //   Выбираем хекс передаем в mobx
  function handlerClick(evHex) {
    const hex = evHex.target;
    const valueHex = hex.getAttribute("value");

    if (valueHex === "1") {
      domainsStore.getRemoveID(hex);
    } else {
      domainsStore.getHex(hex);
    }
  }

  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        <polygon
          className={style.hex}
          id={id}
          value={0}
          vertical={vertical}
          horizontal={horizontal}
          points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"
          onClick={action((evHex) => {
            evHex.preventDefault();
            handlerClick(evHex);
          })}
        ></polygon>
        <text className={style.hex_txt}>{id}</text>
      </g>
    </>
  );
}

export default SvgHex;
