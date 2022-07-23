import React from "react";
import style from "./svgHex.module.scss";
import hexCordinate from "../../state/hexCordinate";

function SvgHex({ id, x, y, vertical, horizontal }) {
  const [isClick, setIsClick] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const hexEl = React.useRef();

  //   Выбираем хекс передаем в mobx
  function handlerClick(evElem) {
    const hex = evElem.target;
    setIsClick(!isClick);
    hexEl.current = hex;
  }

  React.useEffect(() => {
    if (hexEl.current) {
      isClick ? setValue(1) : setValue(0);
    }

    hexCordinate.getHex(hexEl.current);
  }, [isClick, hexEl]);

  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        <polygon
          className={style.hex}
          id={id}
          vertical={vertical}
          horizontal={horizontal}
          points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"
          onClick={(evHex) => {
            handlerClick(evHex);
          }}
        ></polygon>
        <text className={style.hex_txt}>
          {id} : {value}
        </text>
      </g>
    </>
  );
}

export default SvgHex;
