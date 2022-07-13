import React from "react";
import style from "./mainHexagons.modules.scss";

import DrowSvgArea from "../DrowSvgArea/DrowSvgArea";

function MainHexagons() {
  const [cordHexagons, setCordHexagons] = React.useState([]);

  // Переменные размера области видимости - передать пропсами ограничение до 30
  let L = 3;
  let M = 5;
  let N = 7;
  const SIDE = 100;

  React.useEffect(() => {
    //кординаты и линии расположения хексов
    const hexesPositions = [];

    //  Стороны хекс контейнера
    const axisZ = L - 1;
    const axisY = L + M - 1;
    const axisX = L + N - 1;

    //  Расчитываем противоположную сторону
    const oppositeWidth = SIDE * Math.sqrt(3);
    const oppositeContour = SIDE * 2;

    for (let horizontalLine = 0; horizontalLine < axisY; horizontalLine++) {
      for (let verticalLine = 0; verticalLine < axisX; verticalLine++) {
        if (
          (horizontalLine < axisZ &&
            verticalLine >= axisZ - horizontalLine &&
            verticalLine < axisX - (axisZ + 1 - axisY + horizontalLine)) ||
          (horizontalLine >= axisZ && horizontalLine < M) ||
          (horizontalLine >= M &&
            verticalLine >= axisZ - horizontalLine &&
            verticalLine < axisX - (axisZ + 1 - axisY + horizontalLine))
        ) {
          // Кординаты точек начала гексов
          const xCord =
            verticalLine * oppositeWidth + (horizontalLine * oppositeWidth) / 2;
          const yCord =
            (horizontalLine * oppositeContour * 3) / 4 + oppositeContour / 2;

          hexesPositions.push({
            id: hexesPositions.length,
            horizontal: horizontalLine,
            vertical: verticalLine,
            x: Math.trunc(xCord),
            y: Math.trunc(yCord),
          });
        }
      }
    }
    setCordHexagons(hexesPositions);
  }, [L, M, N, SIDE]);

  return (
    <div className={style.wrapper}>
      <DrowSvgArea arrCordinatsHex={cordHexagons} />
    </div>
  );
}
export default MainHexagons;
