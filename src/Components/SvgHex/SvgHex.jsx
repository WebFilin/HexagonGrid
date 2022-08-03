import React from "react";
import style from "./svgHex.module.scss";
import hexCordinate from "../../state/hexCordinate";
import { action } from "mobx";

function SvgHex({ id, x, y, vertical, horizontal }) {
  const [isClick, setIsClick] = React.useState(false);
  const [valueAttr, setValueAttr] = React.useState(0);
  const [txt, setTxt] = React.useState(null);
  const hexEl = React.useRef();

  //   Выбираем хекс передаем в mobx
  function handlerClick(evHex) {
    const hex = evHex.target;
    setIsClick(!isClick);
    hexEl.current = hex;
  }

  //  Меняем атрибут value и текст хекса
  React.useEffect(() => {
    const hex = hexEl.current;

    if (hex && isClick) {
      setValueAttr(1);
      setTxt(1);
    } else {
      setValueAttr(0);
      setTxt(null);
    }

    hexCordinate.getHex(hex);
  }, [isClick, valueAttr]);

  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        <polygon
          className={style.hex}
          id={id}
          value={valueAttr}
          vertical={vertical}
          horizontal={horizontal}
          points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"
          onClick={action((evHex) => {
            handlerClick(evHex);
          })}
        ></polygon>
        <text className={style.hex_txt}>{txt}</text>
      </g>
    </>
  );
}

export default SvgHex;
