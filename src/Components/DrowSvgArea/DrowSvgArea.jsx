import React from "react";

import style from "./drowSvgArea.modules.scss";

function MainHexagons({ arrCordinatsHex }) {
  const svgBox = React.useRef(null);
  const [viewBoxSize, setViewBoxSize] = React.useState("");

  let polygonStyle = {
    fill: "gray",
    stroke: "black",
    fillOpacity: "0.3",
    cursor: "pointer",

    //  передача значения обьектом
    textPos: "middle",
    fontSize: "40",
    rotate: "rotate(30)",
    points: "100,0 50,-87 -50,-87 -100,-0 -50,87 50,87",
  };

  //  Динамически управляем размером viewBox в svg
  React.useEffect(() => {
    const boxSize = svgBox.current.getBBox();
    setViewBoxSize(boxSize);
  }, [arrCordinatsHex]);

  function handlerClick(evClick) {
    console.log(evClick.target);
  }

  return (
    <div className={style.wrapper}>
      <svg
        ref={svgBox}
        viewBox={`${viewBoxSize.x} ${viewBoxSize.y} ${viewBoxSize.width} ${viewBoxSize.height}`}
        style={{ border: "1px solid #333333" }}
        width="200%"
        height="200%"
        preserveAspectRatio="xMinYMax meet"
      >
        {/* Выводим хексы, смещаем их по сетке координат */}
        {arrCordinatsHex.map((elem) => (
          <g key={elem.id} transform={`translate(${elem.x}, ${elem.y})`}>
            <polygon
              style={polygonStyle}
              transform={polygonStyle.rotate}
              points={polygonStyle.points}
              onClick={(evClick) => {
                handlerClick(evClick);
              }}
            />
            <text
              text-anchor={polygonStyle.textPos}
              dominant-baseline={polygonStyle.textPos}
              fontSize={polygonStyle.fontSize}
            >
              {elem.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default MainHexagons;
