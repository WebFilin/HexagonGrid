import React from "react";

import style from "./drowSvgArea.modules.scss";

function MainHexagons({ arrCordinatsHex }) {
  const svgBox = React.useRef(null);
  const [viewBoxSize, setViewBoxSize] = React.useState("");

  //  Динамически управляем размером viewBox в svg
  React.useEffect(() => {
    const boxSize = svgBox.current.getBBox();
    setViewBoxSize(boxSize);

    console.log(boxSize);
  }, [arrCordinatsHex]);

  function handlerClick(eventClick) {
    console.log(eventClick.target);
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
        {arrCordinatsHex.map((elem) => (
          <g
            key={elem.id}
            transform={`translate(${elem.x}, ${elem.y})`}
            fill="gray"
            stroke="black"
            fillOpacity="0.3"
          >
            <polygon
              cursor={"pointer"}
              onClick={(eventClick) => {
                handlerClick(eventClick);
              }}
              transform="rotate(30)"
              points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"
            />
            <text x="-15" y="15" fontSize="40">
              {elem.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default MainHexagons;
