import React from "react";

import hexCordinate from "../../state/hexCordinate";

function MainHexagons() {
  // !Переменные размера области гексагонов - передать пропсами ограничение до 30
  let L = 2;
  let M = 2;
  let N = 2;

  React.useMemo(() => {
    //кординаты и линии расположения хексов
    const hexesPositions = [];
    const sideOfset = 100;

    //  Стороны хекс контейнера
    const axisQ = L - 1;
    const axisY = L + M - 1;
    const axisX = L + N - 1;

    //  Расчитываем противоположную сторону
    const oppositeWidth = sideOfset * Math.sqrt(3);
    const oppositeContour = sideOfset * 2;

    //  Отрисовываем область решетки
    for (let horizontal = 0; horizontal < axisY; horizontal++) {
      for (let vertical = 0; vertical < axisX; vertical++) {
        if (
          (horizontal < axisQ &&
            vertical >= axisQ - horizontal &&
            vertical < axisX - (axisQ + 1 - axisY + horizontal)) ||
          (horizontal >= axisQ && horizontal < M) ||
          (horizontal >= M &&
            vertical >= axisQ - horizontal &&
            vertical < axisX - (axisQ + 1 - axisY + horizontal))
        ) {
          // Кординаты точек центра хексов
          const xCord =
            vertical * oppositeWidth + (horizontal * oppositeWidth) / 2;
          const yCord =
            (horizontal * oppositeContour * 3) / 4 + oppositeContour / 2;

          hexesPositions.push({
            id: hexesPositions.length,
            horizontal: horizontal,
            vertical: vertical,
            x: Math.trunc(xCord),
            y: Math.trunc(yCord),
          });
        }
      }
    }

    hexCordinate.getArrCoordinates(hexesPositions);
  }, [L, M, N]);

  return <></>;
}
export default MainHexagons;
