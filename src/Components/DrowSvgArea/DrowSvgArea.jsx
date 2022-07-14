import React from "react";

import style from "./drowSvgArea.modules.scss";

function MainHexagons({ arrCordinatsHex }) {
  const svgBox = React.useRef(null);
  const [viewBoxSize, setViewBoxSize] = React.useState(null);

  //   const [colorHex, setColorHex] = React.useState("gray");

  let hexStyle = {
    stroke: "black",
    fillOpacity: "0.3",
    cursor: "pointer",
    fill: "gray",
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

  const sizeBox =
    viewBoxSize !== null
      ? `${viewBoxSize.x} ${viewBoxSize.y} ${viewBoxSize.width} ${viewBoxSize.height}`
      : "0 0 0 0";

  function handlerClick(evClick) {
    evClick.target.style.fill = "red";

    console.log(evClick.target);
  }

  return (
    <div className={style.wrapper}>
      <svg
        ref={svgBox}
        viewBox={sizeBox}
        style={{ border: "1px solid #333333" }}
        width="250%"
        height="250%"
        preserveAspectRatio="xMinYMax meet"
      >
        {/* Выводим хексы, смещаем их по сетке координат */}
        {arrCordinatsHex.map((elem) => (
          <g key={elem.id} transform={`translate(${elem.x}, ${elem.y})`}>
            <polygon
              style={hexStyle}
              //   fill="gray"
              transform={hexStyle.rotate}
              points={hexStyle.points}
              onClick={(evClick) => {
                handlerClick(evClick);
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
