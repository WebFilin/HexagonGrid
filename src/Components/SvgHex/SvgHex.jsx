import React from "react";
import hexCordinate from "../../state/hexCordinate";
function SvgHex({ id, x, y, vertical, horizontal }) {
  //   Выбираем хекс передаем в mobx
  function handlerClick(evElem) {
    const hex = evElem.target;
    hexCordinate.getHexGroup(hex);
    setColorAndNum(hex);
  }

  function randomColor() {
    return "#" + parseInt(Math.random() * 0xffffff).toString(16);
  }

  function setColorAndNum(elem) {
    //  elem.style.fill = "yellowgreen";

    elem.style.fill = randomColor();
    elem.style.fillOpacity = 0.8;
  }

  let hexStyle = {
    stroke: "black",
    fillOpacity: "0.3",
    cursor: "pointer",
    fill: "gray",

    //  передача свойства через значение обьекта
    textPos: "middle",
    fontSize: "30",
    rotate: "rotate(30)",
    transform: "",
    points: "100,0 50,-87 -50,-87 -100,-0 -50,87 50,87",
  };

  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        <polygon
          id={id}
          vertical={vertical}
          horizontal={horizontal}
          style={hexStyle}
          transform={hexStyle.rotate}
          points={hexStyle.points}
          onClick={(evHex) => handlerClick(evHex)}
        ></polygon>
        <text
          textAnchor={hexStyle.textPos}
          dominantBaseline={hexStyle.textPos}
          fontSize={hexStyle.fontSize}
        >
          {id}
        </text>
      </g>
    </>
  );
}

export default SvgHex;
