import React from "react";

import style from "./drowSvgArea.modules.scss";

function MainHexagons({ arrCordinatsHex }) {
  const [widthSvg, setWidthSvg] = React.useState(null);
  const [heightSvg, setHeightSvg] = React.useState(null);

  //  Динамически Управляем размером viewBox в svg
  React.useEffect(() => {
    if (arrCordinatsHex.length > 0) {
      let heightSvg = arrCordinatsHex[arrCordinatsHex.length - 1].x;
      let widthSvg = arrCordinatsHex[arrCordinatsHex.length - 1].y;

      setWidthSvg(widthSvg);
      setHeightSvg(heightSvg);

      console.log(heightSvg);
      console.log(widthSvg);
    }
  }, [arrCordinatsHex]);

  function handlerClick(eventTarget) {
    console.log(eventTarget.target);
  }

  return (
    <div className={style.wrapper}>
      <svg
        viewBox={`0 0 ${widthSvg} ${heightSvg}`}
        width="150%"
        height="150%"
        fill="gray"
        stroke="black"
        fillOpacity="0.3"
      >
        {arrCordinatsHex.map((elem) => (
          <g
            key={elem.id}
            cursor={"pointer"}
            transform={`translate(${elem.x}, ${elem.y})`}
            onClick={(eventTarget) => {
              handlerClick(eventTarget);
            }}
          >
            <polygon
              transform="rotate(30)"
              points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"
            />
            <text>{elem.id}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default MainHexagons;
