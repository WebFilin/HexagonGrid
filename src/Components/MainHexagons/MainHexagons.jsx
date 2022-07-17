import React from "react";

import hexCordinate from "../../state/hexCordinate";

function MainHexagons() {
  // !Переменные размера области гексагонов - передать пропсами ограничение до 30
  let L = 3;
  let M = 3;
  let N = 3;
  const sideOfset = 100;

  React.useEffect(() => {
    //кординаты и линии расположения хексов
    const hexesPositions = [];

    //  Стороны хекс контейнера
    const axisZ = L - 1;
    const axisY = L + M - 1;
    const axisX = L + N - 1;

    //  Расчитываем противоположную сторону
    const oppositeWidth = sideOfset * Math.sqrt(3);
    const oppositeContour = sideOfset * 2;

    //  Отрисовываем область решетки
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
          // Кординаты точек центра хексов
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

    hexCordinate.getArrCoordinates(hexesPositions);
  }, [L, M, N, sideOfset]);

  return <></>;
}
export default MainHexagons;
