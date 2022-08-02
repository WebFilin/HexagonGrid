import React from "react";
import style from "./svgHex.module.scss";
import hexCordinate from "../../state/hexCordinate";
import { action } from "mobx";

function SvgHex({ id, x, y, vertical, horizontal }) {
  const [isClick, setIsClick] = React.useState(false);
  const [value, setValue] = React.useState(null);
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

    if (hex) {
      const hexTxt = hex.parentNode.lastChild;
      isClick ? setValue(1) : setValue(null);
      hexTxt.textContent = value;
    }

    hexCordinate.getHex(hex);
  }, [isClick, value]);

  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        <polygon
          className={style.hex}
          id={id}
          value={value}
          vertical={vertical}
          horizontal={horizontal}
          points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"
          onClick={action((evHex) => {
            handlerClick(evHex);
          })}
        ></polygon>
        <text className={style.hex_txt}>
          {/* {id} : {value} */}
          {/* {id} */}

          {value}
        </text>
      </g>
    </>
  );
}

export default SvgHex;
