import React from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import domainsStore from "../../store/domainsStore";

const MainHexagons = observer(() => {
  const createMainHex = domainsStore.isCreateMainhex;

  React.useEffect(() => {
    //кординаты и линии расположения хексов
    const hexesPositions = [];
    const sideOfset = 100;

    // Размеры сетки из инпутов
    const ofsetSide = toJS(domainsStore.hexSideSize);

    //  Стороны хекс контейнера
    const axisQ = ofsetSide.L - 1;
    const axisY = ofsetSide.L + ofsetSide.M - 1;
    const axisX = ofsetSide.L + ofsetSide.N - 1;

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
          (horizontal >= axisQ && horizontal < ofsetSide.M) ||
          (horizontal >= ofsetSide.M &&
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

    domainsStore.getArrCoordinates(hexesPositions);
  }, [createMainHex]);

  return <></>;
});
export default MainHexagons;
