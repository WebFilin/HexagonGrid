import React from "react";

import style from "./drowSvgArea.modules.scss";

function MainHexagons({ arrCordinatsHex }) {
  // размеры блока
  const pointsHex = "100,0 50,-87 -50,-87 -100,-0 -50,87 50,87";

  return (
    <div className={style.wrapper}>
      <svg viewBox="0 0 1000 1000" width="200" height="400">
        {arrCordinatsHex.map((elem) => (
          // rotate(30deg)

          <g
            transform={`translate( ${elem.x},${elem.y}) `}
            className={style.hex}
          >
            <polygon points={pointsHex}></polygon>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default MainHexagons;
