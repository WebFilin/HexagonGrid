import React from "react";

import style from "./drowSvgArea.modules.scss";

function MainHexagons({ arrCordinatsHex, getHex }) {
  const svgBox = React.useRef(null);
  const [viewBoxSize, setViewBoxSize] = React.useState(null);

  let hexStyle = {
    stroke: "black",
    fillOpacity: "0.3",
    cursor: "pointer",
    fill: "gray",

    //  передача свойства через значение обьекта
    textPos: "middle",
    fontSize: "30",
    rotate: "rotate(30)",
    points: "100,0 50,-87 -50,-87 -100,-0 -50,87 50,87",
  };

  //  Динамически управляем размером viewBox в svg
  React.useEffect(() => {
    const boxSize = svgBox.current.getBBox();
    setViewBoxSize(boxSize);
  }, [arrCordinatsHex]);

  const sizeBox =
    viewBoxSize !== null
      ? `${viewBoxSize.x} ${viewBoxSize.y} ${viewBoxSize.width} ${viewBoxSize.height}`
      : "0 0 0 0";

  return (
    <div className={style.wrapper}>
      <svg
        ref={svgBox}
        viewBox={sizeBox}
        style={{ border: "1px solid #333333" }}
        width="200%"
        height="200%"
        preserveAspectRatio="xMinYMax meet"
      >
        {/* Выводим хексы, смещаем их по сетке координат */}
        {arrCordinatsHex.map((elem) => (
          <g key={elem.id} transform={`translate(${elem.x}, ${elem.y})`}>
            <polygon
              hexid={elem.id}
              vertical={elem.vertical}
              horizontal={elem.horizontal}
              style={hexStyle}
              transform={hexStyle.rotate}
              points={hexStyle.points}
              onClick={(evClick) => {
                getHex(evClick);
              }}
            ></polygon>
            <text
              textAnchor={hexStyle.textPos}
              dominantBaseline={hexStyle.textPos}
              fontSize={hexStyle.fontSize}
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
