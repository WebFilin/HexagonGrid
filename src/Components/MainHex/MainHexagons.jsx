import React from "react";
import style from "./_mainHexagons.modules.scss";

function MainHexagons() {
  const [cordHexe, setcordHexe] = React.useState([]);

  // Переменные размера области видимости - передать пропсами ограничение до 30
  let L = 3;
  let M = 3;
  let N = 3;
  let SIDE = 100;

  React.useEffect(() => {
    //кординаты и линии расположения хексов
    const hexes = [];

    //  Стороны хекса контейнера
    const long = L - 1;
    const height = L + M;
    const width = L + N;

    for (let horizontalLine = 0; horizontalLine < height; horizontalLine++) {
      for (let verticalLine = 0; verticalLine < width; verticalLine++) {
        if (
          (horizontalLine < long &&
            verticalLine >= long - horizontalLine &&
            verticalLine < width - (long + 1 - height + horizontalLine)) ||
          (horizontalLine >= long && horizontalLine < M) ||
          (horizontalLine >= M &&
            verticalLine >= long - horizontalLine &&
            verticalLine < width - (long + 1 - height + horizontalLine))
        ) {
          hexes.push({
            id: hexes.length,
            horizontal: horizontalLine,
            vertical: verticalLine,
          });
        }
      }
    }

    console.log(hexes);
  }, [L, M, N, SIDE]);

  return <div className={style.wrapper}></div>;
}

export default MainHexagons;
