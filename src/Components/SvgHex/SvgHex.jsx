import React from "react";
import style from "./svgHex.module.scss";
import DomainsStore from "../../Store/DomainsStore";
import { action } from "mobx";
import { observer } from "mobx-react-lite";

const SvgHex = observer(({ id, x, y, vertical, horizontal }) => {
  //   Выбираем хекс передаем в mobx
  function handlerClick(evHex) {
    evHex.preventDefault();
    const hex = evHex.target;
    const valueHex = hex.getAttribute("value");

    if (valueHex === "1") {
      DomainsStore.handlerRemoveID(hex);
    } else {
      DomainsStore.handlerClickHex(hex);
    }
  }

  return (
    <>
      <g transform={`translate(${x}, ${y})`} onClick={action(handlerClick)}>
        <polygon
          className={style.hex}
          id={id}
          value={0}
          vertical={vertical}
          horizontal={horizontal}
          points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"
        ></polygon>
        <text className={style.hex_txt}></text>
      </g>
    </>
  );
});

export default SvgHex;
